import { Flex, Heading, Select, Text } from '@chakra-ui/react';
import fs from 'fs';
import React from 'react';
import MotionBadge from '../buildin-components/MotionBadge';
import { useI18n } from '../i18n/Context';

const Home = (pkg: any) => {
  const { t, locale, setLocale } = useI18n();

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
      <Heading as="h1" pb="5" size="2xl">
        {t.name}
      </Heading>
      <Select
        value={locale}
        onChange={(e) => {
          setLocale(e.target.value);
        }}
      >
        <option value="en-US">英文</option>
        <option value="zh-CN">中文</option>
      </Select>
      <Text pb="5" color="">
        {pkg.description}
      </Text>
      {/* 动画演示 */}
      <MotionBadge>{'v' + pkg.version}</MotionBadge>
    </Flex>
  );
};

// Fetch data at build time.
// https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export async function getStaticProps() {
  let file = await fs.promises.readFile('./package.json', {
    encoding: 'utf-8',
  });
  file = JSON.parse(file);
  return {
    props: file,
  };
}

export default Home;
