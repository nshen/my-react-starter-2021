import React, { useEffect, useState } from "react";
import ArticleList from "../../components/ArticleList";

type ArticleType = { title: string };
const DynamicDemo = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setArticles([
        { title: "动态加载数据" },
        { title: "test 22222222222" },
        { title: "test 333" },
      ]);
      return () => {
        clearTimeout(timer);
      };
    }, 1000);
  }, []);
  return articles.length > 0 ? (
    <div>
      <ArticleList articles={articles} />
    </div>
  ) : (
    <div>loading</div>
  );
};

export default DynamicDemo;
