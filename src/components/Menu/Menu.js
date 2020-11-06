import React, { useState } from "react";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faHeadphones,
  faFootballBall,
  faNetworkWired,
  faSearch,
  faCog,
  faAward,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Menu.module.scss";

const Menu = (props) => {
  const { category, changeCategory, req, updateReq, endpoint, changeEndpoint } = props;

  // update endpoint state upon user selection of endpoint
  const selectEndpoint = (newChoice) => {
    // reset searchTerm in the case of coming from a search, and page to first page in the case of coming from a page !== 1
    updateReq({ ...req, q: "", page: 1 });
    changeEndpoint(newChoice);
    // excluding search from this animation, a personal design choice
    if (req.category !== "search") {
      // send user to top of the page after selection
      document.getElementById("articles").scrollTop = 0;
    }
  };

  // update both category and request states upon user selection of category
  const selectCategory = (newChoice) => {
    changeCategory(newChoice);
    // reset searchTerm and categories in the case of coming from a search, and page to first page in the case of coming from a page !== 1
    updateReq({ ...req, category: newChoice, q: "", page: 1, categories: [] });
    // excluding search from this animation, a personal design choice
    if (newChoice !== "search") {
      // send user to top of the page after selection
      document.getElementById("articles").scrollTop = 0;
    }
  };

  const [revealed, updateRevealed] = useState(false);

  // reveal settings sidebar
  const showSettings = () => {
    if (!revealed) {
      document.getElementById("settings-container").style.display = "flex";
    } else {
      document.getElementById("settings-container").style.display = "none";
    }
    updateRevealed(!revealed);
  };

  // endpoints user can select from
  const endpoints = () =>
    [
      ["top", <FontAwesomeIcon icon={faAward} />],
      ["all", <FontAwesomeIcon icon={faGlobe} />],
    ].map((arr) => (
      <div
        key={uniqid()}
        onClick={() => selectEndpoint(arr[0])}
        className={`${styles.endpoint} ${endpoint === arr[0] ? `${styles.selected2}` : `${styles.unselected2}`}`}
      >
        {arr[1]}
        {arr[0]}
      </div>
    ));

  // categories user can select from
  const categories = () =>
    [
      ["entertainment", <FontAwesomeIcon icon={faHeadphones} />],
      ["sports", <FontAwesomeIcon icon={faFootballBall} />],
      ["technology", <FontAwesomeIcon icon={faNetworkWired} />],
      ["search", <FontAwesomeIcon icon={faSearch} />],
    ].map((arr) => (
      <div
        key={uniqid()}
        onClick={() => selectCategory(arr[0])}
        className={`${styles.category} ${category === arr[0] ? `${styles.selected}` : `${styles.unselected}`}`}
      >
        {arr[1]}
        {arr[0]}
      </div>
    ));

  return (
    <nav className={styles.navbar}>
      <span className={styles.title}>
        <FontAwesomeIcon icon={faNewspaper} /> got news?
      </span>
      <div className={styles.container}>{categories()}</div>
      {endpoints()}
      <div className={styles.divider}></div>
      <div
        onClick={showSettings}
        className={`${styles.settingsCategory} ${revealed ? `${styles.selected}` : `${styles.settingsUnselected}`}`}
      >
        <FontAwesomeIcon icon={faCog} />
        settings
      </div>
    </nav>
  );
};

export default Menu;
