import { Button, Flex } from '@chakra-ui/react';
import useAxios from 'axios-hooks';
import React from 'react';
import ArticleList from '../../builtin/components/ArticleList';
type ArticleType = { title: string };
const DynamicDemo = () => {
  const [{ data, loading, error }, refetch] = useAxios(
    'https://jsonplaceholder.typicode.com/posts'
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (data) {
    const articles = data.map((article: any) => {
      return {
        title: article.title,
      };
    });
    return (
      <Flex direction="column" justify="flex-start" my="3">
        <ArticleList articles={articles} />
        <Button
          onClick={() => {
            refetch();
          }}
        >
          refetch
        </Button>
      </Flex>
    );
  }
};

export default DynamicDemo;
