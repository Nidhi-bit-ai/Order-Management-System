# Database Design

## Overview

The Order Management System follows the **Database per Service** pattern.

Each microservice owns its own MongoDB database.

No service is allowed to directly access another service's database.

```
                MongoDB

        ┌────────────────────┐
        │     auth-db        │
        ├────────────────────┤
        │     sync-db        │
        ├────────────────────┤
        │     order-db       │
        ├────────────────────┤
        │   inventory-db     │
        ├────────────────────┤
        │   shipment-db      │
        ├────────────────────┤
        │  analytics-db      │
        ├────────────────────┤
        │ notification-db    │
        └────────────────────┘
```

---

# 1. Auth Database

Database

```
auth-db
```

Collections

```
users

roles

refresh_tokens
```

---

## users

Stores OMS users.

Fields

| Field | Type |
|------|------|
| _id | ObjectId |
| name | String |
| email | String |
| passwordHash | String |
| role | String |
| isActive | Boolean |
| createdAt | Date |
| updatedAt | Date |

Indexes

```
email (Unique)
```

---

## roles

Stores user roles.

Example

```
ADMIN

MANAGER

WAREHOUSE
```

---

## refresh_tokens

Stores refresh tokens.

---

# 2. Sync Database

Database

```
sync-db
```

Collections

```
processed_events
```

---

## processed_events

Purpose

Prevent duplicate Kafka processing.

Fields

| Field | Type |
|------|------|
| eventId | String |
| websiteOrderId | String |
| status | String |
| processedAt | Date |

Indexes

```
eventId (Unique)
```

---

# 3. Order Database

Database

```
order-db
```

Collections

```
orders

order_events
```

---

## orders

Stores OMS orders.

Fields

| Field | Type |
|------|------|
| orderId | String |
| externalOrderId | String |
| customerId | String |
| items | Array |
| totalAmount | Number |
| orderStatus | String |
| inventoryStatus | String |
| shipmentStatus | String |
| createdAt | Date |
| updatedAt | Date |

Indexes

```
orderId (Unique)

externalOrderId

customerId
```

---

## items

Embedded document.

```
productId

productName

quantity

unitPrice

subtotal
```

---

## order_events

Stores order history.

Fields

```
orderId

event

remarks

timestamp
```

---

# 4. Inventory Database

Database

```
inventory-db
```

Collections

```
products

stock_transactions

stock_reservations
```

---

## products

Stores catalog and inventory information.

Fields

| Field | Type |
|------|------|
| productId | String |
| sku | String |
| name | String |
| description | String |
| category | String |
| brand | String |
| images | Array |
| costPrice | Number |
| sellingPrice | Number |
| availableStock | Number |
| reservedStock | Number |
| damagedStock | Number |
| reorderLevel | Number |
| isActive | Boolean |
| createdAt | Date |
| updatedAt | Date |

Indexes

```
productId (Unique)

sku (Unique)

category

name
```

---

## stock_transactions

Maintains inventory history.

Fields

```
transactionId

productId

type

quantity

orderId

reason

createdAt
```

Transaction Types

```
RESTOCK

RESERVE

RELEASE

SALE

DAMAGE
```

---

## stock_reservations

Tracks reserved inventory.

Fields

```
reservationId

orderId

productId

quantity

status

createdAt
```

Status

```
ACTIVE

RELEASED

CONSUMED
```

---

# 5. Shipment Database

Database

```
shipment-db
```

Collections

```
shipments

shipment_events
```

---

## shipments

Stores shipment information.

Fields

| Field | Type |
|------|------|
| shipmentId | String |
| orderId | String |
| trackingNumber | String |
| courierPartner | String |
| shipmentStatus | String |
| expectedDelivery | Date |
| deliveredAt | Date |
| createdAt | Date |

Indexes

```
shipmentId (Unique)

orderId

trackingNumber
```

---

## shipment_events

Shipment history.

Fields

```
shipmentId

status

remarks

timestamp
```

---

# 6. Analytics Database

Database

```
analytics-db
```

Collections

```
daily_sales

product_sales

inventory_statistics

activity_logs
```

---

## daily_sales

Fields

```
date

totalOrders

completedOrders

cancelledOrders

totalRevenue
```

---

## product_sales

Fields

```
productId

quantitySold

revenue
```

---

## inventory_statistics

Fields

```
productId

availableStock

reservedStock
```

---

## activity_logs

Fields

```
event

entity

entityId

timestamp
```

---

# 7. Notification Database

Database

```
notification-db
```

Collections

```
notifications
```

---

## notifications

Fields

| Field | Type |
|------|------|
| notificationId | String |
| orderId | String |
| type | String |
| status | String |
| message | String |
| createdAt | Date |

Types

```
EMAIL

SMS

PUSH
```

Status

```
PENDING

SENT

FAILED
```

---

# Relationships

```
Orders
    │
    ├──────────────┐
    │              │
    ▼              ▼
Products      Shipments
```

Relationships are maintained through IDs.

There are **no foreign keys**.

---

# Database Principles

- One database per service.
- No joins across services.
- No shared collections.
- Use IDs for references.
- Keep documents denormalized where appropriate.
- Maintain event history for auditing.

---

# Indexing Strategy

| Collection | Index |
|------------|-------|
| users | email |
| processed_events | eventId |
| orders | orderId, externalOrderId, customerId |
| products | productId, sku, category |
| shipments | shipmentId, trackingNumber, orderId |
| notifications | orderId |

---

# Summary

The database design emphasizes:

- Independent ownership
- Loose coupling
- Fast lookups through indexes
- Event history for traceability
- Scalability through service isolation