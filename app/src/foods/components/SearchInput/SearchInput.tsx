import type { ChangeEvent } from "react";
import Search from "shared/components/icons/Search";
import styles from "./searchInput.module.css";

type SearchInputProps = {
  className?: string;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
};

function SearchInput({
  className = "",
  value,
  name,
  onChange,
}: SearchInputProps) {
  const combinedClassName = `${styles.wrapper} ${className}`;

  return (
    <label className={combinedClassName}>
      <Search className={styles.icon} width={16} height={16} />
      <input
        name={name}
        className={styles.input}
        type="search"
        placeholder="Search"
        value={value}
        onChange={onChange}
      />
    </label>
  );
}

export default SearchInput;
