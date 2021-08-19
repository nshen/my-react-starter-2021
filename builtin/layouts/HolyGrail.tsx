import { Flex } from '@chakra-ui/layout';
import { Box, Center } from '@chakra-ui/react';
import React from 'react';
import Meta from '../components/Meta';

type Props = {
  children: React.ReactNode;
};

const HolyGrail = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Flex w="100vw" h="100vh" direction="column">
        <Center as="header" h="20">
          header
        </Center>
        <Flex flexGrow={1} direction="row" as="main">
          <Box w="20%" as="aside" bg="red.100">
            left
          </Box>
          <Box flexGrow={1} as="main" bg="red.200">
            {children}
          </Box>
          <Box w="20%" as="nav" bg="red.100">
            right
          </Box>
        </Flex>

        <Center as="footer" h="20">
          footer
        </Center>
      </Flex>
    </>
  );
};

export default HolyGrail;
