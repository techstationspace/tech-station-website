import React from "react";
import { Helmet } from "react-helmet";
import Header from "../bloks/header";
import Footer from "../bloks/footer";

import "../styles/index.scss";

const Layout = ({ settings, children }) => {
  let { header, footer } = settings;
  header = header?.node && JSON.parse(header.node.content);
  footer = footer?.node && JSON.parse(footer.node.content);

  return (
    <>
      <Helmet title="Website template" defer={false}>
        Seo
      </Helmet>
      {!!header && <Header blok={header} languages={settings.languages} />}
      <main>{children}</main>
      {!!footer && <Footer blok={footer} languages={settings.languages} />}
    </>
  );
};

export default Layout;
