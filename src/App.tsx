import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import HabitTrackerPage from "./pages/habitTracker";
import ListingsPage from "./pages/listings";
import PlatformsPage from "./pages/platforms";
import CvBuilderPage from "./pages/cvBuilder";
import ApplicationTrackerPage from "./pages/application-tracker";
import ActivitiesPage from "./pages/activities";
import AboutPage from "./pages/about";
import NotFoundPage from "./pages/notFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main className="min-w-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/habit-tracker" element={<HabitTrackerPage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/platforms" element={<PlatformsPage />} />
          <Route path="/cv-builder" element={<CvBuilderPage />} />
          <Route
            path="/application-tracker"
            element={<ApplicationTrackerPage />}
          />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
