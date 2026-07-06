import { createContext, useContext, useEffect, useState } from "react";
import { getNotifications } from "../services/notificationService";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data || []);
    } catch (err) {
      console.log("Notification error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();

    // OPTIONAL: polling every 10 sec (simple realtime)
    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, fetchNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () =>
  useContext(NotificationContext);