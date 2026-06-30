# System Architecture

## Overview

The Order Management System (OMS) is a distributed, event-driven application built using the Microservices Architecture pattern.

Unlike traditional monolithic applications, each business capability is implemented as an independent service with its own database. Services communicate asynchronously using Apache Kafka.

The OMS is designed to integrate with an existing e-commerce platform without requiring any modifications to that platform.

---

# High Level Architecture

```
                    Existing E-Commerce Website
                               │
                               │
                     website.order.created
                               │
                               ▼
                        Apache Kafka
                               │
                               ▼
                         Sync Service
                               │
                               │ REST API
                               ▼
                         API Gateway
                               │
                               ▼
                        Order Service
                               │
                      order.created Event
                               │
          ┌────────────────────┼─────────────────────┐
          │                    │                     │
          ▼                    ▼                     ▼
 Inventory Service     Analytics Service    Notification Service
          │
          │ inventory.reserved
          ▼
   Shipment Service
          │
          │ shipment.created
          │ shipment.dispatched
          │ shipment.delivered
          ▼
      Order Service
```

---

# Microservice Architecture

Each service has a single responsibility.

```
OMS

├── Auth Service
│
├── Sync Service
│
├── Order Service
│
├── Inventory Service
│
├── Shipment Service
│
├── Analytics Service
│
└── Notification Service
```

Every service can be independently developed, deployed and scaled.

---

# Why Microservices?

Instead of creating one large application, the project separates business responsibilities into multiple services.

Advantages:

- Independent deployment
- Independent databases
- Better scalability
- Easier maintenance
- Fault isolation
- Technology independence
- Clear ownership

---

# Service Responsibilities

## Auth Service

Responsible for

- Login
- JWT generation
- User management
- Role management

Owns

```
auth-db
```

---

## Sync Service

Acts as the bridge between the external website and OMS.

Responsibilities

- Consume Kafka events from website
- Validate payload
- Prevent duplicate processing
- Forward valid orders

Owns

```
sync-db
```

---

## Order Service

Responsible for

- Order creation
- Order lifecycle
- Order status updates
- Order history

Owns

```
order-db
```

---

## Inventory Service

Responsible for

- Product management
- Inventory management
- Stock reservation
- Stock release
- Restocking

Owns

```
inventory-db
```

---

## Shipment Service

Responsible for

- Shipment creation
- Tracking
- Delivery updates

Owns

```
shipment-db
```

---

## Analytics Service

Responsible for

- Dashboard
- Business reports
- Sales analytics
- Inventory analytics

Owns

```
analytics-db
```

---

## Notification Service

Responsible for

- Email
- SMS
- Push Notifications
- Notification History

Owns

```
notification-db
```

---

# Database Per Service Pattern

Each service owns its own MongoDB database.

```
                 MongoDB

        auth-db

        sync-db

        order-db

        inventory-db

        shipment-db

        analytics-db

        notification-db
```

No service is allowed to directly query another service's database.

Communication always happens through:

- REST APIs
- Kafka Events

---

# Event Driven Communication

The project follows asynchronous communication.

Example

```
Order Service

↓

Publish

↓

order.created

↓

Kafka

↓

Inventory Service
```

Inventory Service never directly calls Order Service.

---

# Order Lifecycle

```
Website

↓

website.order.created

↓

Sync Service

↓

Order Created

↓

Inventory Reserved

↓

Shipment Created

↓

Packed

↓

Dispatched

↓

Out For Delivery

↓

Delivered
```

Each stage is represented by an event.

---

# Communication Pattern

## Synchronous Communication

Used only when immediate response is required.

Example

```
Frontend

↓

Gateway

↓

Order Service

↓

MongoDB
```

Communication

REST API

---

## Asynchronous Communication

Used for business workflows.

```
Order Service

↓

Kafka

↓

Inventory Service
```

Communication

Apache Kafka

---

# API Gateway

All frontend requests pass through the API Gateway.

```
React

↓

Gateway

↓

Microservices
```

Responsibilities

- Authentication
- Authorization
- Request Routing
- Logging
- Rate Limiting (Future)

Business logic is never implemented inside the gateway.

---

# Kafka Architecture

```
Order Service

↓

Kafka Producer

↓

Kafka Broker

↓

Inventory Consumer

↓

Inventory Service
```

Every service can have both

- Producer
- Consumer

depending on its responsibility.

---

# Design Principles

## Single Responsibility Principle

Every service owns exactly one business capability.

Example

Inventory Service never manages shipments.

Shipment Service never manages inventory.

---

## Loose Coupling

Services know only about events.

They never depend on internal implementation of other services.

---

## High Cohesion

Related business logic stays inside one service.

Example

Everything related to inventory belongs to Inventory Service.

---

## Eventual Consistency

Because services have separate databases,

updates happen asynchronously.

The system becomes eventually consistent after all events are processed.

---

# Scalability

Each service can be scaled independently.

Example

```
            Inventory

       Instance 1

       Instance 2

       Instance 3
```

Order Service does not need to scale if Inventory experiences high load.

---

# Fault Tolerance

Suppose Inventory Service is temporarily unavailable.

```
Order Service

↓

Kafka

↓

Event Stored

↓

Inventory Offline

↓

Inventory Restarts

↓

Consumes Pending Event
```

No events are lost.

---

# Why Apache Kafka?

Kafka provides

- High throughput
- Durable event storage
- Retry capability
- Loose coupling
- Event replay
- Scalability

Kafka becomes the communication backbone of the OMS.

---

# Why MongoDB?

MongoDB was selected because

- Flexible schema
- Fast development
- JSON documents
- Horizontal scalability
- Easy integration with Node.js

Each service can evolve its schema independently.

---

# Deployment Architecture

```
Docker

│

├── MongoDB

├── Kafka

├── Zookeeper

├── Gateway

├── Auth Service

├── Sync Service

├── Order Service

├── Inventory Service

├── Shipment Service

├── Analytics Service

├── Notification Service

└── React Frontend
```

Everything runs using Docker Compose during development.

---

# Future Enhancements

The architecture can be extended with

- Saga Pattern
- Redis Cache
- Dead Letter Queue
- Elasticsearch
- Prometheus
- Grafana
- Kubernetes
- Distributed Tracing
- Service Discovery
- CI/CD Pipeline

No major architectural changes are required to add these components.

---

# Summary

This architecture follows modern backend engineering practices by combining:

- Microservices
- Event-Driven Communication
- Database Per Service
- Apache Kafka
- REST APIs
- Independent Deployment
- Loose Coupling
- High Cohesion

The result is a scalable, maintainable, and production-inspired Order Management System suitable for learning distributed systems and backend architecture.