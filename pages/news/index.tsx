import React from "react";
import Link from "next/link";

function News() {
  return (
    <>
      <h1>The news page</h1>
      <ul>
        <li>
          <Link href="/news/nextjs-is-great"> NextJS is Great Framework</Link>
        </li>
      </ul>
    </>
  );
}

export default News;
