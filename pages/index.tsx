import React from "react";
import { Flex, Text, Heading } from "@chakra-ui/react";
import fs from "fs";
import MotionBadge from "../components/MotionBadge";

const Home = (pkg: any) => {
  return (
    <Flex
      flex="1"
      w="full"
      h="full"
      align="center"
      justify="center"
      direction="column"
    >
      <Heading as="h1" pb="5" size="2xl">
        {pkg.name}
      </Heading>
      <Text pb="5" color="">
        {pkg.description}
      </Text>
      {/* 动画演示 */}
      <MotionBadge>{"v" + pkg.version}</MotionBadge>
    </Flex>
  );
};

// Fetch data at build time.
// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export async function getStaticProps() {
  let file = await fs.promises.readFile("./package.json", {
    encoding: "utf-8",
  });
  file = JSON.parse(file);
  return {
    props: file,
  };
}

export default Home;
