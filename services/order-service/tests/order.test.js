beforeAll(async () => {
  // ensure DB is running externally (Docker)
});

import request from "supertest";
import app from "../src/app.js";

/**
 * =========================
 * ORDER SERVICE TESTS
 * =========================
 * These are integration tests for REST APIs
 */

describe("Order Service API Tests", () => {
  let createdOrderId;

  /**
   * =========================
   * TEST: CREATE ORDER
   * =========================
   */
  test("POST /api/v1/orders - should create order", async () => {
    const response = await request(app)
      .post("/api/v1/orders")
      .send({
        customerId: "CUST_TEST_001",
        items: [
          {
            productId: "PROD_1",
            name: "Test Product",
            quantity: 2,
            price: 100,
          },
        ],
        shippingAddress: {
          name: "Test User",
          phone: "9999999999",
          address: "Test Address",
          city: "Delhi",
          state: "Delhi",
          pincode: "110001",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.orderId).toBeDefined();

    createdOrderId = response.body.data.orderId;
  });

  /**
   * =========================
   * TEST: GET ORDER BY ID
   * =========================
   */
  test("GET /api/v1/orders/:orderId - should fetch order", async () => {
    const response = await request(app).get(
      `/api/v1/orders/${createdOrderId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.data.orderId).toBe(createdOrderId);
  });

  /**
   * =========================
   * TEST: GET ALL ORDERS
   * =========================
   */
  test("GET /api/v1/orders - should return orders list", async () => {
    const response = await request(app).get("/api/v1/orders");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  /**
   * =========================
   * TEST: CANCEL ORDER
   * =========================
   */
  test("PUT /api/v1/orders/:orderId/cancel - should cancel order", async () => {
    const response = await request(app).put(
      `/api/v1/orders/${createdOrderId}/cancel`
    );

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe("CANCELLED");
  });
});