import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col p-4">
      <Header />
      <HabitForm />
      <HabitList />
    </div>
  );
}
