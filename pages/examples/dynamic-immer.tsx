import produce from 'immer';
import React, { useEffect, useState } from 'react';
import ArticleList from '../../buildin-components/ArticleList';

type ArticleType = { title: string };
const DynamicDemo = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  useEffect(() => {
    const timer = setInterval(() => {
      // Immer 用法
      // setArticles((articles) => {
      //   return produce(articles, (draft) => {
      //     draft.push({ title: `随机Title ${new Date().toISOString()}` });
      //   });
      // });

      // immer 简写
      setArticles(
        produce((draft) => {
          draft.push({ title: `随机Title ${new Date().toISOString()}` });
        })
      );

      // 一次性设置重置
      //   setArticles([
      //     { title: "动态加载数据" },
      //     { title: "test 22222222222" },
      //     { title: "test 333" },
      //   ]);

      return () => {
        clearInterval(timer);
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
