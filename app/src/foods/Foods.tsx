import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import classnames from "classnames";
import { useFormik } from "formik";
import ContentManager from "shared/components/content-manager/ContentManager";
import FoodItem from "./components/FoodItem/FoodItem";
import SearchInput from "./components/SearchInput/SearchInput";
import { useFoods } from "./useFoods";
import { useFavoriteFoods } from "favorite-foods/useFavoriteFoods";
import styles from "./foods.module.css";

function Foods() {
  const location = useLocation();
  const {
    loading,
    foods,
    error,
    actions: { getAllFoods },
  } = useFoods();
  const {
    favorites,
    actions: { saveFavoriteFood, removeFavoriteFood },
  } = useFavoriteFoods();

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    getAllFoods();
  }, [getAllFoods]);

  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>List of foods</h1>
      <form onSubmit={formik.handleSubmit} className={styles.searchForm}>
        <SearchInput
          name="search"
          className={styles.input}
          value={formik.values.search}
          onChange={formik.handleChange}
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <ContentManager
        className={styles.loadingAndError}
        loading={loading}
        error={error}
      >
        <ul className={styles.listOfFoods}>
          {foods.map((food) => {
            const isFavorite = !!favorites[food.id];

            return (
              <li className={styles.foodListItem} key={food.id}>
                <FoodItem food={food} />
                <button
                  className={classnames(styles.button, {
                    [styles.favorite]: isFavorite,
                  })}
                  aria-label={
                    isFavorite
                      ? `Uncheck ${food.name} from favorites list`
                      : `Mark ${food.name} as favorite`
                  }
                  onClick={() => {
                    isFavorite
                      ? removeFavoriteFood(food.id)
                      : saveFavoriteFood(food.id);
                  }}
                >
                  {isFavorite ? "✭" : "☆"}
                </button>
                <Link
                  to={{
                    pathname: `/details/${food.id}`,
                    state: { previousLocation: location },
                  }}
                  className={styles.button}
                >
                  Select
                </Link>
              </li>
            );
          })}
        </ul>
      </ContentManager>
    </section>
  );
}

export default Foods;
