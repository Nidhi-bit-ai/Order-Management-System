import NotificationItem from "./NotificationItem";

function NotificationDropdown({
  open,
  notifications,
  onRead,
}) {
  if (!open) return null;

  return (
    <div className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">

      <div className="p-4 border-b font-bold text-lg">
        Notifications
      </div>

      <div className="max-h-[450px] overflow-y-auto">

        {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <span className="text-3xl">🔔</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
            You're all caught up!
            </h3>

            <p className="text-sm text-gray-500 mt-2">
            No new notifications.
            </p>
        </div>
        ) : (
        notifications.map((notification) => (
            <NotificationItem
            key={notification._id}
            notification={notification}
            onRead={onRead}
            />
        ))
        )}

      </div>

    </div>
  );
}

export default NotificationDropdown;