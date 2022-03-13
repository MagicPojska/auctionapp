import { Route, Routes } from "react-router-dom";
import Footer from "./Common/Footer";
import Navbar from "./Common/Navbar";
import AboutPage from "./Pages/AboutPage";
import TermsPage from "./Pages/TermsPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import ProductOverviewPage from "./Pages/ProductOverviewPage";
import PageLayout from "./components/PageLayout";

import {
  aboutUsPath,
  categoriesPath,
  homePath,
  loginPath,
  privacyPolicyPath,
  registrationPath,
  shopProductPath,
  termsPath,
} from "./utilities/paths";
import LandingPage from "./Pages/LandingPage";
import FilterPage from "./Pages/FilterPage";

const App = () => {
  return (
    <div className="font-lato font-bold">
      <Navbar />
      <Routes>
        <Route path={homePath} element={<LandingPage />} />
        <Route path={`${categoriesPath}/:id`} element={<FilterPage />} />
        <Route path={loginPath} element={<LoginPage />} />
        <Route path={registrationPath} element={<RegistrationPage />} />
        <Route
          path={`${shopProductPath}/:id`}
          element={
            <PageLayout>
              <ProductOverviewPage />
            </PageLayout>
          }
        />
        <Route
          path={aboutUsPath}
          element={
            <PageLayout>
              <AboutPage />
            </PageLayout>
          }
        />
        <Route
          path={termsPath}
          element={
            <PageLayout>
              <TermsPage />
            </PageLayout>
          }
        />
        <Route
          path={privacyPolicyPath}
          element={
            <PageLayout>
              <PrivacyPolicyPage />
            </PageLayout>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
