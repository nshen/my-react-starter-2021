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
          <Link href="/static-demo">static-demo</Link>
        </li>
        <li>
          <Link href="/dynamic-demo">dynamic-demo</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;