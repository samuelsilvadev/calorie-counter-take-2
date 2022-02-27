import { useFormik } from "formik";
import Input from "./components/Input/Input";
import styles from "./newFood.module.css";

function NewFood() {
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      name: "",
      portion: "",
      portionAmount: "",
    },
    onSubmit: () => {},
  });

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
        required
      />
      <Input
        id="portion-id"
        name="portion"
        label="Food portion (description)"
        onChange={handleChange}
        value={values.portion}
        required
      />
      <button className={styles.button} type="submit">
        Save
      </button>
    </form>
  );
}

export default NewFood;
