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
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Menu.module.scss";

const Menu = (props) => {
  const { category, changeCategory, req, updateReq } = props;

  // update both category and request states upon user selection of category
  const select = (newChoice) => {
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

  // categories user can select from
  const categories = () => {
    return [
      ["entertainment", <FontAwesomeIcon icon={faHeadphones} />],
      ["sports", <FontAwesomeIcon icon={faFootballBall} />],
      ["technology", <FontAwesomeIcon icon={faNetworkWired} />],
      ["search", <FontAwesomeIcon icon={faSearch} />],
    ].map((categoryArr) => (
      <div
        key={uniqid()}
        onClick={() => select(categoryArr[0])}
        className={`${styles.category} ${category === categoryArr[0] ? `${styles.selected}` : `${styles.unselected}`}`}
      >
        {categoryArr[1]}
        {categoryArr[0]}
      </div>
    ));
  };

  return (
    <nav className={styles.navbar}>
      <span className={styles.title}>
        <FontAwesomeIcon icon={faNewspaper} /> got news?
      </span>
      <div className={styles.container}>{categories()}</div>
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
