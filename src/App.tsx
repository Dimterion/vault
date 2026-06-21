import { useState } from "react";
import HabitForm from "./components/HabitForm";
import HabitList, { type Habit } from "./components/HabitList";
import Header from "./components/Header";
import { isSameDay } from "date-fns";

export default function App() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col p-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList
        habits={habits}
        toggleHabit={toggleHabit}
        deleteHabit={deleteHabit}
      />
    </div>
  );
}
