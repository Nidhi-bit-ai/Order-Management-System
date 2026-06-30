# API Contracts

## Overview

This document defines the REST APIs exposed by each microservice.

All APIs follow REST principles and communicate using JSON.

---

# Base URL

During development

```
http://localhost:5000/api
```

Requests pass through the API Gateway.

```
React
    │
    ▼
API Gateway
    │
    ▼
Microservices
```

---

# Common Response Format

## Success

```json
{
    "success": true,
    "message": "Operation successful",
    "data": {}
}
```

---

## Error

```json
{
    "success": false,
    "message": "Validation failed",
    "error": {}
}
```

---

# Authentication

All protected APIs require JWT.

```
Authorization

Bearer <token>
```

Exceptions

```
POST /login
```

---

# HTTP Status Codes

| Code | Meaning |
|------|----------|
|200|OK|
|201|Created|
|204|No Content|
|400|Bad Request|
|401|Unauthorized|
|403|Forbidden|
|404|Not Found|
|409|Conflict|
|500|Internal Server Error|

---

# Auth Service

Base Path

```
/auth
```

---

## Login

POST

```
/auth/login
```

### Request

```json
{
    "email":"admin@oms.com",
    "password":"password123"
}
```

---

### Success

```json
{
    "success": true,
    "message":"Login Successful",
    "data":{
        "token":"JWT_TOKEN",
        "user":{
            "id":"USR001",
            "name":"Admin",
            "role":"ADMIN"
        }
    }
}
```

---

### Errors

```
400 Invalid Request

401 Invalid Credentials
```

---

## Logout

POST

```
/auth/logout
```

Headers

```
Authorization: Bearer <token>
```

Success

```
200 OK
```

---

## Create User

POST

```
/auth/users
```

Request

```json
{
    "name":"Warehouse Admin",
    "email":"warehouse@oms.com",
    "password":"password",
    "role":"WAREHOUSE"
}
```

Success

```
201 Created
```

---

## Get Users

GET

```
/auth/users
```

Response

```json
{
  "success": true,
  "data": [
    {
      "id": "USR001",
      "name": "Admin",
      "role": "ADMIN"
    }
  ]
}
```

---

## Get User

GET

```
/auth/users/:id
```

---

## Update User

PATCH

```
/auth/users/:id
```

---

## Delete User

DELETE

```
/auth/users/:id
```

---

# Inventory Service

Base Path

```
/inventory
```

---

## Get Products

GET

```
/inventory/products
```

Query Parameters

```
?page=1

&limit=10

&category=Laptop

&search=Macbook
```

Response

```json
{
  "success": true,
  "data": [
    {
      "productId":"P101",
      "name":"Laptop",
      "availableStock":50,
      "sellingPrice":45000
    }
  ]
}
```

---

## Get Product

GET

```
/inventory/products/:id
```

---

## Create Product

POST

```
/inventory/products
```

Request

```json
{
    "sku":"SKU101",
    "name":"Laptop",
    "description":"Gaming Laptop",
    "category":"Electronics",
    "brand":"Dell",
    "sellingPrice":45000,
    "costPrice":38000,
    "availableStock":100,
    "reorderLevel":20
}
```

Success

```
201 Created
```

---

## Update Product

PATCH

```
/inventory/products/:id
```

Request

```json
{
    "sellingPrice":47000,
    "availableStock":120
}
```

---

## Delete Product

DELETE

```
/inventory/products/:id
```

Only allowed if

```
No active reservations
```

---

## Restock Product

POST

```
/inventory/products/:id/restock
```

Request

```json
{
    "quantity":50,
    "reason":"Supplier Delivery"
}
```

Success

```json
{
    "success":true,
    "message":"Inventory Updated"
}
```

Kafka Published

```
inventory.updated
```

---

## Get Inventory Transactions

GET

```
/inventory/transactions
```

Filters

```
productId

type

date

page

limit
```

---

## Reserve Inventory

Internal API

Used only by Order Service.

POST

```
/inventory/reserve
```

Request

```json
{
  "orderId":"ORD1001",
  "items":[
    {
      "productId":"P101",
      "quantity":2
    }
  ]
}
```

Possible Results

```
Reservation Successful

↓

inventory.reserved
```

or

```
Reservation Failed

↓

inventory.failed
```

This API is **not exposed to the frontend**.

---

# Validation Rules

Product

| Field | Validation |
|--------|------------|
|SKU|Required, Unique|
|Name|Required|
|Selling Price|Greater than 0|
|Cost Price|Greater than 0|
|Available Stock|Greater than or equal to 0|
|Reorder Level|Greater than or equal to 0|

---

# Error Responses

Duplicate SKU

```json
{
    "success":false,
    "message":"SKU already exists"
}
```

Invalid Product

```json
{
    "success":false,
    "message":"Product not found"
}
```

Insufficient Stock

```json
{
    "success":false,
    "message":"Insufficient inventory"
}
```

---

# Summary

