import { useInterval } from '@chakra-ui/hooks';
import React from 'react';
import { atom } from 'recoil';
import ArticleList from '../../builtin/components/ArticleList';
import { useRecoilStateImmer } from '../../builtin/hooks/useRecoilStateImmer';

type ArticleType = { title: string };

const articlesAtom = atom<ArticleType[]>({
  key: 'articlesAtom',
  default: [],
});

const Demo = () => {
  // useRecoilStateImmer 可以直接修改 atom， 确保 atom 修改后，会触发重新渲染
  const [articles, updateArticles] =
    useRecoilStateImmer<ArticleType[]>(articlesAtom);

  useInterval(() => {
    updateArticles((draft) => {
      draft.push({ title: `随机Title ${new Date().toISOString()}` });
      return draft;
    });
  }, 1000);

  useInterval(() => {
    updateArticles((draft) => {
      draft.push({ title: `aaa ${new Date().toISOString()}` });
      return draft;
    });
  }, 3000);

  return articles.length > 0 ? (
    <div>
      <ArticleList articles={articles} />
    </div>
  ) : (
    <div>loading</div>
  );
};

export default Demo;
