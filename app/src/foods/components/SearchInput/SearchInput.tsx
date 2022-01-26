import Search from "shared/components/icons/Search";
import styles from "./searchInput.module.css";

type SearchInputProps = {
  className?: string;
};

function SearchInput({ className = "" }: SearchInputProps) {
  const combinedClassName = `${styles.wrapper} ${className}`;

  return (
    <label className={combinedClassName}>
      <Search className={styles.icon} width={16} height={16} />
      <input className={styles.input} type="search" placeholder="Search" />
    </label>
  );
}

export default SearchInput;
