import React, { useState } from "react";
import Menu from "../components/Menu/Menu.js";
import Articles from "../components/Articles/Articles.js";
import Settings from "../components/Settings/Settings.js";
import SearchBar from "../components/SearchBar/SearchBar.js";
import styles from "./News.module.scss";

const News = (props) => {
  const { category, changeCategory } = props;

  // country's default value is "us," default page number is 1
  const [req, updateReq] = useState({ country: "us", category: category, q: "", page: 1, categories: [] });

  // category of news or search bar
  const title = () => {
    if (category === "search") {
      return <SearchBar req={req} updateReq={updateReq} />;
    } else if (category.length === 0) {
      return "(select a category)";
    } else {
      return `${category} news`;
    }
  };

  return (
    <div className={styles.container}>
      <Menu category={category} changeCategory={changeCategory} req={req} updateReq={updateReq} />
      <div className={styles.subContainer}>
        <div className={styles.newsContainer}>
          <div className={styles.title}>{title()}</div>
          <Articles req={req} updateReq={updateReq} />
        </div>
        <Settings req={req} updateReq={updateReq} />
      </div>
    </div>
  );
};

export default News;
