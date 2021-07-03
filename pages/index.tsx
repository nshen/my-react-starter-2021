import { Button, Stack } from "@chakra-ui/react";

export default function Home() {
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
        <Button colorScheme="teal" variant="link">
          Button
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
