/**
 * Convert external order format
 * into OMS order format
 */
export const transformOrder = (externalOrder) => {
  return {
    externalOrderId: externalOrder.id,
    customerId: externalOrder.customer.id,

    items: externalOrder.items.map((item) => ({
      productId: item.sku,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    })),

    shippingAddress: {
      name: externalOrder.shippingAddress.name,
      phone: externalOrder.shippingAddress.phone,
      address: externalOrder.shippingAddress.address,
      city: externalOrder.shippingAddress.city,
      state: externalOrder.shippingAddress.state,
      pincode: externalOrder.shippingAddress.pincode,
    },

    totalAmount: externalOrder.totalAmount,
    paymentMethod: externalOrder.paymentMethod,
  };
};