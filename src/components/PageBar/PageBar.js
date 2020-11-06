import React from "react";
import uniqid from "uniqid";
import styles from "./PageBar.module.scss";

const PageBar = (props) => {
  const { maxPage, req, updateReq } = props;
  const currPage = req.page;

  // array represents 10 pages, similar to the way Google pages through results
  const getPages = () => {
    if (currPage <= 6) {
      return Array(Math.min(maxPage, 10))
        .fill()
        .map((_, i) => i + 1);
    } else {
      const arr = [];
      for (let i = currPage - 5; i <= Math.min(maxPage, currPage + 4); i++) {
        arr.push(i);
      }
      return arr;
    }
  };

  // update request state upon user selection of new page
  const select = (page) => {
    updateReq({ ...req, page: page });
    // send user to top of the page after selection
    document.getElementById("articles").scrollTop = 0;
  };

  // pages the user can select from
  const buttons = () => {
    return getPages().map((page) => (
      <button
        key={uniqid()}
        onClick={() => select(page)}
        className={`${styles.pageBtn} ${req.page === page ? styles.selected : styles.unselected}`}
      >
        <span>{page}</span>
      </button>
    ));
  };

  return <div className={styles.container}>{buttons()}</div>;
};

export default PageBar;
