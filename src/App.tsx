import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import HabitTrackerPage from "./pages/habitTracker";
import NotFoundPage from "./pages/notFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/habit-tracker" element={<HabitTrackerPage />}></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
