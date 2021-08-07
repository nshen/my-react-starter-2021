import React from "react";
import Meta from "../Meta";
import Nav from "../Nav";
import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Meta />
      <div className={styles.container}>
        <Nav />
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <span>Footer</span>
        </footer>
      </div>
    </>
  );
};

export default Layout;
