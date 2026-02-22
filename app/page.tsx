export default function Home() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col min-h-svh px-4 py-8 gap-8">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Lyse Design System
        </h1>
        <p className="text-muted-foreground">
          Production-ready React components from the Lyse Figma Design System.
        </p>
      </header>
      <main className="flex flex-col flex-1 gap-8">
        <div className="flex flex-col gap-4 border rounded-lg p-6">
          <h2 className="text-lg font-semibold">Getting Started</h2>
          <p className="text-muted-foreground text-sm">
            Add the Lyse registry to your project:
          </p>
          <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
            <code>{`// components.json
{
  "registries": {
    "@lyse": "https://ui.lyse.dev/r/{name}.json"
  }
}`}</code>
          </pre>
          <p className="text-muted-foreground text-sm">
            Then install components:
          </p>
          <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
            <code>npx shadcn@latest add @lyse/button</code>
          </pre>
        </div>
        <div className="flex flex-col gap-4 border rounded-lg p-6">
          <h2 className="text-lg font-semibold">Components</h2>
          <p className="text-muted-foreground text-sm">
            Components are being added. Check back soon.
          </p>
        </div>
      </main>
      <footer className="text-xs text-muted-foreground text-center py-4 border-t">
        MIT License &middot; Built by{" "}
        <a
          href="https://getlyse.com"
          className="underline underline-offset-4 hover:text-foreground"
        >
          Lyse Labs
        </a>
      </footer>
    </div>
  );
}
