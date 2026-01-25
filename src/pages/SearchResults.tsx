import { useSearchCxt } from "@/data/searchContext";

export default function SearchResults() {
  const { results, loading, query } = useSearchCxt();

  if (!query) return null;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Searching…</h1>
      </div>
    );
  }

  // Split results by source
  const localResults = results.filter((r) => r.source === "local");
  const stackResults = results.filter((r) => r.source === "stack");
  const geminiResults = results.filter((r) => r.source === "gemini");

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* COLUMN 1 – Local Questions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Local Questions</h2>

          {localResults.length === 0 && (
            <p className="text-sm text-muted-foreground">No local matches found.</p>
          )}

          {localResults.map((r) => (
            <div key={r.id} className="bg-card p-4 border rounded-lg shadow-sm mb-4">
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-sm text-muted-foreground my-2">
                {r.content.slice(0, 150)}…
              </p>

              <div className="mt-3 text-xs text-primary font-bold">
                LOCAL
              </div>
            </div>
          ))}
        </div>

        {/* COLUMN 2 – StackOverflow */}
        <div>
          <h2 className="text-xl font-semibold mb-4">StackOverflow</h2>

          {stackResults.length === 0 && (
            <p className="text-sm text-muted-foreground">No external results found.</p>
          )}

          {stackResults.map((r) => (
            <div key={r.id} className="bg-card p-4 border rounded-lg shadow-sm mb-4">
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-sm text-muted-foreground my-2">
                {r.content.slice(0, 150)}…
              </p>

              {r.link && (
                <a
                  href={r.link}
                  target="_blank"
                  className="text-blue-500 underline text-sm"
                >
                  View on StackOverflow
                </a>
              )}

              <div className="mt-3 text-xs text-primary font-bold">
                STACKOVERFLOW
              </div>
            </div>
          ))}
        </div>

        {/* COLUMN 3 – Gemini AI */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Gemini AI</h2>

          {geminiResults.length === 0 && (
            <p className="text-sm text-muted-foreground">No AI results found.</p>
          )}

          {geminiResults.map((r) => (
            <div key={r.id} className="bg-card p-4 border rounded-lg shadow-sm mb-4">
              <h3 className="font-semibold">{r.title}</h3>
              <p className="text-sm text-muted-foreground my-2 whitespace-pre-line">
                {r.content}
              </p>

              <div className="mt-3 text-xs text-primary font-bold">
                GEMINI AI
              </div>
            </div>
          ))}

          {/* Gemini continuation box */}
          <div className="mt-6 p-4 bg-muted border rounded">
            <p className="text-sm italic text-muted-foreground">
              Gemini chat continues… Ask follow-up questions to keep the context alive.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
