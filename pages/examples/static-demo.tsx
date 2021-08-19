import React from 'react';
import ArticleList from '../../builtin/components/ArticleList';

type StaitcProps = { articles: { title: string }[] };

const StaticDemo = ({ articles }: StaitcProps) => {
  return (
    <div>
      <ArticleList articles={articles} />
    </div>
  );
};

// build 时运行
export function getStaticProps() {
  return {
    props: {
      articles: [
        { title: '预渲染列表数据' },
        { title: 'test 22222222222' },
        { title: 'test 333' },
      ],
    },
  };
}

export default StaticDemo;
