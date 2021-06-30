import Head from "next/head";
import styles from "../styles/Home.module.css"; // 命名规则 .module.css
import ArticleList from "../components/ArticleList";

export default function Home() {
  return (
    <div>
      <ArticleList
        articles={[
          { title: "test 111111111111" },
          { title: "test 22222222222" },
          { title: "test 333" },
        ]}
      />
    </div>
  );
}

// export const getStaticProps = async () => {
//   const res = await fetch(`${server}/api/articles`);
//   const articles = await res.json();

//   return {
//     props: {
//       articles,
//     },
//   };
// };

// export const getStaticProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
//   const articles = await res.json()

//   return {
//     props: {
//       articles,
//     },
//   }
// }
