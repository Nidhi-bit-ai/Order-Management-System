export const getRecipients = (event) => {
  switch (event) {
    // CUSTOMER ONLY
    case "order.created":
    case "shipment.created":
    case "shipment.packaged":
    case "shipment.picked_up":
    case "shipment.at_origin_hub":
    case "shipment.in_transit":
    case "shipment.at_destination_hub":
    case "shipment.out_for_delivery":
    case "shipment.delivered":
      return ["CUSTOMER"];

    // ADMIN ONLY
    case "inventory.low_stock_warning":
    case "inventory.failed":
    case "inventory.reserved":
      return ["ADMIN"];

    // BOTH
    case "order.cancelled":
    case "shipment.cancelled":
      return ["CUSTOMER", "ADMIN"];

    default:
      return [];
  }
};