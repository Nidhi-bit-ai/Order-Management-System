import { useCallback, useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";

import NotificationDropdown from "./NotificationDropdown";
import {
  getNotifications,
  markNotificationRead,
} from "../../services/notificationService";

function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const wrapperRef = useRef(null);

  const loadNotifications = useCallback(async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

    useEffect(() => {
    const interval = setInterval(() => {
        loadNotifications();
    }, 10000);
    

    return () => clearInterval(interval);
    }, [loadNotifications]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      <button
        onClick={() => setOpen(!open)}
        className="relative"
      >
        <Bell size={24} color="white"/>

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {unreadCount}
          </span>
        )}
      </button>

      <NotificationDropdown
        open={open}
        notifications={notifications}
        onRead={handleRead}
      />
    </div>
  );
}

export default NotificationBell;