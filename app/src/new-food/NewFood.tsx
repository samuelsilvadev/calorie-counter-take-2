import { useFormik } from "formik";
import Input from "./components/Input/Input";
import type { CreateFood } from "./types";
import styles from "./newFood.module.css";
import { useNewFood } from "./useNewFood";
import { useEffect, useRef } from "react";

function buildFormInitialValues(): CreateFood {
  return {
    name: "",
    portion: 0,
    portionAmount: 0,
    portionDisplayName: "",
    calories: 0,
    saturatedFats: 1,
    alcohol: 0,
    addedSugars: 0,
    solidFats: 0,
    oils: 0,
    dryBeansPeas: 0,
    soy: 0,
    meats: 0,
    milk: 0,
    fruits: 0,
    otherVegetables: 0,
    starchyVegetables: 0,
    darkGreenVegetables: 0,
    orangeVegetables: 0,
    vegetables: 0,
    wholeGrains: 0,
    grains: 0,
    multiplier: 0,
    increment: 0,
    factor: 0,
  };
}

function NewFood() {
  const hasSubmitted = useRef(false);
  const {
    loading,
    error,
    actions: { saveFood },
  } = useNewFood();
  const { handleSubmit, handleChange, resetForm, values } =
    useFormik<CreateFood>({
      initialValues: buildFormInitialValues(),
      onSubmit: (values) => {
        saveFood(values);
        hasSubmitted.current = true;
      },
    });

  useEffect(() => {
    if (!loading && !error && hasSubmitted.current) {
      console.log("reset");
      resetForm();
      hasSubmitted.current = false;
    }
  }, [loading, error, resetForm]);

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
      <Input
        id="name-id"
        name="name"
        label="Food name"
        onChange={handleChange}
        value={values.name}
        required
      />
      <Input
        id="portion-amount-id"
        name="portionAmount"
        label="Portion Amount"
        onChange={handleChange}
        value={values.portionAmount}
        type="number"
        required
      />
      <Input
        id="portion-id"
        name="portion"
        label="Food portion"
        onChange={handleChange}
        value={values.portion}
        type="number"
        required
      />
      <Input
        id="portion-display-name-id"
        name="portionDisplayName"
        label="Portion display name"
        onChange={handleChange}
        value={values.portionDisplayName}
        required
      />
      <Input
        id="calories-id"
        name="calories"
        label="Calories"
        onChange={handleChange}
        value={values.calories}
        type="number"
        required
      />
      <button className={styles.button} type="submit">
        Save
      </button>
    </form>
  );
}

export default NewFood;
