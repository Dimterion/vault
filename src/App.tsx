import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import Header from "./components/Header";
import { HabitProvider } from "./context/HabitProvider";

export default function App() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col p-4">
      <HabitProvider>
        <Header />
        <HabitForm />
        <HabitList />
      </HabitProvider>
    </div>
  );
}
