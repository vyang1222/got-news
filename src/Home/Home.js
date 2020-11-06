import React from "react";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./Home.module.scss";

const Home = (props) => {
  const { category, changeCategory, endpoint, changeEndpoint } = props;
  // upon entering, send user to news page
  const enter = () => {
    props.history.push("/news/");
  };

  const selectEndpoint = (newEndpoint) => {
    changeEndpoint(endpoint === newEndpoint ? "" : newEndpoint);
  };

  // update category state upon user selection of category
  const selectCategory = (newCategory) => {
    changeCategory(category === newCategory ? "" : newCategory);
  };

  // endpoints user can select from
  const endpoints = () =>
    ["top", "all"].map((choice) => (
      <button
        key={uniqid()}
        onClick={() => selectEndpoint(choice)}
        className={choice === endpoint ? `${styles.selected}` : `${styles.unselected}`}
      >
        {choice}
      </button>
    ));

  // categories user can select from
  const categories = () =>
    ["entertainment", "sports", "technology"].map((choice) => (
      <button
        key={uniqid()}
        onClick={() => selectCategory(choice)}
        className={choice === category ? `${styles.selected}` : `${styles.unselected}`}
      >
        {choice}
      </button>
    ));

  // title
  const title = () => (endpoint === "" ? "got news?" : `${endpoint} news`);

  return (
    <div>
      <div className={styles.title}>{title()}</div>
      <div className={styles.desc}>choose {endpoint === "" ? "an endpoint" : "a category"}</div>
      <div className={styles.choicesContainer}>{endpoint === "" ? endpoints() : categories()}</div>
      <div className={styles.bottom}>
        <button onClick={enter} className={styles.enterBtn} disabled={category.length === 0}>
          <FontAwesomeIcon icon={faSignInAlt} />
        </button>
        <div className={styles.misc}>
          {"developed by vyang1222 - "}
          <a href="https://github.com/vyang1222/got-news" rel="noopener noreferrer" target="_blank">
            about this project
          </a>
          {"\nicons made by "}
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
      </div>
    </div>
  );
};

export default Home;
