import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";

import path from "path";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

function searchAndAppendToFile(filePath, searchText, appendText) {
  let data = fs.readFileSync(filePath, "utf8");
  // (err, data) => {
  //     if (err) {
  //         console.error(`Error reading file: ${err}`);
  //         return;
  //     }

  //     // Check if the searchText is present in the file
  if (data.includes(searchText)) {
    // Append the appendText to the file content

    return data.replace(searchText, `${searchText}${appendText}`);
  }
  // });

  return data;
}

const renderFullPage = (html = "") => {
  const clientPath = path.dirname(require.resolve("../package.json"));
  const htmlPath = path.join(clientPath, "build/index.html");
  return searchAndAppendToFile(htmlPath, "<meta/>", html);
};

const handleSSR = async (req, res) => {
  const location = req.originalUrl;

  if (/\.(gif|jpe?g|tiff?|png|webp|bmp|js|css|ico)$/i.test(location)) {
    return false;
  }

  const domain_name = process.env.REACT_APP_COMMON_URL;
  // const domain_name = "http://localhost:8000";

  const MetaTagAPI = async () => {
    let post_body = JSON.stringify({
      metaurl: domain_name + location,
    });
    let config = {
      method: "post",
      url: "https://api.shoplocal.digital/vms/businessuser/metaogtagurlapi",
      headers: {
        "Content-Type": "application/json",
      },
      data: post_body,
    };
    try {
      const response_body = await axios
        .request(config)
        .then((value) => {
          return value.data;
        })
        .catch((err) => {
          console.log("Request Failed");
        });
      // console.log("API Response: " + JSON.stringify(response_body));
      return response_body;
    } catch (error) {
      return false;
    }
  };

  const MetaTagRes = await MetaTagAPI();
  var custom_metadata = null;
  if (MetaTagRes && MetaTagRes.data) {
    custom_metadata = MetaTagRes.data[0];
    console.log("custom metadata: " + JSON.stringify(custom_metadata));
  } else {
    console.log("Metadata not found");
  }

  //Here we can calculate and send an initial state
  //from the server to the front end for when it is
  //loaded in an environment where JS is disabled

  const GetWindowUrl = req.originalUrl;

  const html = ReactDOMServer.renderToString(
    <>
      <title>
        {GetWindowUrl.includes("support")
          ? "Shop Local Digital | Resources"
          : "Shop Local Digital | End User Portal"}
      </title>
      <meta
        name="description"
        content={
          GetWindowUrl.includes("support")
            ? "How to use guide, Free Resources, shop local, buy local, hyper local marketplace, community marketplace"
            : custom_metadata
            ? custom_metadata.meta_description
            : "Access hundreds of exclusive deals and discounts from your favorite local businesses. Start saving today!"
        }
      />
      <meta
        property="og:title"
        content={
          GetWindowUrl.includes("support")
            ? "Shop Local Digital | Resources"
            : "Shop Local Digital | End User Portal"
        }
      />

      <meta
        property="og:description"
        content={
          GetWindowUrl.includes("support")
            ? "How to use guide, Free Resources, shop local, buy local, hyper local marketplace, community marketplace"
            : custom_metadata
            ? custom_metadata.meta_description
            : "Access hundreds of exclusive deals and discounts from your favorite local businesses. Start saving today!"
        }
      />
      <meta
        property="og:url"
        content={
          custom_metadata
            ? custom_metadata.metaurl
            : "https://customer.shoplocal.digital/"
        }
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        itemProp="image primaryImageOfPage"
        content={
          custom_metadata
            ? custom_metadata.meta_image
            : "https://customer.shoplocal.digital/static/media/Black%20Shop%20local%20logo.d47c6a53faedf2aa37b03973d3e85f40.svg"
        }
      />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="315" />
      <meta property="og:image:type" content="image/png" />
      <meta
        name="twitter:title"
        content={
          GetWindowUrl.includes("support")
            ? "Shop Local Digital | Resources"
            : "Shop Local Digital | End User Portal"
        }
      />
      <meta
        name="twitter:description"
        content={
          GetWindowUrl.includes("support")
            ? "How to use guide, Free Resources, shop local, buy local, hyper local marketplace, community marketplace"
            : custom_metadata
            ? custom_metadata.meta_description
            : "Access hundreds of exclusive deals and discounts from your favorite local businesses. Start saving today!"
        }
      />
    </>
  );
  // res.status(200).send(renderFullPage(html, preloadedState));
  return renderFullPage(html);
};

export { handleSSR };
