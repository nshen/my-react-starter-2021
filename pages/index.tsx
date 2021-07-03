import { Button, Stack, useColorMode } from "@chakra-ui/react";
import React from "react";

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Stack pt={2} direction="row" spacing={4} align="center">
        <Button colorScheme="teal" variant="solid">
          Button
        </Button>
        <Button colorScheme="teal" variant="outline">
          Button
        </Button>
        <Button colorScheme="teal" variant="ghost">
          Button
        </Button>
        <Button colorScheme="teal" variant="link" onClick={toggleColorMode}>
          toggleColor
        </Button>
      </Stack>
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
