import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import PrivacyTermsConditions from "./Components/PrivacyTermsConditions/PrivacyTermsConditions";
import Toaster from "./Components/Toaster/Toaster";
import PrivatePages from "./Router/PrivatePages";
import PublicPages from "./Router/PublicPages";
import RedirectLoginUserAuth from "./Utils/Auth/RedirectLoginUserAuth";
import RequireAuth from "./Utils/Auth/RequireAuth";
import ErrorPage from "./Pages/Error/error404";

function App() {
  const PageTitle = ({ title, description, image, children }) => {
    useEffect(() => {
      // Set document title
      document.title = title || "Shop Local Digital | End User Portal";

      // Set OG Description
      if (description) {
        let metaDescription = document.querySelector(
          "meta[name='description']"
        );
        if (!metaDescription) {
          metaDescription = document.createElement("meta");
          metaDescription.setAttribute("name", "description");
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute("content", description);
      }

      // Set OG Image
      if (image) {
        let metaOgImage = document.querySelector("meta[property='og:image']");
        if (!metaOgImage) {
          metaOgImage = document.createElement("meta");
          metaOgImage.setAttribute("property", "og:image");
          document.head.appendChild(metaOgImage);
        }
        metaOgImage.setAttribute("content", image);
      }
    }, [title, description, image]);

    return children;
  };

  return (
    <>
      <Toaster />
      <div className="App">
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          {PublicPages.map(
            (
              {
                path,
                component: Component,
                pageTitle,
                pageDescription,
                pageImage,
              },
              index
            ) => (
              <Route
                key={index}
                path={path}
                element={
                  <RedirectLoginUserAuth>
                    <PageTitle
                      title={pageTitle}
                      description={pageDescription}
                      image={pageImage}
                    >
                      <Component />
                    </PageTitle>
                  </RedirectLoginUserAuth>
                }
              />
            )
          )}
          {PrivatePages.map(
            (
              {
                path,
                component: Component,
                pageTitle,
                pageDescription,
                pageImage,
              },
              index
            ) => {
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <RequireAuth>
                      <PageTitle
                        title={pageTitle}
                        description={pageDescription}
                        image={pageImage}
                      >
                        <Component />
                      </PageTitle>
                      <PrivacyTermsConditions />
                    </RequireAuth>
                  }
                />
              );
            }
          )}
        </Routes>
      </div>
    </>
  );
}

export default App;
