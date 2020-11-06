import React, { useState, useEffect } from "react";
import Menu from "../components/Menu/Menu.js";
import Articles from "../components/Articles/Articles.js";
import Settings from "../components/Settings/Settings.js";
import SearchBar from "../components/SearchBar/SearchBar.js";
import styles from "./News.module.scss";

const News = (props) => {
  const { category, changeCategory, endpoint, changeEndpoint } = props;

  // (in case user refreshes page, state will be lost, so set default endpoint to top)
  useEffect(() => {
    if (endpoint === "") {
      changeEndpoint("top");
    }
  }, [endpoint, changeEndpoint]);

  // country's default value is "us," language's default value is "en" default page number is 1
  const [req, updateReq] = useState({
    country: "us",
    // language: "en",
    category: category,
    q: "",
    page: 1,
    categories: [],
  });

  // type of news, search bar
  const title = () => {
    if (category === "search") {
      return <SearchBar req={req} updateReq={updateReq} />;
    } else if (category.length === 0) {
      return "(select a category)";
    } else {
      return `${endpoint} ${category} news`;
    }
  };

  return (
    <div className={styles.container}>
      <Menu
        category={category}
        changeCategory={changeCategory}
        req={req}
        updateReq={updateReq}
        endpoint={endpoint}
        changeEndpoint={changeEndpoint}
      />
      <div className={styles.subContainer}>
        <div className={styles.newsContainer}>
          <div className={styles.title}>{title()}</div>
          <Articles req={req} updateReq={updateReq} endpoint={endpoint} />
        </div>
        <Settings req={req} updateReq={updateReq} />
      </div>
    </div>
  );
};

export default News;
