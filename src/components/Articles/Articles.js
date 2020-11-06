import React, { useState, useEffect } from "react";
import uniqid from "uniqid";
import Article from "../Article/Article.js";
import PageBar from "../PageBar/PageBar.js";
import styles from "./Articles.module.scss";
import * as api from "../../api.js";

const Articles = (props) => {
  const { req, updateReq, endpoint } = props;
  const [data, updateData] = useState({
    articles: [],
  });
  const [time, updateTime] = useState(0); // measure performance of requests in milliseconds
  const [errMsg, setErrMsg] = useState(""); // error meaning when getting news article

  // reduce the number of unnecessary requests
  useEffect(() => {
    let start = performance.now();
    // prevent rerequests in case of user changing country in the middle of a search
    if ((req.categories.length !== 0 || req.category !== "") && (req.category !== "search" || req.q !== "")) {
      api.getNews(req, endpoint).then(
        (data) => {
          updateData(data);
          // measure performance for getting results in seconds
          updateTime((performance.now() - start) / 1000);
        },
        // handle error
        (error) => {
          const { status } = error.response;
          const { code } = error.response.data;
          let msg = "";
          if (status === 429) {
            msg = "Too many requests have been made recently. Try again later.";
          } else if (status === 500) {
            msg = "Something went wrong with NewsAPI. Try again later.";
          } else if (status === 401) {
            msg = "Something went wrong on our side. Try again later.";
          } else {
            // status === 400
            msg = "Please try a valid request.";
          }
          setErrMsg(code + " error: " + msg);
        }
      );
    }
  }, [req, endpoint]);

  // returns time in milliseconds, rounded to 2 decimal places
  const getTime = () => {
    return time.toFixed(2);
  };

  // pageSize is always 20 in this application. # pages = # articles / pages per article, rounded up.
  const getMaxPage = () => Math.ceil(data.totalResults / 20);

  // display categories that user selected if coming from a search
  const getCategories = () => {
    const { categories } = req;
    // check if coming from a search
    if (categories.length === 0) {
      return "";
    }

    let categoryString = "found in ";

    if (categories.length > 1) {
      categoryString += categories[0];
      if (categories.length === 3) {
        categoryString += ", " + categories[1] + ",";
      }
      categoryString += " and ";
    }

    categoryString += categories[categories.length - 1] + " ";

    return categoryString;
  };

  // returns the result of the filter/search
  const getResults = () => {
    if (data.totalResults === 0 || data.articles.length === 0) {
      return "found no results.";
    }
    return `found ${data.totalResults} results ${getCategories()} (${getTime()} seconds)`;
  };

  return (
    <div id="articles" className={styles.container}>
      {errMsg.length > 0 ? (
        <div className={styles.errMsg}>{errMsg}</div>
      ) : (
        <>
          <div className={styles.results}>{getResults()}</div>
          {data.articles.map((article) => (
            <React.Fragment key={uniqid()}>
              <Article article={article} />
              <div className={styles.divider}></div>
            </React.Fragment>
          ))}
          {/* only load PageBar if there is more than 1 page to display */}
          {getMaxPage() > 1 ? <PageBar maxPage={getMaxPage()} req={req} updateReq={updateReq} /> : ""}
        </>
      )}
    </div>
  );
};

export default Articles;
