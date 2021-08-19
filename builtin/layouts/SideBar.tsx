import { Flex } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/react';
import React from 'react';
import Meta from '../components/Meta';

type Props = {
  children: React.ReactNode;
};

const SideBar = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Flex w="100vw" h="100vh">
        <Box as="aside" w="30%" bg="red.100">
          sidebar
        </Box>
        <Box as="main" flex="1" overflow="auto">
          {children}
          {children}
        </Box>
      </Flex>
    </>
  );
};

export default SideBar;
