import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import HabitTrackerPage from "./pages/habitTracker";
import NotFoundPage from "./pages/notFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/habit-tracker" element={<HabitTrackerPage />}></Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}
