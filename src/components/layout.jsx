import React from "react";
import { Helmet } from "react-helmet";
import Header from "../bloks/header";
import Footer from "../bloks/footer";

import "../styles/index.scss";

const Layout = ({ settings, children, showBuildStatus }) => {
  let { header, footer } = settings;
  header = header?.node && JSON.parse(header.node.content);
  footer = footer?.node && JSON.parse(footer.node.content);

  return (
    <>
      <Helmet title="Website template" defer={false}>
        Seo
      </Helmet>
      {showBuildStatus && (
        <div className="build_status">
          <div className="container __responsive">
            <img src="https://api.netlify.com/api/v1/badges/e3c67c1e-fe5c-4bd4-a25c-334b91b2e7a9/deploy-status" />
          </div>
        </div>
      )}
      {!!header && <Header blok={header} languages={settings.languages} />}
      <main>{children}</main>
      {!!footer && <Footer blok={footer} languages={settings.languages} />}
    </>
  );
};

export default Layout;