This section covers:

- Auth Service APIs
- Inventory Service APIs
- Authentication requirements
- Response formats
- Validation rules
- Standard error responses

---

# Order Service

## Base Path

```
/orders
```

The Order Service is the source of truth for all orders inside the OMS.

It is responsible for:

- Creating OMS orders
- Maintaining order lifecycle
- Updating order status
- Order history

---

## Create Order (Internal)

> This endpoint is called only by the Sync Service after validating an external website event.

POST

```
/orders
```

### Request

```json
{
  "externalOrderId": "WEB10001",
  "customerId": "CUS001",
  "items": [
    {
      "productId": "P101",
      "quantity": 2,
      "unitPrice": 45000
    }
  ],
  "totalAmount": 90000
}
```

---

### Success

```
201 Created
```

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "orderId": "ORD1001",
    "status": "CREATED"
  }
}
```

Publishes

```
order.created
```

---

## Get Orders

GET

```
/orders
```

### Query Parameters

```
page

limit

status

customerId

sort
```

Example

```
GET /orders?page=1&limit=20&status=DELIVERED
```

---

### Response

```json
{
  "success": true,
  "data": [
    {
      "orderId": "ORD1001",
      "status": "DELIVERED",
      "totalAmount": 90000
    }
  ]
}
```

---

## Get Order

GET

```
/orders/:id
```

Returns complete order information.

---

## Update Order Status

PATCH

```
/orders/:id/status
```

### Request

```json
{
  "status": "READY_TO_SHIP"
}
```

---

Allowed Status

```
CREATED

INVENTORY_RESERVED

READY_TO_SHIP

PACKED

DISPATCHED

OUT_FOR_DELIVERY

DELIVERED

CANCELLED
```

---

Response

```
200 OK
```

---

## Cancel Order

PATCH

```
/orders/:id/cancel
```

Only allowed before shipment is dispatched.

Publishes

```
order.cancelled
```

---

## Get Order Events

GET

```
/orders/:id/events
```

Returns complete order history.

Example

```
CREATED

↓

INVENTORY_RESERVED

↓

SHIPMENT_CREATED

↓

PACKED

↓

DISPATCHED
```

---

# Internal APIs

These APIs are not exposed through the frontend.

---

## Update Inventory Status

POST

```
/orders/internal/inventory
```

Request

```json
{
  "orderId": "ORD1001",
  "inventoryStatus": "RESERVED"
}
```

---

## Update Shipment Status

POST

```
/orders/internal/shipment
```

Request

```json
{
  "orderId": "ORD1001",
  "shipmentStatus": "DISPATCHED"
}
```

---

# Validation Rules

| Field | Rule |
|------|------|
|Items|Minimum 1|
|Quantity|Greater than 0|
|Price|Greater than 0|
|Customer ID|Required|

---

# Shipment Service

## Base Path

```
/shipments
```

Shipment Service manages fulfillment after inventory reservation.

---

## Get Shipments

GET

```
/shipments
```

Filters

```
status

trackingNumber

page

limit
```

---

## Get Shipment

GET

```
/shipments/:id
```

Returns shipment details.

---

## Create Shipment (Internal)

Called automatically after

```
inventory.reserved
```

POST

```
/shipments
```

### Request

```json
{
  "orderId": "ORD1001"
}
```

---

### Response

```json
{
  "success": true,
  "data": {
    "shipmentId": "SHIP001",
    "trackingNumber": "TRK987654"
  }
}
```

Publishes

```
shipment.created
```

---

## Update Shipment Status

PATCH

```
/shipments/:id/status
```

Request

```json
{
  "status": "PACKED"
}
```

---

Allowed Status

```
CREATED

PACKED

DISPATCHED

OUT_FOR_DELIVERY

DELIVERED

CANCELLED
```

---

Kafka Published

Depending on status

```
shipment.packed

shipment.dispatched

shipment.out_for_delivery

shipment.delivered

shipment.cancelled
```

---

## Get Shipment Timeline

GET

```
/shipments/:id/timeline
```

Example Response

```json
{
  "shipmentId": "SHIP001",
  "events": [
    {
      "status": "CREATED",
      "timestamp": "2026-07-01T10:00:00Z"
    },
    {
      "status": "PACKED",
      "timestamp": "2026-07-01T12:30:00Z"
    }
  ]
}
```

---

# Internal APIs

---

## Assign Tracking Number

POST

```
/shipments/internal/assign
```

Request

```json
{
  "shipmentId": "SHIP001",
  "trackingNumber": "TRK123456"
}
```

---

## Cancel Shipment

POST

```
/shipments/internal/cancel
```

Publishes

```
shipment.cancelled
```

---

# Validation Rules

| Field | Rule |
|------|------|
|Order ID|Required|
|Tracking Number|Unique|
|Shipment Status|Must be valid enum|

---

# Common Errors

Shipment Not Found

```json
{
  "success": false,
  "message": "Shipment not found"
}
```

---

Order Not Found

```json
{
  "success": false,
  "message": "Order not found"
}
```

---

Invalid Status Transition

Example

```
DELIVERED

