type Props = {
  title: string;
  expanded: boolean;
  onToggle: () => void;
};

export default function SectionHeader({ title, expanded, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      className="mb-0.5 flex w-full cursor-pointer items-center justify-between rounded-2xl bg-gray-800 px-4 py-3 text-left transition hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
    >
      <span className="text-sm font-bold tracking-wide text-white uppercase">
        {title}
      </span>
      <span className="text-xs text-gray-400">{expanded ? "▲" : "▼"}</span>
    </button>
  );
}
