# Kafka Topics

## Overview

The Order Management System (OMS) follows an **Event-Driven Architecture (EDA)** where microservices communicate asynchronously using Apache Kafka.

Each business event is published to a Kafka topic. Services subscribe only to the topics they require.

This approach provides:

- Loose coupling
- Fault tolerance
- Scalability
- Event replay
- Independent service deployment

---

# Kafka Architecture

```
                External Website
                        │
                        ▼
          website.order.created
                        │
                  Apache Kafka
                        │
                        ▼
                 Sync Service
                        │
             Internal REST API
                        │
                        ▼
                 Order Service
                        │
                  order.created
                        │
      ┌─────────────────┼──────────────────┐
      ▼                 ▼                  ▼
 Inventory        Analytics         Notification
      │
inventory.reserved
      │
      ▼
Shipment Service
      │
shipment.created
shipment.dispatched
shipment.delivered
```

---

# Topic Naming Convention

Topics follow the format:

```
<domain>.<entity>.<action>
```

Examples:

```
website.order.created

order.created

inventory.reserved

shipment.dispatched
```

---

# Topic List

| Topic | Producer | Consumers |
|--------|----------|-----------|
| website.order.created | External Website | Sync Service |
| website.order.cancelled | External Website | Sync Service |
| order.created | Order Service | Inventory, Analytics, Notification |
| order.updated | Order Service | Analytics |
| order.completed | Order Service | Analytics |
| order.cancelled | Order Service | Inventory, Analytics, Notification |
| inventory.reserved | Inventory Service | Order, Shipment |
| inventory.failed | Inventory Service | Order, Notification |
| inventory.updated | Inventory Service | Analytics |
| inventory.released | Inventory Service | Analytics |
| shipment.created | Shipment Service | Order, Analytics |
| shipment.packed | Shipment Service | Order |
| shipment.dispatched | Shipment Service | Order, Notification |
| shipment.out_for_delivery | Shipment Service | Order, Notification |
| shipment.delivered | Shipment Service | Order, Analytics, Notification |
| shipment.cancelled | Shipment Service | Order |
| notification.sent | Notification Service | Analytics (optional) |

---

# Topic Details

---

## website.order.created

### Producer

External Website

### Consumer

Sync Service

### Purpose

Sent whenever a customer successfully places an order.

Example Payload

```json
{
  "eventId": "evt_001",
  "externalOrderId": "ORD1001",
  "customerId": "CUST001",
  "items": [
    {
      "productId": "P101",
      "quantity": 2,
      "price": 499
    }
  ],
  "totalAmount": 998,
  "createdAt": "2026-07-01T10:30:00Z"
}
```

---

## website.order.cancelled

### Producer

External Website

### Consumer

Sync Service

Purpose:

Customer cancelled the order before shipment.

---

## order.created

### Producer

Order Service

### Consumers

- Inventory Service
- Analytics Service
- Notification Service

Purpose

A new OMS order has been successfully created.

---

## order.updated

### Producer

Order Service

### Consumer

Analytics Service

Purpose

Order status changed.

---

## order.completed

### Producer

Order Service

### Consumer

Analytics Service

Purpose

Order has been delivered successfully.

---

## order.cancelled

### Producer

Order Service

### Consumers

- Inventory Service
- Analytics Service
- Notification Service

Purpose

Order has been cancelled.

Inventory should release reserved stock.

---

## inventory.reserved

### Producer

Inventory Service

### Consumers

- Shipment Service
- Order Service

Purpose

Inventory has been successfully reserved.

Shipment creation can begin.

---

## inventory.failed

### Producer

Inventory Service

### Consumers

- Order Service
- Notification Service

Purpose

Inventory reservation failed.

Order Service should cancel the order.

---

## inventory.updated

### Producer

Inventory Service

### Consumer

Analytics Service

Purpose

Inventory changed because of restock or adjustments.

---

## inventory.released

### Producer

Inventory Service

### Consumer

Analytics Service

Purpose

Reserved stock has been released.

---

## shipment.created

### Producer

Shipment Service

### Consumers

- Order Service
- Analytics Service

Purpose

Shipment record created.

---

## shipment.packed

### Producer

Shipment Service

### Consumer

Order Service

Purpose

Package packed.

---

## shipment.dispatched

### Producer

Shipment Service

### Consumers

- Order Service
- Notification Service

Purpose

Package dispatched.

---

## shipment.out_for_delivery

### Producer

Shipment Service

### Consumers

- Order Service
- Notification Service

Purpose

Courier is delivering the package.

---

## shipment.delivered

### Producer

Shipment Service

### Consumers

- Order Service
- Analytics Service
- Notification Service

Purpose

Order successfully delivered.

---

## shipment.cancelled

### Producer

Shipment Service

### Consumer

Order Service

Purpose

Shipment cancelled.

---

## notification.sent

### Producer

Notification Service

### Consumer

Analytics Service (Optional)

Purpose

Notification successfully sent.

---

# Message Structure

Every Kafka event follows the same structure.

```json
{
  "eventId": "uuid",
  "eventType": "order.created",
  "timestamp": "2026-07-01T10:30:00Z",
  "source": "order-service",
  "version": "1.0",
  "data": {}
}
```

---

# Event Versioning

Every event contains:

```
version
```

Example

```
1.0
```

Future changes:

```
1.1

2.0
```

Consumers should ignore unknown fields whenever possible to maintain backward compatibility.

---

# Event Ordering

Ordering is guaranteed only within a Kafka partition.

Events related to the same order should use:

```
orderId
```

as the Kafka message key.

This ensures all events for a single order are processed in sequence.

---

# Retry Strategy

If event processing fails:

1. Retry processing.
2. Log the failure.
3. Retry according to configured policy.
4. Move to a Dead Letter Queue (future enhancement).

---

# Delivery Semantics

The OMS targets **at-least-once delivery**.

Therefore:

- Consumers must be idempotent.
- Duplicate events must be handled safely.

The Sync Service prevents duplicate external orders using the `processed_events` collection.

---

# Best Practices

- Publish only business events.
- Never publish database changes directly.
- Keep event payloads immutable.
- Include timestamps in every event.
- Use UUIDs for event IDs.
- Keep events small and focused.
- Avoid exposing internal implementation details in event payloads.

---

# Summary

Kafka is the communication backbone of the OMS.

It enables asynchronous communication between services while keeping them independent and scalable.

Each topic represents a meaningful business event, allowing services to react to changes without direct dependencies.