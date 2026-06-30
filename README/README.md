# Order Management System (OMS)

> A scalable, event-driven Order Management System built using Microservices, Kafka, MongoDB, Node.js, Express, React, and Docker.

---

# Project Overview

This project is a distributed **Order Management System (OMS)** designed to process and manage orders received from an external e-commerce platform.

Unlike a traditional e-commerce application, this project **does not provide a shopping website**. Instead, it acts as the backend Order Management System responsible for:

- Receiving newly created orders
- Managing inventory
- Creating shipments
- Tracking order lifecycle
- Sending notifications
- Generating analytics

The external website communicates with the OMS using **Apache Kafka**, making the architecture loosely coupled and event-driven.

---

# Problem Statement

Most e-commerce websites tightly couple order processing with inventory, shipment, notifications, and reporting.

This creates several problems:

- Difficult to scale individual components
- Single point of failure
- Hard to integrate with external systems
- Difficult to maintain large codebases

This project solves these problems by separating responsibilities into independent microservices communicating through Kafka events.

---

# Architecture

```
                   External Website
                           │
                  Order Created Event
                           │
                    Apache Kafka
                           │
                    Sync Service
                           │
                    Order Service
                           │
               Order Created Event
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
 Inventory Service   Analytics Service   Notification Service
        │
        ▼
 Shipment Service
        │
        ▼
 Order Status Updates
```

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Apache Kafka
- JWT Authentication

## Frontend

- React
- React Router
- Axios

## Infrastructure

- Docker
- Docker Compose

---

# Microservices

## 1. Auth Service

Responsible for:

- Admin authentication
- JWT generation
- User management
- Role-based access

Database:

```
auth-db
```

---

## 2. Sync Service

Acts as the bridge between the external website and OMS.

Responsibilities:

- Consume website events
- Validate payload
- Prevent duplicate processing
- Forward valid orders to Order Service

Database:

```
sync-db
```

---

## 3. Order Service

Responsible for:

- Creating OMS orders
- Updating order status
- Maintaining order lifecycle

Database:

```
order-db
```

---

## 4. Inventory Service

Responsible for:

- Product management
- Stock reservation
- Restocking
- Inventory tracking

Database:

```
inventory-db
```

---

## 5. Shipment Service

Responsible for:

- Shipment creation
- Tracking
- Delivery status updates

Database:

```
shipment-db
```

---

## 6. Analytics Service

Responsible for:

- Dashboard statistics
- Sales analytics
- Inventory analytics
- Business reports

Database:

```
analytics-db
```

---

## 7. Notification Service

Responsible for:

- Email notifications
- SMS notifications
- Push notifications
- Notification history

Database:

```
notification-db
```

---

# Event Driven Architecture

The system communicates through Kafka events.

Example order lifecycle:

```
Website

↓

website.order.created

↓

Sync Service

↓

Order Service

↓

order.created

↓

Inventory Service

↓

inventory.reserved

↓

Shipment Service

↓

shipment.created

↓

shipment.dispatched

↓

shipment.delivered

↓

Order Completed
```

---

# Repository Structure

```
order-management-system/

│
├── frontend/
│
├── gateway/
│
├── services/
│   ├── auth-service/
│   ├── sync-service/
│   ├── order-service/
│   ├── inventory-service/
│   ├── shipment-service/
│   ├── analytics-service/
│   └── notification-service/
│
├── packages/
│   ├── kafka/
│   ├── logger/
│   ├── config/
│   └── utils/
│
├── docs/
│
├── scripts/
│
├── docker-compose.yml
│
├── README.md
│
└── .env.example
```

---

# Order Lifecycle

```
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

---

# Kafka Topics

| Topic | Producer | Consumer |
|----------|-----------------|----------------------|
| website.order.created | External Website | Sync Service |
| order.created | Order Service | Inventory, Analytics, Notification |
| inventory.reserved | Inventory Service | Shipment Service, Order Service |
| inventory.failed | Inventory Service | Order Service |
| shipment.created | Shipment Service | Order Service, Analytics |
| shipment.packed | Shipment Service | Order Service |
| shipment.dispatched | Shipment Service | Order Service, Notification |
| shipment.delivered | Shipment Service | Order Service, Analytics, Notification |

---

# Databases

| Service | Database |
|------------|----------------|
| Auth | auth-db |
| Sync | sync-db |
| Order | order-db |
| Inventory | inventory-db |
| Shipment | shipment-db |
| Analytics | analytics-db |
| Notification | notification-db |

Each service owns its own database.

No service directly accesses another service's database.

---

# APIs

Each microservice exposes its own REST APIs.

Example:

```
POST /orders

GET /orders

PATCH /orders/:id/status

GET /products

POST /products

POST /products/:id/restock

GET /shipments

PATCH /shipments/:id/status
```

---

# Design Principles

- Microservice Architecture
- Database Per Service
- Event Driven Communication
- Loose Coupling
- High Cohesion
- Scalability
- Fault Isolation
- Eventual Consistency

---

# Future Improvements

- Saga Pattern
- Dead Letter Queue
- Retry Mechanism
- Redis Caching
- Kubernetes Deployment
- Elasticsearch
- Prometheus Monitoring
- Grafana Dashboards
- Distributed Tracing
- API Rate Limiting

---

# Getting Started

## Clone Repository

```bash
git clone <repository-url>
cd order-management-system
```

---

## Start Infrastructure

```bash
docker-compose up -d
```

---

## Install Dependencies

Navigate to each service and install packages.

Example:

```bash
cd services/order-service
npm install
```

Repeat for all services.

---

## Start Services

```bash
npm run dev
```

---

## Start Frontend

```bash
cd frontend
npm install
npm start
```

---

# Documentation

Detailed documentation is available in the `/docs` directory.

- Architecture
- Database Design
- Kafka Topics
- API Contracts
- Event Flow
- Sequence Diagrams
- Development Guide

---

# Contributors

- Developer 1
- Developer 2

---

# License

This project is developed for educational and learning purposes.