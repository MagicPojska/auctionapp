import { Route, Routes } from "react-router-dom";
import Footer from "./Common/Footer";
import Navbar from "./Common/Navbar";
import AboutPage from "./Pages/AboutPage";
import TermsPage from "./Pages/TermsPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import PageLayout from "./components/PageLayout";

import {
  aboutUsPath,
  loginPath,
  privacyPolicyPath,
  registrationPath,
  termsPath,
} from "./utilities/paths";

const App = () => {
  return (
    <div className="font-lato font-bold">
      <Navbar />
      <Routes>
        <Route path={loginPath} element={<LoginPage />} />
        <Route path={registrationPath} element={<RegistrationPage />} />
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
