type HeroProps = {
  title: string;
  text: string;
  image?: string;
};

export default function Hero({ title, text, image }: HeroProps) {
  return (
    <section className="w-64 rounded bg-zinc-800 p-4 text-center sm:w-xl">
      <h3 className="text-lg font-semibold">{title}</h3>
      {image && <img src={image} alt="Hero section image." />}
      <p>{text}</p>
    </section>
  );
}
