import Head from 'next/head';

import fetch from 'isomorphic-unfetch';
const Meta = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link rel="shortcut icon" href="" />
    {/* content such as css and images should be placed in the static folder */}
    <link rel="stylesheet" type="text/css" href="/static/style.css" />
    <title>My Website</title>
  </Head>
);

export default Meta;