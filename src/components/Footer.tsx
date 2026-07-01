export default function Footer() {
  return (
    <footer className="flex flex-row justify-center gap-2">
      <p>&copy; {new Date().getFullYear()}</p>
      <a
        href="https://github.com/Dimterion/vault"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Vault
      </a>
    </footer>
  );
}
