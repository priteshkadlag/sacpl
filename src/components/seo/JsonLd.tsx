export function JsonLd({ data }: { data: object | null | (object | null)[] }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!items.length) return null;
  return (
    <script
      type="application/ld+json"
      // JSON-LD is generated from our own content; escape "<" to prevent script breakout.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(items.length === 1 ? items[0] : items).replace(/</g, '\\u003c') }}
    />
  );
}
