import { useState } from "react";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";
import { HabitProvider } from "./context/HabitProvider";
import Header from "./components/Header";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0);

  const week = addWeeks(new Date(), weekOffset);
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });

  return (
    <div className="mx-auto flex max-w-2xl flex-col p-4">
      <HabitProvider>
        <Header
          visibleDates={visibleDates}
          onNext={() => setWeekOffset((o) => o + 1)}
          onPrev={() => setWeekOffset((o) => o - 1)}
        />
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </HabitProvider>
    </div>
  );
}
