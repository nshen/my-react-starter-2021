import React from "react";
import fs from "fs";

const about = (pkg: any) => {
  return (
    <div>
      <h1>{pkg.name}</h1>
      <h2>version: {pkg.version}</h2>
    </div>
  );
};

export async function getStaticProps() {
  let file = await fs.promises.readFile("./package.json", {
    encoding: "utf-8",
  });
  file = JSON.parse(file);
  return {
    props: file,
  };
}

export default about;
