import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow"><span />404</p>
      <h1>Page not found.</h1>
      <p>The page may have moved, but the portfolio is still here.</p>
      <Link className="button button-primary" href="/">Back to portfolio</Link>
    </main>
  );
}