↓

PACKED
```

Response

```json
{
  "success": false,
  "message": "Invalid status transition"
}
```

---

# Business Rules

- An order must exist before a shipment can be created.
- Shipment creation requires successful inventory reservation.
- Shipment status can only move forward.
- Delivered shipments cannot be modified.
- Cancelled shipments cannot be resumed.
- Only Shipment Service controls shipment status.
- Only Order Service controls order status.

---

# Summary

This section defines the APIs for:

- Order Service
- Shipment Service
- Internal service communication
- Status updates
- Shipment tracking
- Validation rules
- Error handling


---

# Analytics Service

## Base Path

```
/analytics
```

The Analytics Service provides business insights and dashboard data.

Unlike other services, it is **read-heavy** and primarily consumes Kafka events to maintain aggregated statistics.

---

## Get Dashboard

GET

```
/analytics/dashboard
```

### Response

```json
{
  "success": true,
  "data": {
    "totalOrders": 250,
    "completedOrders": 220,
    "cancelledOrders": 15,
    "pendingOrders": 15,
    "totalRevenue": 1525000,
    "totalProducts": 120
  }
}
```

---

## Get Daily Sales

GET

```
/analytics/sales
```

Query Parameters

```
startDate

endDate
```

---

Response

```json
{
  "success": true,
  "data": [
    {
      "date": "2026-07-01",
      "orders": 35,
      "revenue": 225000
    }
  ]
}
```

---

## Get Product Statistics

GET

```
/analytics/products
```

Response

```json
{
  "success": true,
  "data": [
    {
      "productId": "P101",
      "name": "Laptop",
      "quantitySold": 55,
      "revenue": 2475000
    }
  ]
}
```

---

## Get Inventory Statistics

GET

```
/analytics/inventory
```

Returns

- Current Stock
- Reserved Stock
- Low Stock Products

---

## Get Activity Logs

GET

```
/analytics/activity
```

Returns recent business events processed by Analytics Service.

---

# Notification Service

## Base Path

```
/notifications
```

The Notification Service is responsible for recording and sending notifications.

---

## Get Notifications

GET

```
/notifications
```

---

## Get Notification

GET

```
/notifications/:id
```

---

## Retry Notification

POST

```
/notifications/:id/retry
```

Used for failed notifications.

---

## Internal API

The Notification Service receives Kafka events and automatically generates notifications.

Supported Events

```
order.created

order.cancelled

shipment.dispatched

shipment.out_for_delivery

shipment.delivered
```

Example Notification

```json
{
  "notificationId": "NOT001",
  "orderId": "ORD1001",
  "type": "EMAIL",
  "status": "SENT",
  "message": "Your order has been dispatched."
}
```

---

# Gateway

## Base URL

```
/api
```

Gateway forwards requests to the correct microservice.

Example

```
/api/orders

↓

Order Service
```

```
/api/inventory

↓

Inventory Service
```

```
/api/auth

↓

Auth Service
```

Responsibilities

- Authentication
- JWT Verification
- Routing
- Logging
- Request Validation

Gateway never contains business logic.

---

# Authentication

Every protected request requires

```
Authorization

Bearer <JWT>
```

Gateway validates JWT before forwarding the request.

---

# Pagination

All list APIs support

```
page

limit
```

Example

```
GET /orders?page=2&limit=20
```

---

# Sorting

Example

```
sort=createdAt

sort=-createdAt
```

Ascending

```
createdAt
```

Descending

```
- createdAt
```

---

# Filtering

Example

```
status=DELIVERED

category=Electronics

customerId=CUST001
```

---

# Standard Error Format

```json
{
  "success": false,
  "message": "Resource not found",
  "error": {
    "code": "NOT_FOUND"
  }
}
```

---

# Validation Errors

```json
{
  "success": false,
  "message": "Validation failed",
  "error": {
    "field": "sellingPrice",
    "reason": "Must be greater than zero"
  }
}
```

---

# Unauthorized

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

---

# Forbidden

```json
{
  "success": false,
  "message": "Forbidden"
}
```

---

# Resource Not Found

```json
{
  "success": false,
  "message": "Order not found"
}
```

---

# Internal Server Error

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

# API Design Guidelines

Every API follows these principles:

- Stateless
- RESTful
- JSON Request/Response
- Versionable
- JWT Protected
- Predictable Response Format

---

# API Naming Conventions

Resources are plural.

Examples

```
/orders

/products

/shipments

/users
```

Actions are represented through HTTP methods.

```
GET

POST

PATCH

DELETE
```

Avoid verbs in URLs whenever possible.

---

# Summary

This document defines every public API exposed by the OMS.

All services expose REST APIs for frontend interaction while Kafka handles asynchronous communication between services.

This separation keeps the architecture clean, scalable, and easy to maintain.