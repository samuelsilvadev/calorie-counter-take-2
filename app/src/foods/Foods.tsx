import { useEffect } from "react";
import FoodItem from "./components/FoodItem/FoodItem";
import SearchInput from "./components/SearchInput/SearchInput";
import { useFoods } from "./useFoods";
import styles from "./foods.module.css";

function Foods() {
  const {
    loading,
    foods,
    actions: { getAllFoods },
  } = useFoods();

  useEffect(() => {
    getAllFoods();
  }, [getAllFoods]);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>List of foods</h1>
      <form className={styles.searchForm}>
        <SearchInput className={styles.input} />
        <button className={styles.button}>Search</button>
      </form>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : (
        <ul className={styles.listOfFoods}>
          {foods.map((food) => (
            <li className={styles.foodListItem} key={food.id}>
              <FoodItem food={food} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Foods;
