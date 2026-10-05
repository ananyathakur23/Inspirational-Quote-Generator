export default function About() {
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
          <a href="/" className="flex items-center gap-2">
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
          </a>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            <a
              href="/"
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                color: "var(--color-muted-foreground)",
              }}
            >
              Home
            </a>

            <a
              href="/#favorites"
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                color: "var(--color-muted-foreground)",
              }}
            >
              Favorites
            </a>

            <a
              href="/add-quote"
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                color: "var(--color-muted-foreground)",
              }}
            >
              Add Quote
            </a>

            <a
              href="/#your-quotes"
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                color: "var(--color-muted-foreground)",
              }}
            >
              Your Quotes
            </a>

            <a
              href="/about"
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                color: "var(--color-primary)",
                backgroundColor: "var(--color-secondary)",
              }}
            >
              About
            </a>
          </nav>
        </div>
      </header>

      {/* About content */}
      <main className="max-w-4xl mx-auto px-8 py-16">
        <section
          className="rounded-2xl border p-10"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
            boxShadow:
              "0 4px 32px rgba(91,71,214,0.07), 0 1px 4px rgba(0,0,0,0.04)",
          }}
        >
          <div className="text-center mb-10">
            <div
              className="w-14 h-14 mx-auto mb-5 rounded-2xl flex items-center justify-center text-2xl"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "var(--color-primary)",
              }}
            >
              ✦
            </div>

            <h1
              className="text-4xl mb-3"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-foreground)",
              }}
            >
              About Inspire
            </h1>

            <p
              className="text-base"
              style={{
                color: "var(--color-muted-foreground)",
              }}
            >
              Your daily dose of inspiration.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <h2
                className="text-xl mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-foreground)",
                }}
              >
                About the Project
              </h2>

              <p
                className="text-sm leading-7"
                style={{
                  color: "var(--color-muted-foreground)",
                }}
              >
                Inspirational Quote Generator is a React-based web application
                designed to help users discover, save, and manage inspirational
                quotes. Quotes can come from the application's collection,
                external API data, or be added by the user.
              </p>
            </div>

            <div>
              <h2
                className="text-xl mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-foreground)",
                }}
              >
                Features
              </h2>

              <ul
                className="space-y-2 text-sm leading-6"
                style={{
                  color: "var(--color-muted-foreground)",
                }}
              >
                <li>✦ Browse inspirational quotes by category</li>
                <li>✦ Search quotes and authors</li>
                <li>✦ Get a random new quote</li>
                <li>✦ Fetch additional quotes using an external API</li>
                <li>✦ Add, edit, and delete your own quotes</li>
                <li>✦ Save favorite quotes for later</li>
                <li>✦ Handle API loading and error states</li>
              </ul>
            </div>

            <div>
              <h2
                className="text-xl mb-2"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-foreground)",
                }}
              >
                Technologies Used
              </h2>

              <p
                className="text-sm leading-7"
                style={{
                  color: "var(--color-muted-foreground)",
                }}
              >
                React, React Hooks, React Router, JavaScript, Tailwind CSS,
                Context API, and REST API integration.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer
        className="mt-4 py-6 border-t text-center"
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