import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "./header";
import Footer from "./footer";

import "../styles/index.scss";

const Layout = ({ settings, children }) => {
  const header = JSON.parse(settings.header.node.content);
  const footer = JSON.parse(settings.footer.node.content);

  return (
    <>
      <Helmet title="Website template" defer={false}>
        Seo
      </Helmet>
      <Header blok={header} languages={settings.languages} />
      <main>{children}</main>
      <Footer blok={footer} />
    </>
  );
};

export default Layout;
