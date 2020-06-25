import React from 'react';
import Notification from './Notification/Notification';
import './NotificationContainer.scss';

/**
 * @param {Array.<{message: String}|{message: String, title: String=, delay: Number=}>} notifications - array of messages,
 * delay for specific message has more priority than for all messages
 * @param {number=} delay - timer for the messages after which it will be deleted
 */
function NotificationContainer({ notifications, delay }) {
  const isArray = (element) => element instanceof Array;

  return (
    <div className="notifications" aria-live="polite" aria-atomic="true" >
      {notifications.map((notification) => (
        <Notification
          key={notification}
          title={isArray(notification) && notification[1]}
          message={isArray(notification) && notification[0] || notification}
          delay={isArray(notification) && notification[2] || delay} />
        ))}
    </div>
  );
}

export default NotificationContainer;
