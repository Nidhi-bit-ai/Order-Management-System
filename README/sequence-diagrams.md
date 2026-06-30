# Sequence Diagrams

## Overview

This document illustrates the interactions between services in the Order Management System (OMS).

The diagrams use **Mermaid Sequence Diagrams**, which GitHub renders automatically.

---

# 1. Order Creation

```mermaid
sequenceDiagram

participant Customer
participant Website
participant Kafka
participant Sync
participant Order
participant Inventory
participant Shipment

Customer->>Website: Place Order
Website->>Kafka: website.order.created
Kafka->>Sync: Consume Event
Sync->>Order: Create Order (REST)
Order->>Order: Save Order
Order->>Kafka: order.created

Kafka->>Inventory: Consume order.created
Inventory->>Inventory: Reserve Stock

alt Stock Available
    Inventory->>Kafka: inventory.reserved
    Kafka->>Shipment: Consume inventory.reserved
    Shipment->>Shipment: Create Shipment
    Shipment->>Kafka: shipment.created
else Stock Not Available
    Inventory->>Kafka: inventory.failed
end
```

---

# 2. Inventory Reservation

```mermaid
sequenceDiagram

participant Order
participant Kafka
participant Inventory

Order->>Kafka: order.created

Kafka->>Inventory: Consume Event

Inventory->>Inventory: Validate Stock

alt Stock Available

Inventory->>Inventory: Reduce Available Stock

Inventory->>Inventory: Increase Reserved Stock

Inventory->>Kafka: inventory.reserved

else

Inventory->>Kafka: inventory.failed

end
```

---

# 3. Shipment Lifecycle

```mermaid
sequenceDiagram

participant Shipment
participant Kafka
participant Order
participant Notification

Shipment->>Kafka: shipment.created

Kafka->>Order: Update Status

Shipment->>Kafka: shipment.packed

Kafka->>Order: Update Status

Shipment->>Kafka: shipment.dispatched

Kafka->>Order: Update Status

Kafka->>Notification: Notify Customer

Shipment->>Kafka: shipment.out_for_delivery

Kafka->>Notification: Notify Customer

Shipment->>Kafka: shipment.delivered

Kafka->>Order: Update Status

Kafka->>Notification: Notify Customer
```

---

# 4. Order Cancellation

```mermaid
sequenceDiagram

participant Website
participant Kafka
participant Sync
participant Order
participant Inventory
participant Notification

Website->>Kafka: website.order.cancelled

Kafka->>Sync: Consume Event

Sync->>Order: Cancel Order

Order->>Kafka: order.cancelled

Kafka->>Inventory: Release Stock

Inventory->>Kafka: inventory.released

Kafka->>Notification: Send Cancellation Notification
```

---

# 5. Product Restock

```mermaid
sequenceDiagram

participant Admin
participant Gateway
participant Inventory
participant Kafka
participant Analytics

Admin->>Gateway: POST /products/:id/restock

Gateway->>Inventory: Forward Request

Inventory->>Inventory: Update Stock

Inventory->>Kafka: inventory.updated

Kafka->>Analytics: Update Dashboard
```

---

# 6. Authentication

```mermaid
sequenceDiagram

participant Admin
participant Gateway
participant Auth

Admin->>Gateway: POST /login

Gateway->>Auth: Validate Credentials

Auth->>Auth: Verify Password

Auth-->>Gateway: JWT Token

Gateway-->>Admin: Login Successful
```

---

# 7. Dashboard Request

```mermaid
sequenceDiagram

participant Admin
participant Gateway
participant Analytics

Admin->>Gateway: GET /dashboard

Gateway->>Analytics: Fetch Metrics

Analytics-->>Gateway: Dashboard Data

Gateway-->>Admin: Dashboard Response
```

---

# 8. Product Management

```mermaid
sequenceDiagram

participant Admin
participant Gateway
participant Inventory

Admin->>Gateway: Create Product

Gateway->>Inventory: POST /products

Inventory->>Inventory: Save Product

Inventory-->>Gateway: Product Created

Gateway-->>Admin: Success
```

---

# 9. Inventory Failure

```mermaid
sequenceDiagram

participant Inventory
participant Kafka
participant Order
participant Notification

Inventory->>Inventory: Check Stock

Inventory->>Kafka: inventory.failed

Kafka->>Order: Cancel Order

Kafka->>Notification: Notify Customer
```

---

# 10. Complete Order Lifecycle

```mermaid
sequenceDiagram

participant Website
participant Sync
participant Order
participant Inventory
participant Shipment
participant Notification
participant Analytics

Website->>Sync: New Order

Sync->>Order: Create Order

Order->>Inventory: order.created

Inventory->>Shipment: inventory.reserved

Shipment->>Order: shipment.created

Shipment->>Order: shipment.dispatched

Shipment->>Notification: Notify Customer

Shipment->>Order: shipment.delivered

Shipment->>Analytics: Update Revenue

Shipment->>Notification: Delivery Notification
```

---

# Notes

- Frontend communicates only with the API Gateway.
- Services communicate using REST only when synchronous processing is required.
- Business events are exchanged through Apache Kafka.
- Every service owns its own database.
- No service directly accesses another service's database.

---

# Summary

These sequence diagrams describe the major workflows of the Order Management System:

- Authentication
- Order Creation
- Inventory Reservation
- Shipment Lifecycle
- Order Cancellation
- Product Management
- Dashboard Retrieval

Together, they illustrate the complete interaction between services and demonstrate the event-driven architecture used throughout the system.