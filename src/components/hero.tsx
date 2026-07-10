type HeroProps = {
  title: string;
  text: string;
};

export default function Hero({ title, text }: HeroProps) {
  return (
    <section className="rounded bg-zinc-800 p-4">
      <h3 className="text-center text-lg font-semibold">{title}</h3>
      <p>{text}</p>
    </section>
  );
}
