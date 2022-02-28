import type { ChangeEvent } from "react";
import styles from "./input.module.css";

type InputProps = {
  className?: string;
  name: string;
  label: string;
  id: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  /**
   * @default text
   */
  type?: string;
  required?: boolean;
};

function Input({
  className = "",
  value,
  name,
  label,
  id,
  type = "text",
  required,
  onChange,
}: InputProps) {
  const combinedClassName = `${styles.wrapper} ${className}`;

  return (
    <div className={combinedClassName}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        autoComplete="off"
        id={id}
        name={name}
        className={styles.input}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

export default Input;
