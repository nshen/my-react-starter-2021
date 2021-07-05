import { Button, Text, Stack, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue } from "recoil";
import { countSelector } from "../states";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const countValue = useRecoilValue(countSelector);
  return (
    <div>
      <Text>{countValue}</Text>
    </div>
  );
}

// export const getStaticProps = async () => {
//   const res = await fetch(`${server}/api/articles`);
//   const articles = await res.json();

//   return {
//     props: {
//       articles,
//     },
//   };
// };

// export const getStaticProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
//   const articles = await res.json()

//   return {
//     props: {
//       articles,
//     },
//   }
// }
