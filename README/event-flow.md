# Event Flow

## Overview

The Order Management System (OMS) follows an **Event-Driven Architecture (EDA)**.

Business actions are represented as **events**. Services react to these events rather than calling each other directly whenever possible.

The OMS integrates with an external e-commerce website. Once an order is placed on the website, the OMS takes over the fulfillment process.

---

# Complete System Flow

```
External Website
        │
        │ website.order.created
        ▼
   Apache Kafka
        │
        ▼
  Sync Service
        │
        │ REST API
        ▼
  Order Service
        │
        │ order.created
        ▼
 Inventory Service
        │
        │ inventory.reserved
        ▼
 Shipment Service
        │
        │ shipment.created
        ▼
 Shipment Updates
        │
        ▼
 Order Service
        │
        ▼
 Analytics + Notification
```

---

# Flow 1 : New Order

## Step 1

Customer places an order on the external website.

The website:

- Processes payment
- Creates the order
- Publishes

```
website.order.created
```

---

## Step 2

Sync Service consumes the event.

Responsibilities

- Validate payload
- Check duplicate event
- Store event ID
- Forward order to Order Service

If validation fails

Processing stops.

---

## Step 3

Order Service creates a new OMS order.

Initial status

```
CREATED
```

Order is saved into

```
order-db
```

Then publishes

```
order.created
```

---

## Step 4

Inventory Service receives

```
order.created
```

Inventory checks

```
Available Stock

>=

Requested Quantity
```

---

## Case A

Stock Available

Inventory

```
availableStock -= quantity

reservedStock += quantity
```

Creates reservation

Publishes

```
inventory.reserved
```

---

## Case B

Stock Not Available

Publishes

```
inventory.failed
```

Order Service changes status

```
CANCELLED
```

Notification Service informs customer.

Flow ends.

---

# Flow 2 : Shipment Creation

Shipment Service consumes

```
inventory.reserved
```

Shipment Service

- Creates shipment
- Assigns tracking number
- Stores shipment

Publishes

```
shipment.created
```

Order status becomes

```
READY_TO_SHIP
```

---

# Flow 3 : Shipment Lifecycle

Shipment status changes

```
CREATED

↓

PACKED

↓

DISPATCHED

↓

OUT_FOR_DELIVERY

↓

DELIVERED
```

Every update publishes a Kafka event.

Example

```
shipment.dispatched
```

Consumers

- Order Service
- Notification Service

Order Service updates order status.

Notification Service sends update.

---

# Flow 4 : Order Delivery

Shipment Service publishes

```
shipment.delivered
```

Consumers

Order Service

Updates

```
DELIVERED
```

Analytics Service

Updates

- Revenue
- Completed Orders
- Delivery Metrics

Notification Service

Sends

```
Your order has been delivered.
```

Inventory Service does not receive this event because stock was already reserved during order processing.

---

# Flow 5 : Customer Cancels Order

Customer cancels order on website.

Website publishes

```
website.order.cancelled
```

Sync Service

↓

Order Service

↓

Status

```
CANCELLED
```

Publishes

```
order.cancelled
```

Inventory Service

Releases reserved stock.

Publishes

```
inventory.released
```

Notification Service

Sends cancellation notification.

Analytics

Updates cancelled order count.

---

# Flow 6 : Inventory Restock

Administrator performs restock.

Request

```
POST /products/:id/restock
```

Inventory Service

Updates

```
availableStock
```

Stores transaction.

Publishes

```
inventory.updated
```

Analytics updates inventory reports.

---

# Flow 7 : Product Update

Administrator updates product.

Inventory Service

Updates

- Name
- Price
- Description
- Category

Publishes

```
inventory.updated
```

Analytics refreshes product statistics.

---

# Flow 8 : Inventory Reservation Failure

Inventory Service

Checks stock.

Result

```
Stock Available ?

No
```

Publishes

```
inventory.failed
```

Order Service

```
Status

↓

CANCELLED
```

Notification

```
Out of Stock
```

Flow ends.

---

# Flow 9 : Shipment Cancellation

Shipment creation fails.

Shipment Service publishes

```
shipment.cancelled
```

Order Service updates

```
CANCELLED
```

Analytics records cancellation.

---

# Flow 10 : Admin Views Dashboard

Admin opens dashboard.

Frontend

↓

Gateway

↓

Analytics Service

Analytics returns

- Orders
- Revenue
- Inventory
- Shipments

No Kafka events are involved.

---

# Flow 11 : Product Management

Admin

↓

Gateway

↓

Inventory Service

Possible operations

```
Create Product

Update Product

Delete Product

View Product

Restock Product
```

These are synchronous REST operations.

---

# Flow 12 : Authentication

Admin

↓

Gateway

↓

Auth Service

JWT generated

↓

Frontend stores token

↓

Subsequent requests include

Authorization Header

```
Bearer <JWT>
```

---

# Failure Handling

## Invalid Website Event

Sync Service

↓

Reject event

↓

Log failure

↓

No further processing

---

## Duplicate Event

Sync Service

↓

Checks

```
processed_events
```

Already exists

↓

Ignore event

---

## Inventory Failure

Inventory Service

↓

Publish

```
inventory.failed
```

↓

Order cancelled

---

## Shipment Failure

Shipment Service

↓

Publish

```
shipment.cancelled
```

↓

Order cancelled

---

# Order State Machine

```
CREATED

↓

INVENTORY_RESERVED

↓

READY_TO_SHIP

↓

PACKED

↓

DISPATCHED

↓

OUT_FOR_DELIVERY

↓

DELIVERED
```

Cancellation may occur before shipment is dispatched.

```
CREATED

↓

CANCELLED
```

or

```
INVENTORY_RESERVED

↓

CANCELLED
```

---

# Service Interaction Summary

| Event | Producer | Consumer |
|--------|----------|-----------|
| website.order.created | Website | Sync |
| order.created | Order | Inventory |
| inventory.reserved | Inventory | Shipment |
| shipment.created | Shipment | Order |
| shipment.dispatched | Shipment | Order, Notification |
| shipment.delivered | Shipment | Order, Analytics, Notification |
| order.cancelled | Order | Inventory, Analytics, Notification |

---

# Business Rules

- Orders cannot be shipped unless inventory is reserved.
- Inventory cannot be reserved twice for the same order.
- Shipment cannot be created without successful inventory reservation.
- Only Shipment Service controls shipment status.
- Only Order Service controls order status.
- Only Inventory Service modifies stock.
- Every business action generates an immutable event.
- Services never access another service's database.

---

# Summary

The OMS processes every order through a well-defined lifecycle:

1. Order received from the website.
2. Order created in OMS.
3. Inventory reserved.
4. Shipment created.
5. Shipment progresses through delivery stages.
6. Order marked as delivered.
7. Analytics updated.
8. Notifications sent.

This event-driven workflow ensures loose coupling, scalability, and a clear separation of responsibilities between microservices.