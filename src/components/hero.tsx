type HeroProps = {
  title: string;
  text: string;
  image?: string;
};

export default function Hero({ title, text, image }: HeroProps) {
  return (
    <section className="mx-auto flex w-56 flex-col items-center gap-4 rounded bg-zinc-800 p-6 text-center sm:w-xl">
      {image && (
        <img src={image} alt="Hero section image." className="rounded" />
      )}
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{text}</p>
    </section>
  );
}
