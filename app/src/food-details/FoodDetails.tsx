import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import ContentManager from "shared/components/content-manager/ContentManager";
import { useFoodDetails } from "./useFoodDetails";
import styles from "./foodDetails.module.css";

function FoodDetails() {
  const { id } = useParams<{ id?: string }>();
  const { handleSubmit, register } = useForm<{ amount: number }>();
  const {
    // TODO: handle error
    loading,
    food,
    actions: { getFood },
  } = useFoodDetails(id);

  useEffect(() => {
    if (id) {
      getFood(id);
    }
  }, [id, getFood]);

  const [calculatedCalories, setCalculatedCalories] = useState(0);

  return (
    <div className={styles.background}>
      <article className={styles.content}>
        <header className={styles.header}>
          <h2>Details</h2>
          <Link className={styles.back} to="/">
            Back
          </Link>
        </header>
        <ContentManager loading={loading} error={null}>
          <>
            <div className={styles.foodDetails}>
              <h3>{food?.name}</h3>
              <h4>
                {food?.calories} calories | Serving size:
                {food?.portionAmount} {food?.portionDisplayName}
              </h4>
            </div>
            <form
              onSubmit={handleSubmit(({ amount }) => {
                setCalculatedCalories(amount * (food?.calories ?? 1));
              })}
              className={styles.form}
            >
              <label htmlFor="amount">Amount</label>
              <input
                className={styles.input}
                id="amount"
                type="number"
                {...register("amount", { required: true })}
              />
              <button className={styles.button}>Calculate</button>
            </form>
            {calculatedCalories ? (
              <p className={styles.calculatedCalories}>
                You've consumed: {calculatedCalories} calories
              </p>
            ) : null}
          </>
        </ContentManager>
      </article>
    </div>
  );
}

export default FoodDetails;
