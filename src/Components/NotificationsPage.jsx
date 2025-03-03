import { useState } from 'react';
import { FaBell, FaRegBell, FaCheckCircle, FaRegClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New Message Received',
      message: 'You have a new message from John regarding your order',
      timestamp: '2024-02-15T09:30:00',
      read: false,
      type: 'message'
    },
    {
      id: 2,
      title: 'Order Shipped',
      message: 'Your order #12345 has been shipped',
      timestamp: '2024-02-15T08:45:00',
      read: true,
      type: 'shipping'
    },
    {
      id: 3,
      title: 'Payment Received',
      message: 'Payment for invoice #INV-2024-02 has been confirmed',
      timestamp: '2024-02-14T16:20:00',
      read: false,
      type: 'payment'
    },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // difference in seconds
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
    return `${Math.floor(diff/86400)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Digital Krishii Header */}
        <div className="text-center text-3xl font-bold text-green-700 mb-6">
          Digital Krishii
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaBell className="text-blue-500" />
              Notifications
            </h1>
            <button 
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Mark all as read
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-l-4 ${
                  notification.read 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-blue-50 border-blue-500'
                } relative transition-all duration-200 hover:shadow-sm`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {notification.read ? (
                      <FaRegBell className="text-gray-400" />
                    ) : (
                      <div className="relative">
                        <FaBell className="text-blue-500" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800">
                        {notification.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {getTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                          <FaCheckCircle className="text-sm" />
                          Mark as read
                        </button>
                      )}
                      <span className="flex items-center gap-1 text-gray-500">
                        <FaRegClock className="text-sm" />
                        {new Date(notification.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {notifications.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No notifications available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
