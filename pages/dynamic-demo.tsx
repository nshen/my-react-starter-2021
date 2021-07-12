import React, { useEffect, useState } from "react";
import useAxios from "axios-hooks";
import ArticleList from "../components/ArticleList";
import { Button, Flex } from "@chakra-ui/react";

type ArticleType = { title: string };
const DynamicDemo = () => {
  const [{ data, loading, error }, refetch] = useAxios(
    "https://jsonplaceholder.typicode.com/posts"
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  if (data) {
    return (
      <Flex direction="column" justify="flex-start" my="3">
        <ArticleList
          articles={data.map((article: any) => ({
            title: article.title,
          }))}
        />
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
