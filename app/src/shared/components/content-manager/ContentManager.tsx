import classnames from "classnames";
import type { GetAllError } from "shared/types/api";
import styles from "./contentManager.module.css";

type ContentManagerProps = {
  loading: boolean;
  error: GetAllError | null;
  children: React.ReactElement;
  className?: string;
};

function ContentManager({
  loading,
  error,
  children,
  className,
}: ContentManagerProps): JSX.Element {
  if (loading) {
    return <p className={classnames(styles.loading, className)}>Loading...</p>;
  }

  if (error) {
    return (
      <p className={classnames(styles.error, className)}>{error.message}</p>
    );
  }

  return children;
}

export default ContentManager;
