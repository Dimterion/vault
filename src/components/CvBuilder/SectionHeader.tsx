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
      className="mb-0.5 flex w-full items-center justify-between rounded-2xl bg-gray-800 px-4 py-3 text-left transition hover:bg-gray-700"
    >
      <span className="text-sm font-bold tracking-wide text-white uppercase">
        {title}
      </span>
      <span className="text-xs text-gray-400">{expanded ? "▲" : "▼"}</span>
    </button>
  );
}
