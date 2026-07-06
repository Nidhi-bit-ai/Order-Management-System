export const TOPICS = {
  ORDER_CREATED: "order.created",
  ORDER_UPDATED: "order.updated",
  ORDER_CANCELLED: "order.cancelled",

  INVENTORY_RESERVED: "inventory.reserved",
  INVENTORY_FAILED: "inventory.failed",
  INVENTORY_RELEASED: "inventory.released",
  INVENTORY_LOW_STOCK_WARNING: "inventory.low_stock_warning",

  SHIPMENT_CREATED: "shipment.created",
  SHIPMENT_PACKAGED: "shipment.packaged",
  SHIPMENT_PICKED_UP: "shipment.picked_up",
  SHIPMENT_AT_ORIGIN_HUB: "shipment.at_origin_hub",
  SHIPMENT_IN_TRANSIT: "shipment.in_transit",
  SHIPMENT_AT_DESTINATION_HUB: "shipment.at_destination_hub",
  SHIPMENT_OUT_FOR_DELIVERY: "shipment.out_for_delivery",
  SHIPMENT_DELIVERED: "shipment.delivered",
  SHIPMENT_CANCELLED: "shipment.cancelled",

  SYNC_ORDER_CREATED: "sync.order.created",
  SYNC_ORDER_UPDATED: "sync.order.updated",
  SYNC_ORDER_CANCELLED: "sync.order.cancelled",
};

export const topics = Object.values(TOPICS);