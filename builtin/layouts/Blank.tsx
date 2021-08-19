import { Flex } from '@chakra-ui/layout';
import React from 'react';
import Meta from '../components/Meta';

type Props = {
  children: React.ReactNode;
};

const Blank = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Flex w="100vw" h="100vh">
        {children}
      </Flex>
    </>
  );
};

export default Blank;
