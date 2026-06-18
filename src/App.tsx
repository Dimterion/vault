import { useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList, { type Habit } from "./components/HabitList";
import Header from "./components/Header";

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([]);

  function addHabit(name: string) {
    setHabits((curr) => [
      ...curr,
      { id: crypto.randomUUID(), name, completions: [] },
    ]);
  }

  function deleteHabit(id: string) {
    setHabits((curr) => curr.filter((h) => h.id !== id));
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col p-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList habits={habits} deleteHabit={deleteHabit} />
    </div>
  );
}
