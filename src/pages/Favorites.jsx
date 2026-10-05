import { Link } from "react-router-dom";
import { useQuotes } from "../context/QuoteContext";

export default function Favorites() {
  const { favorites, removeFavorite } = useQuotes();

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: "var(--color-background)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Nav */}
      <header
        className="sticky top-0 z-20 w-full border-b"
        style={{
          backgroundColor: "rgba(250,249,246,0.85)",
          backdropFilter: "blur(12px)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#fff",
              }}
            >
              ✦
            </span>

            <span
              className="text-xl font-semibold tracking-tight"
              style={{
                color: "var(--color-foreground)",
                fontFamily: "var(--font-display)",
              }}
            >
              Inspire
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: "var(--color-muted-foreground)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-foreground)";
                e.currentTarget.style.backgroundColor = "var(--color-muted)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-muted-foreground)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Home
            </Link>

            <Link
              to="/favorites"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: "var(--color-primary)",
                backgroundColor: "var(--color-secondary)",
              }}
            >
              Favorites
            </Link>

            <Link
              to="/add-quote"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: "var(--color-muted-foreground)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-foreground)";
                e.currentTarget.style.backgroundColor = "var(--color-muted)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-muted-foreground)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Add Quote
            </Link>

            <Link
              to="/#your-quotes"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: "var(--color-muted-foreground)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-foreground)";
                e.currentTarget.style.backgroundColor = "var(--color-muted)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-muted-foreground)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Your Quotes
            </Link>

            <Link
              to="/about"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: "var(--color-muted-foreground)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-foreground)";
                e.currentTarget.style.backgroundColor = "var(--color-muted)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-muted-foreground)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              About
            </Link>
          </nav>

          {/* Page indicator */}
          <span
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{
              color: "var(--color-primary)",
              backgroundColor: "var(--color-secondary)",
            }}
          >
            Favorites
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 pb-12">
        {/* Page heading */}
        <section className="pt-10 pb-8 text-center">
          <h1
            className="text-4xl md:text-5xl leading-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-foreground)",
            }}
          >
            Your{" "}
            <span style={{ color: "var(--color-primary)" }}>Favorites</span>
          </h1>

          <p
            className="text-lg max-w-md mx-auto"
            style={{
              color: "var(--color-muted-foreground)",
              fontWeight: 300,
            }}
          >
            The thoughts that inspired you enough to save.
          </p>

          {favorites.length > 0 && (
            <div className="flex justify-center mt-5">
              <span
                className="text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                }}
              >
                {favorites.length} {favorites.length === 1 ? "quote" : "quotes"}{" "}
                saved
              </span>
            </div>
          )}
        </section>

        {/* Favorites */}
        {favorites.length === 0 ? (
          <div
            className="text-center py-20 rounded-2xl border"
            style={{
              borderColor: "var(--color-border)",
              borderStyle: "dashed",
              color: "var(--color-muted-foreground)",
            }}
          >
            <p
              className="text-5xl mb-4"
              style={{ color: "var(--color-secondary)" }}
            >
              ♡
            </p>

            <p
              className="text-xl mb-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-foreground)",
              }}
            >
              No favorites yet
            </p>

            <p className="text-sm">Start saving quotes that inspire you.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {favorites.map((fav) => (
              <div
                key={`${fav.text}-${fav.author}`}
                className="group relative rounded-2xl border p-6 transition-all"
                style={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border)",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 18px rgba(91,71,214,0.09)";
                  e.currentTarget.style.borderColor = "#d4cef4";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 1px 6px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor = "var(--color-border)";
                }}
              >
                {/* Decorative top accent */}
                <div
                  className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full"
                  style={{
                    backgroundColor: "var(--color-primary)",
                    opacity: 0.35,
                  }}
                />

                <div className="pl-4">
                  {/* Quote */}
                  <p
                    className="text-lg leading-relaxed mb-5"
                    style={{
                      color: "var(--color-card-foreground)",
                      fontFamily: "var(--font-display)",
                      fontStyle: "italic",
                    }}
                  >
                    "{fav.text}"
                  </p>

                  {/* Author + category */}
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p
                        className="text-sm font-semibold mb-2"
                        style={{
                          color: "var(--color-foreground)",
                        }}
                      >
                        — {fav.author}
                      </p>

                      <span
                        className="inline-flex text-xs px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: "var(--color-muted)",
                          color: "var(--color-muted-foreground)",
                        }}
                      >
                        {fav.category}
                      </span>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFavorite(fav)}
                      className="w-9 h-9 rounded-lg flex items-center justify-center transition-all"
                      style={{
                        color: "#d67373",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#fff0f0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                      title="Remove from favorites"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 011-1h4a1 1 0 011 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="mt-8 py-6 border-t text-center"
        style={{
          borderColor: "var(--color-border)",
        }}
      >
        <p
          className="text-sm"
          style={{
            color: "var(--color-muted-foreground)",
          }}
        >
          <span className="mr-1.5">✦</span>
          Inspirational Quote Generator
        </p>
      </footer>
    </div>
  );
}
