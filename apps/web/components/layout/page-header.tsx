export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header>
      <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight">
        {title}
      </h1>

      <p className="mt-2 text-muted">{description}</p>
    </header>
  );
}
