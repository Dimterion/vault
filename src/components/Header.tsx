export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Tracker</h1>
        <span className="text-sm text-zinc-400">1/1 done today</span>
      </div>
      <div></div>
    </header>
  );
}
