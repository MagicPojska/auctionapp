import { Route, Routes } from "react-router-dom";
import Footer from "./Common/Footer";
import Navbar from "./Common/Navbar";
import AboutPage from "./Pages/AboutPage";
import TermsPage from "./Pages/TermsPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import { loginPath } from "./utilities/paths";
import LoginPage from "./Pages/LoginPage";

const App = () => {
  return (
    <div className="font-lato font-bold">
      <Navbar />
      <Routes>
        <Route path={loginPath} element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/privacy-and-policy" element={<PrivacyPolicyPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
