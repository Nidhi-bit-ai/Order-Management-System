# Service Responsibilities

## Purpose

This document defines the ownership and responsibilities of every microservice in the Order Management System (OMS).

Each service follows the **Single Responsibility Principle (SRP)**:

- One service = One business capability
- One service = One database
- One service = One owner

No service is allowed to directly access another service's database.

Communication between services happens through:

- REST APIs (synchronous)
- Apache Kafka Events (asynchronous)

---

# Service Overview

| Service | Responsibility | Database |
|----------|---------------|----------|
| Auth Service | Authentication & Authorization | auth-db |
| Sync Service | Receive external website events | sync-db |
| Order Service | Order lifecycle management | order-db |
| Inventory Service | Product & inventory management | inventory-db |
| Shipment Service | Shipment management | shipment-db |
| Analytics Service | Reporting & dashboards | analytics-db |
| Notification Service | Notifications | notification-db |

---

# 1. Auth Service

## Purpose

Manages authentication and authorization for OMS administrators.

---

## Responsibilities

- Admin Login
- JWT Generation
- User Management
- Role Management
- Password Hashing

---

## Owns Database

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

## REST APIs

```
POST /login

POST /logout

POST /users

GET /users

GET /users/:id

PATCH /users/:id

DELETE /users/:id
```

---

## Publishes Events

None (for MVP)

---

## Consumes Events

None

---

## Must Never

- Create Orders
- Update Inventory
- Manage Shipments

---

# 2. Sync Service

## Purpose

Receives order events from the external website and synchronizes them with OMS.

---

## Responsibilities

- Consume website Kafka events
- Validate incoming payload
- Prevent duplicate processing
- Call Order Service

---

## Owns Database

```
sync-db
```

Collections

```
processed_events
```

---

## REST APIs

None

---

## Consumes Events

```
website.order.created

website.order.cancelled
```

---

## Publishes Events

None

(The Sync Service forwards data to the Order Service through an internal API.)

---

## Must Never

- Store Orders
- Reserve Inventory
- Create Shipments

---

# 3. Order Service

## Purpose

Acts as the source of truth for all orders.

---

## Responsibilities

- Create OMS Orders
- Update Order Status
- Store Order History
- Track Order Lifecycle

---

## Owns Database

```
order-db
```

Collections

```
orders

order_events
```

---

## REST APIs

```
POST /orders

GET /orders

GET /orders/:id

PATCH /orders/:id/status

DELETE /orders/:id
```

---

## Publishes Events

```
order.created

order.cancelled

order.completed

order.updated
```

---

## Consumes Events

```
inventory.reserved

inventory.failed

shipment.created

shipment.packed

shipment.dispatched

shipment.out_for_delivery

shipment.delivered

shipment.cancelled
```

---

## Must Never

- Modify Product Stock
- Create Shipments
- Send Notifications

---

# 4. Inventory Service

## Purpose

Manages products and inventory.

---

## Responsibilities

- Product CRUD
- Reserve Stock
- Release Stock
- Restock Inventory
- Maintain Inventory History

---

## Owns Database

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

## REST APIs

```
GET /products

POST /products

PATCH /products/:id

DELETE /products/:id

POST /products/:id/restock

GET /products/:id
```

---

## Publishes Events

```
inventory.reserved

inventory.failed

inventory.updated

inventory.released
```

---

## Consumes Events

```
order.created

order.cancelled
```

---

## Must Never

- Update Order Status
- Create Shipments
- Generate Reports

---

# 5. Shipment Service

## Purpose

Manages shipment lifecycle.

---

## Responsibilities

- Create Shipment
- Assign Tracking Number
- Update Shipment Status
- Track Delivery

---

## Owns Database

```
shipment-db
```

Collections

```
shipments

shipment_events
```

---

## REST APIs

```
GET /shipments

GET /shipments/:id

PATCH /shipments/:id/status
```

---

## Publishes Events

```
shipment.created

shipment.packed

shipment.dispatched

shipment.out_for_delivery

shipment.delivered

shipment.cancelled
```

---

## Consumes Events

```
inventory.reserved
```

---

## Must Never

- Update Inventory
- Modify Orders Directly

---

# 6. Analytics Service

## Purpose

Maintains reporting data for dashboards.

---

## Responsibilities

- Sales Reports
- Inventory Reports
- Order Statistics
- Dashboard Metrics

---

## Owns Database

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

## REST APIs

```
GET /dashboard

GET /sales

GET /products

GET /inventory

GET /activity
```

---

## Publishes Events

None

---

## Consumes Events

```
order.created

order.completed

order.cancelled

inventory.updated

shipment.delivered
```

---

## Must Never

- Modify Orders
- Modify Inventory
- Create Shipments

---

# 7. Notification Service

## Purpose

Sends notifications to administrators or customers.

---

## Responsibilities

- Email Notifications
- SMS Notifications
- Push Notifications
- Notification History

---

## Owns Database

```
notification-db
```

Collections

```
notifications
```

---

## REST APIs

```
GET /notifications

GET /notifications/:id
```

---

## Publishes Events

```
notification.sent
```

---

## Consumes Events

```
order.created

order.cancelled

shipment.dispatched

shipment.delivered
```

---

## Must Never

- Update Orders
- Update Inventory
- Create Shipments

---

# Database Ownership

| Database | Owner |
|----------|-------|
| auth-db | Auth Service |
| sync-db | Sync Service |
| order-db | Order Service |
| inventory-db | Inventory Service |
| shipment-db | Shipment Service |
| analytics-db | Analytics Service |
| notification-db | Notification Service |

No database sharing is allowed.

---

# Event Ownership

| Event | Producer |
|--------|----------|
| website.order.created | External Website |
| website.order.cancelled | External Website |
| order.created | Order Service |
| order.updated | Order Service |
| order.completed | Order Service |
| order.cancelled | Order Service |
| inventory.reserved | Inventory Service |
| inventory.failed | Inventory Service |
| inventory.updated | Inventory Service |
| inventory.released | Inventory Service |
| shipment.created | Shipment Service |
| shipment.packed | Shipment Service |
| shipment.dispatched | Shipment Service |
| shipment.out_for_delivery | Shipment Service |
| shipment.delivered | Shipment Service |
| shipment.cancelled | Shipment Service |
| notification.sent | Notification Service |

---

# Service Communication Rules

✅ Allowed

- REST API through API Gateway
- Kafka Events
- HTTP APIs between services (when required)

❌ Not Allowed

- Direct database access
- Shared collections
- Shared business logic
- Cross-service model imports

---

# Guiding Principles

1. Every service owns its own data.
2. Every service exposes only its own APIs.
3. Events are immutable.
4. Services communicate through contracts, not implementation.
5. A service should remain functional even if another service is temporarily unavailable (eventual consistency).

---

# Summary

The OMS follows a clean separation of concerns:

- **Auth Service** secures the system.
- **Sync Service** imports external orders.
- **Order Service** manages the order lifecycle.
- **Inventory Service** manages products and stock.
- **Shipment Service** handles fulfillment.
- **Analytics Service** powers dashboards.
- **Notification Service** communicates important events.

This separation makes the system scalable, maintainable, and easy to extend.