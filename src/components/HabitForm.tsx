import Button from "./Button";

export default function HabitForm() {
  return (
    <form className="flex gap-2">
      <input
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 outline-none focus-visible:via-violet-500 focus-visible:ring-2"
        placeholder="New habit..."
      />
      <Button className="bg-red-500">Add Habit</Button>
    </form>
  );
}
