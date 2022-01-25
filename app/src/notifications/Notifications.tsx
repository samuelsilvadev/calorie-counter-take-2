import { useSafeSelector } from "store";
import Notification from "./Notification";
import { getNotificationsSelector } from "./state";
import styles from "./notifications.module.css";

function Notifications() {
  const notifications = useSafeSelector(getNotificationsSelector);

  return (
    <ul className={styles.list}>
      {notifications.map(({ id, message, type }) => (
        <li className={styles.item} key={id}>
          <Notification type={type} message={message} />
        </li>
      ))}
    </ul>
  );
}

export default Notifications;
