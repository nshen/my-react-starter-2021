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
          <Link href="/examples/static-demo">static</Link>
        </li>
        <li>
          <Link href="/examples/dynamic-demo">dynamic</Link>
        </li>
        <li>
          <Link href="/examples/recoil-demo">recoil</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
