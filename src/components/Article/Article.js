import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";
import styles from "./Article.module.scss";

// abbreviations for months, where nth month is months[n - 1]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

// constants to use when comparing difference in time. ms = milliseconds
const msInDay = 86400000;
const msInHour = 3600000;
const msInMinute = 60000;
const msInSecond = 1000;

const Article = (props) => {
  const { article } = props;
  const { source, author, title, url, urlToImage, publishedAt } = article;
  let { description } = article;
  description = description !== null && description.includes("�") ? "" : description;
  const [error, setError] = useState(false); // error meaning when loading image

  // possible formats: X seconds/minutes/hours ago if published today, else yyyy-MM-dd
  const formatDate = () => {
    const diff = Date.now() - new Date(publishedAt); // in ms
    // choose which format to display
    if (diff > msInDay) {
      return (
        months[parseInt(publishedAt.substring(5, 7), 10) - 1] +
        " " +
        parseInt(publishedAt.substring(8, 10), 10) +
        ", " +
        publishedAt.substring(0, 4)
      );
    }

    // choose whether to display seconds, minutes, or hours
    let time = 0;
    let measurement = " ";
    if (diff < msInMinute) {
      time = Math.floor(diff / msInSecond); // in seconds
      measurement = " seconds";
      // if published 0 seconds ago, it was published just now
      if (time === 0) {
        return "just now";
      }
    } else if (diff < msInHour) {
      time = Math.floor(diff / msInMinute); // in minutes
      measurement = " minutes";
    } else {
      time = Math.floor(diff / msInHour); // in hours
      measurement = " hours";
    }
    // decide whether measurement is singular or plural
    return time + (time === 1 ? measurement.slice(0, -1) : measurement) + " ago";
  };

  const getAuthor = () => {
    // handle special case (Buzzfeed) to parse the author correctly
    if (source.id === "buzzfeed") {
      return JSON.parse(author)[0].name;
    }
    return author;
  };

  // handle null urlToImage or error when loading image - return a newspaper icon to fill in the blank area.
  const image = () => {
    if (urlToImage === null) {
      return <FontAwesomeIcon icon={faNewspaper} />;
    }
    return (
      <img
        src={urlToImage}
        className={styles.image}
        alt=""
        onError={(e) => {
          setError(true);
        }}
      />
    );
  };

  return (
    <article className={styles.container}>
      <div className={styles.imgWrapper}>
        <a href={url} rel="noopener noreferrer" target="_blank" className={styles.imgWrapper}>
          {error ? <FontAwesomeIcon icon={faNewspaper} /> : image()}
        </a>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <a href={url} rel="noopener noreferrer" target="_blank">
            {title}
          </a>
        </div>
        <div className={styles.metaInfo}>
          <div className={styles.authorDate}>
            <span>{getAuthor()}</span>
            <span>Published {formatDate()}</span>
          </div>
          <div className={styles.source}>{source.name}</div>
        </div>
        <p className={styles.desc}>{description}</p>
      </div>
    </article>
  );
};

export default Article;
