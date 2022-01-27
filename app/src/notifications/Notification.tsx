import CloseInCircle from "shared/components/icons/CloseInCircle";
import Check from "shared/components/icons/Check";
import styles from "./notification.module.css";

type NotificationProps = {
  message: string;
  type: "success" | "error";
};

const Icons = {
  success: Check,
  error: CloseInCircle,
};

function Notification({ message, type }: NotificationProps) {
  const combinedClasses = `${styles.notification} ${styles[type]}`;
  const Icon = Icons[type];

  return (
    <div className={combinedClasses} role="alert">
      <Icon />
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default Notification;
