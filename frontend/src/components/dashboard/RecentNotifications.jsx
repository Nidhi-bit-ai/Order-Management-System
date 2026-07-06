import { useEffect, useState } from "react";
import { getNotifications } from "../../services/notificationService";

function RecentNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Latest Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n._id}
            className="border-b pb-3"
          >
            <p className="font-semibold">
              {n.title}
            </p>

            <p className="text-sm text-gray-600">
              {n.message}
            </p>
          </div>
        ))}

        {notifications.length === 0 && (
          <p className="text-gray-500">
            No notifications
          </p>
        )}
      </div>
    </div>
  );
}

export default RecentNotifications;