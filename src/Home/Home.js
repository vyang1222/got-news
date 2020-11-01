import React from "react";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./Home.module.scss";

const Home = (props) => {
  const { category, changeCategory } = props;

  // upon entering, send user to news page
  const enter = () => {
    props.history.push("/news/");
  };

  // update both category state upon user selection of category
  const select = (newCategory) => {
    changeCategory(category === newCategory ? "" : newCategory);
  };

  // categories user can select from
  const categories = () => {
    return ["entertainment", "sports", "technology"].map((choice) => (
      <button
        key={uniqid()}
        onClick={() => select(choice)}
        className={choice === category ? `${styles.selected}` : `${styles.unselected}`}
      >
        {choice}
      </button>
    ));
  };

  return (
    <>
      <div className={styles.title}>got news?</div>
      <div className={styles.desc}>choose a category.</div>
      <div className={styles.choicesContainer}>{categories()}</div>
      <button onClick={enter} className={styles.enterBtn} disabled={category.length === 0}>
        <FontAwesomeIcon icon={faSignInAlt} />
      </button>
      <div className={styles.misc}>
        developed by vyang1222 -{" "}
        <a href="https://github.com/vyang1222/got-news" rel="noopener noreferrer" target="_blank">
          about this project
        </a>
        {"\n"}
        icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" rel="noopener noreferrer" target="_blank">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" rel="noopener noreferrer" target="_blank">
          Flaticon
        </a>{" "}
        and{" "}
        <a href="http://fontawesome.io" rel="noopener noreferrer" target="_blank">
          Font Awesome
        </a>{" "}
        by Dave Gandy
      </div>
    </>
  );
};

export default Home;
