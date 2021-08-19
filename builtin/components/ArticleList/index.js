import React from "react";
import styles from "./index.module.css";

const ArticleList = ({ articles }) => {
  return (
    <div className={styles.grid}>
      {articles.map((article) => (
        <h3 key={article.title}>{article.title}</h3>
      ))}
    </div>
  );
};

export default ArticleList;
