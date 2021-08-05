import { Flex } from '@chakra-ui/layout';
import React from 'react';
import Meta from '../components/Meta';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <Flex w="100vw" h="100vh">
        {children}
      </Flex>
      {/* <div className={styles.container}>
        <Nav />
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <span>Footer</span>
        </footer>
      </div> */}
    </>
  );
};

export default Layout;
