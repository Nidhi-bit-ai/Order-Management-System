# Development Guide

## Overview

This document explains how to set up, develop, and contribute to the Order Management System (OMS).

The OMS follows a microservice architecture with independent services, MongoDB databases, Apache Kafka for asynchronous messaging, and an API Gateway for client communication.

---

# Prerequisites

Install the following software before starting development.

| Software | Version |
|----------|---------|
| Node.js | 20+ |
| npm | Latest |
| MongoDB | 7+ |
| Apache Kafka | Latest |
| Docker | Latest |
| Docker Compose | Latest |
| Git | Latest |
| VS Code | Recommended |

---

# Repository Structure

```
order-management-system/
│
├── frontend/
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
│   ├── config/
│   ├── kafka/
│   ├── logger/
│   ├── middleware/
│   └── utils/
│
├── docs/
├── scripts/
├── docker-compose.yml
├── package.json
└── README.md
```

---

# Environment Variables

Each service should maintain its own `.env` file.

Example:

```env
PORT=5001

MONGO_URI=mongodb://localhost:27017/inventory-db

JWT_SECRET=your-secret

KAFKA_BROKER=localhost:9092

NODE_ENV=development
```

Never commit:

- `.env`
- API Keys
- Secrets
- Passwords

Commit only:

```
.env.example
```

---

# Running the Project

## Install dependencies

```bash
npm install
```

---

## Start MongoDB

```bash
docker compose up mongodb
```

---

## Start Kafka

```bash
docker compose up kafka
```

---

## Start all services

```bash
docker compose up
```

---

## Start individual service

Example

```bash
cd services/order-service

npm run dev
```

---

# Coding Standards

## JavaScript

Use

- ES Modules
- Async/Await
- const by default
- let only when required

Avoid

```
var
```

---

## Naming

Variables

```js
orderId
```

Functions

```js
createOrder()
```

Controllers

```text
OrderController.js
```

Models

```text
Product.js
```

Routes

```text
order.routes.js
```

---

# Folder Structure (Service)

Example

```
order-service/

src/

├── config/
├── controllers/
├── models/
├── routes/
├── services/
├── middleware/
├── kafka/
├── utils/
├── validators/
├── app.js
└── server.js
```

---

# Database Rules

- One database per service.
- Never access another service's database.
- Communicate through REST APIs or Kafka.
- Keep collections independent.

---

# Kafka Guidelines

Publish only business events.

Good

```
order.created
```

Avoid

```
order_table_updated
```

Every event should include

```json
{
  "eventId": "...",
  "eventType": "...",
  "timestamp": "...",
  "source": "...",
  "version": "1.0",
  "data": {}
}
```

Consumers must be idempotent.

---

# API Guidelines

- Use REST principles.
- JSON request/response.
- Appropriate HTTP status codes.
- JWT authentication for protected endpoints.
- Consistent response format.

---

# Error Handling

Always return meaningful error responses.

Example

```json
{
  "success": false,
  "message": "Product not found"
}
```

Log unexpected errors.

Never expose stack traces in production.

---

# Logging

Log important events such as:

- Service startup
- API requests
- Kafka consumers
- Kafka producers
- Database connection
- Errors

Use structured logs where possible.

---

# Git Workflow

Main branches

```
main

develop
```

Feature branches

```
feature/auth-service

feature/order-service

feature/inventory-service
```

Bug fixes

```
bugfix/login

bugfix/inventory
```

---

# Commit Messages

Examples

```
feat: add order creation endpoint

fix: handle duplicate order events

docs: update architecture diagram

refactor: simplify inventory reservation

test: add order service unit tests
```

---

# Team Responsibilities

## Developer 1

- API Gateway
- Auth Service
- Inventory Service
- Shared Packages

---

## Developer 2

- Sync Service
- Order Service
- Shipment Service
- Analytics Service
- Notification Service

---

# Implementation Phases

## Phase 1

- Repository setup
- Docker setup
- Shared packages
- API Gateway
- Auth Service

---

## Phase 2

- Inventory Service
- Product APIs
- Stock management

---

## Phase 3

- Order Service
- Kafka integration
- Sync Service

---

## Phase 4

- Shipment Service
- Shipment lifecycle

---

## Phase 5

- Analytics Service
- Notification Service

---

## Phase 6

- Frontend integration
- Dashboard
- Testing

---

# Testing Strategy

## Unit Tests

Test:

- Controllers
- Services
- Utility functions

---

## Integration Tests

Test:

- REST APIs
- MongoDB
- Kafka messaging

---

## End-to-End Tests

Validate complete workflows such as:

- Login
- Product creation
- Order creation
- Inventory reservation
- Shipment updates
- Dashboard metrics

---

# Security Guidelines

- Hash passwords using bcrypt.
- Use JWT for authentication.
- Validate all input.
- Sanitize user data.
- Never trust client-side validation.
- Protect sensitive routes with middleware.

---

# Performance Guidelines

- Use indexes on frequently queried fields.
- Paginate large datasets.
- Avoid unnecessary database queries.
- Cache static configuration where appropriate.

---

# Future Enhancements

Potential improvements include:

- Dead Letter Queue (DLQ) for Kafka
- Distributed tracing
- Redis caching
- Role-based access control (RBAC)
- API rate limiting
- CI/CD pipeline
- Kubernetes deployment
- Monitoring with Prometheus and Grafana

---

# Troubleshooting

## Kafka not receiving events

- Verify Kafka broker is running.
- Check topic names.
- Confirm producer and consumer configurations.

---

## MongoDB connection failed

- Verify MongoDB is running.
- Check the `MONGO_URI`.
- Ensure the database exists or can be created.

---

## JWT errors

- Verify `JWT_SECRET`.
- Check token expiration.
- Confirm the `Authorization` header is present.

---

# Summary

This guide provides everything needed to develop and maintain the OMS:

- Development environment setup
- Project structure
- Coding standards
- Git workflow
- Kafka guidelines
- API conventions
- Testing strategy
- Security practices
- Team responsibilities

Following these guidelines ensures consistency across all services and simplifies collaboration.