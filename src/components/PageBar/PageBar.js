import React from "react";
import uniqid from "uniqid";
import styles from "./PageBar.module.scss";

const PageBar = (props) => {
  const { maxPage, req, updateReq } = props;

  // array represents page numbers from 1 to maxPage
  const pages = Array(maxPage)
    .fill()
    .map((_, i) => i + 1);

  // update request state upon user selection of new page
  const select = (page) => {
    updateReq({ ...req, page: page });
    // send user to top of the page after selection
    document.getElementById("articles").scrollTop = 0;
  };

  // pages the user can select from
  const buttons = () => {
    return pages.map((page) => (
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
