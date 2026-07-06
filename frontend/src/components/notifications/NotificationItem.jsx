import { formatDistanceToNow } from "date-fns";
import {
  ShoppingCart,
  Package,
  Boxes,
} from "lucide-react";

function NotificationItem({
  notification,
  onRead,
}) {
  const badgeStyles = {
    ORDER: "bg-blue-100 text-blue-700",
    SHIPMENT: "bg-green-100 text-green-700",
    INVENTORY: "bg-orange-100 text-orange-700",
  };

  const icons = {
    ORDER: (
      <ShoppingCart
        size={18}
        className="text-blue-600"
      />
    ),
    SHIPMENT: (
      <Package
        size={18}
        className="text-green-600"
      />
    ),
    INVENTORY: (
      <Boxes
        size={18}
        className="text-orange-600"
      />
    ),
  };

  return (
    <div
      onClick={() => onRead(notification._id)}
      className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition ${
        !notification.read
          ? "bg-blue-50"
          : "bg-white"
      }`}
    >
      <div className="flex gap-3">

        {/* Notification Icon */}
        <div className="mt-1">
          {icons[notification.type]}
        </div>

        <div className="flex-1">

          {/* Title + Badge */}
          <div className="flex items-center gap-2">

            <h4
              className={`font-semibold ${
                !notification.read
                  ? "text-blue-700"
                  : "text-gray-800"
              }`}
            >
              {notification.title}
            </h4>

            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            )}

            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                badgeStyles[notification.type]
              }`}
            >
              {notification.type}
            </span>

          </div>

          {/* Message */}
          <p className="text-sm text-gray-600 mt-1">
            {notification.message}
          </p>

          {/* Time */}
          <p className="text-xs text-gray-400 mt-2">
            {formatDistanceToNow(
              new Date(notification.createdAt),
              { addSuffix: true }
            )}
          </p>

        </div>

      </div>
    </div>
  );
}

export default NotificationItem;