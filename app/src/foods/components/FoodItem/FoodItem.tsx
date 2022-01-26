import type { Food } from "foods/types";
import styles from "./foodItem.module.css";

type FoodItemProps = {
  food: Food;
};

function FoodItem({ food }: FoodItemProps) {
  return (
    <article className={styles.wrapper}>
      <h2 className={styles.title}>{food.name}</h2>
      <h3 className={styles.subtitle}>
        {food.calories} calories | Serving size: {food.portionAmount}{" "}
        {food.portionDisplayName}
      </h3>
    </article>
  );
}

export default FoodItem;
