import { Route, Routes } from "react-router-dom";
import Footer from "./Common/Footer";
import Navbar from "./Common/Navbar";
import AboutPage from "./Pages/AboutPage";
import TermsPage from "./Pages/TermsPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import PageLayout from "./components/PageLayout";
import { aboutUsPath, privacyPolicyPath, termsPath } from "./utilities/paths";

const App = () => {
  return (
    <div className="font-lato font-bold">
      <Navbar />
      <Routes>
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
