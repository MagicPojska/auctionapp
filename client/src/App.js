import { Route, Routes } from "react-router-dom";
import Footer from "./Common/Footer";
import Navbar from "./Common/Navbar";
import AboutPage from "./Pages/AboutPage";
import TermsPage from "./Pages/TermsPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import PageLayout from "./components/PageLayout";

const App = () => {
  return (
    <div className="font-lato font-bold">
      <Navbar />
      <Routes>
        <Route
          path="/about"
          element={
            <PageLayout>
              <AboutPage />
            </PageLayout>
          }
        />
        <Route
          path="/terms-and-conditions"
          element={
            <PageLayout>
              <TermsPage />
            </PageLayout>
          }
        />
        <Route
          path="/privacy-and-policy"
          element={
            <PageLayout>
              <PrivacyPolicyPage />{" "}
            </PageLayout>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
