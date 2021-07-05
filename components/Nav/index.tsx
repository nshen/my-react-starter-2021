import React from "react";
import Link from "next/link";
import styles from "./index.module.css";

const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/static-demo">static</Link>
        </li>
        <li>
          <Link href="/dynamic-demo">dynamic</Link>
        </li>
        <li>
          <Link href="/recoil-demo">recoil</Link>
        </li>
        <li>
          <Link href="/about">about</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
