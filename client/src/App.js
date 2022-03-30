import { Route, Routes } from "react-router-dom";
import Footer from "./Common/Footer";
import Navbar from "./Common/Navbar";
import AboutPage from "./Pages/AboutPage";
import TermsPage from "./Pages/TermsPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import ProductOverviewPage from "./Pages/ProductOverviewPage";
import MyAccountPage from "./Pages/MyAccountPage";
import LandingPage from "./Pages/LandingPage";
import FilterPage from "./Pages/FilterPage";
import NotFoundPage from "./Pages/NotFoundPage";

import {
  aboutUsPath,
  addItemPath,
  categoriesPath,
  homePath,
  loginPath,
  myAccountPath,
  privacyPolicyPath,
  profilePath,
  registrationPath,
  sellerPath,
  shopProductPath,
  termsPath,
} from "./utilities/paths";
import ScrollToTop from "./components/ScrollToTop";
import AddItemPage from "./Pages/AddItemPage";

const App = () => {
  return (
    <div className="font-lato font-bold">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path={homePath} element={<LandingPage />} />
        <Route path={`${categoriesPath}/:id`} element={<FilterPage />} />
        <Route path={loginPath} element={<LoginPage />} />
        <Route path={registrationPath} element={<RegistrationPage />} />
        <Route path={addItemPath + sellerPath} element={<AddItemPage />} />
        <Route path={`${myAccountPath}/*`} element={<MyAccountPage />} />
        <Route
          path={`${shopProductPath}/:id`}
          element={<ProductOverviewPage />}
        />
        <Route path={aboutUsPath} element={<AboutPage />} />
        <Route path={termsPath} element={<TermsPage />} />
        <Route path={privacyPolicyPath} element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
