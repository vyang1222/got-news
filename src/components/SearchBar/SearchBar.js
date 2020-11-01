import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSortDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./SearchBar.module.scss";

const allCategories = ["entertainment", "sports", "technology"];

const SearchBar = (props) => {
  const { req, updateReq } = props;
  const [searchTerm, updateSearch] = useState("");
  const [choices, updateChoices] = useState([]); // is different from the one in index.js; these categories are specific to the search

  // initially hide category dropdown
  useEffect(() => {
    document.getElementById("dropdown").style.display = "none";
  }, []);

  // reveal/hide categories dropdown
  const show = () => {
    document.getElementById("dropdown").style.display =
      document.getElementById("dropdown").style.display === "none" ? "flex" : "none";
  };

  // update category state upon user selection of new category (select/unselect)
  const select = (newChoice) => {
    if (choices.indexOf(newChoice) === -1) {
      updateChoices([...choices, newChoice]);
    } else {
      updateChoices(choices.filter((category) => category !== newChoice));
    }
  };

  // update request state upon search
  const search = () => {
    // reset page to first page in the case of coming from a page !== 1
    // reset category, set categories because user may select > 1 category
    updateReq({ ...req, category: "", q: searchTerm, page: 1, categories: choices });
    // send user to top of the page after search
    document.getElementById("articles").scrollTop = 0;
  };

  // categories user can select from
  const categories = () => {
    return allCategories.map((category) => (
      <button
        key={uniqid()}
        onClick={() => select(category)}
        className={`${styles.choiceBtn} ${choices.indexOf(category) !== -1 ? styles.selectedChoice : ""}`}
      >
        {category}
      </button>
    ));
  };

  return (
    <div className={styles.container}>
      search:
      <input
        id="searchTerm"
        type="text"
        spellCheck="false"
        autoComplete="off"
        onChange={(e) => updateSearch(e.target.value)}
        className={styles.inputField}
      />
      <button
        onClick={() => search()}
        className={styles.searchBtn}
        disabled={choices.length === 0 || searchTerm.length === 0}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
      in
      <div className={styles.dropdownContainer}>
        <button onClick={() => show()} className={`${styles.categoryBtn} ${choices.length > 0 ? styles.selected : ""}`}>
          {choices.length > 0 ? "selected" : "select"} <FontAwesomeIcon icon={faSortDown} />
        </button>
        <div id="dropdown" className={styles.dropdown}>
          {categories()}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
