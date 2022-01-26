import type { Food } from "./types";
import FoodItem from "./components/FoodItem/FoodItem";
import SearchInput from "./components/SearchInput/SearchInput";
import styles from "./foods.module.css";

const FOODS_MOCK: Food[] = [
  {
    id: "61ec0456ff55bc414019c123",
    saturatedFats: 2,
    calories: 1,
    alcohol: 0,
    addedSugars: 1,
    solidFats: 1,
    oils: 1,
    dryBeansPeas: 1,
    soy: 1,
    meats: 1,
    milk: 1,
    fruits: 1,
    otherVegetables: 1,
    starchyVegetables: 1,
    darkGreenVegetables: 1,
    orangeVegetables: 1,
    vegetables: 1,
    wholeGrains: 1,
    grains: 1,
    multiplier: 1,
    increment: 1,
    factor: 1,
    portionDisplayName: "1",
    portionAmount: 1,
    portion: 1,
    name: "Test",
  },
  {
    id: "61ec03b1d55b123f43e68f21",
    saturatedFats: 1,
    calories: 1,
    alcohol: 0,
    addedSugars: 1,
    solidFats: 1,
    oils: 1,
    dryBeansPeas: 1,
    soy: 1,
    meats: 1,
    milk: 1,
    fruits: 1,
    otherVegetables: 1,
    starchyVegetables: 1,
    darkGreenVegetables: 1,
    orangeVegetables: 1,
    vegetables: 1,
    wholeGrains: 1,
    grains: 1,
    multiplier: 1,
    increment: 1,
    factor: 1,
    portionDisplayName: "1",
    portionAmount: 1,
    portion: 1,
    name: "Test",
  },
  {
    id: "61ec03b0d55b123f43e68f1d",
    saturatedFats: 1,
    calories: 1,
    alcohol: 0,
    addedSugars: 1,
    solidFats: 1,
    oils: 1,
    dryBeansPeas: 1,
    soy: 1,
    meats: 1,
    milk: 1,
    fruits: 1,
    otherVegetables: 1,
    starchyVegetables: 1,
    darkGreenVegetables: 1,
    orangeVegetables: 1,
    vegetables: 1,
    wholeGrains: 1,
    grains: 1,
    multiplier: 1,
    increment: 1,
    factor: 1,
    portionDisplayName: "1",
    portionAmount: 1,
    portion: 1,
    name: "Test",
  },
  {
    id: "61ec02d449077e3e22f3ba97",
    saturatedFats: 1,
    calories: 1,
    alcohol: 0,
    addedSugars: 1,
    solidFats: 1,
    oils: 1,
    dryBeansPeas: 1,
    soy: 1,
    meats: 1,
    milk: 1,
    fruits: 1,
    otherVegetables: 1,
    starchyVegetables: 1,
    darkGreenVegetables: 1,
    orangeVegetables: 1,
    vegetables: 1,
    wholeGrains: 1,
    grains: 1,
    multiplier: 1,
    increment: 1,
    factor: 1,
    portionDisplayName: "1",
    portionAmount: 1,
    portion: 1,
    name: "Test",
  },
] as Food[];

function Foods() {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>List of foods</h1>
      <form className={styles.searchForm}>
        <SearchInput className={styles.input} />
        <button className={styles.button}>Search</button>
      </form>
      <ul className={styles.listOfFoods}>
        {FOODS_MOCK.map((food) => (
          <li className={styles.foodListItem} key={food.id}>
            <FoodItem food={food} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Foods;
