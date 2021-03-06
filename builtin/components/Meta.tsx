import Head from 'next/head';

type MetaProps = typeof defaultProps;

const defaultProps = {
  title: 'my-react-starter-2021',
  keywords: 'react, next, starter',
  description: 'Next.js + Chakra-ui + Recoil + axios-hooks',
};

/**
 *  页面 Meta 数据，包括 title， keywords，description
 */
const Meta = ({ title, keywords, description }: MetaProps) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = defaultProps;

export default Meta;
