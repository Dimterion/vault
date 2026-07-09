import { useState, type SubmitEvent } from "react";
import { useHabits } from "../../context/useHabits";
import Button from "../Button";

export default function HabitForm() {
  const [name, setName] = useState("");
  const { addHabit } = useHabits();

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (name.trim() === "") return;
    setName("");
    addHabit(name);
  }

  return (
    <form
      className="mb-2 flex flex-col gap-2 sm:flex-row"
      onSubmit={handleSubmit}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="min-w-0 flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
        placeholder="New habit..."
      />
      <Button
        disabled={name.trim() === ""}
        className="w-full sm:w-auto sm:shrink-0"
      >
        Add Habit
      </Button>
    </form>
  );
}
