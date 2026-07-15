import Hero from "../components/Hero";

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center px-4 py-10">
      <Hero
        title="About Vault app"
        text="Vault is an app to organize your activities."
      />
    </div>
  );
}
