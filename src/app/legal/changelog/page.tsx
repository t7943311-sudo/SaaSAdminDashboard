import Link from 'next/link';

export default function MovedChangelogPage() {
  return (
    <>
      <h1>Page Moved</h1>
      <p className="lead">The Changelog has moved to the main documentation section.</p>
      <p>
        Please find it at the new location: <Link href="/docs/changelog" className="text-primary underline">/docs/changelog</Link>
      </p>
    </>
  );
}
