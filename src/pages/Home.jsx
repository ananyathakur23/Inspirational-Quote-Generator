import { useState, useMemo, useEffect } from "react";
import { useQuotes } from "../context/QuoteContext";

const QUOTES = [
  // Motivation
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
    category: "Motivation",
  },
  {
    text: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    category: "Motivation",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    category: "Motivation",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
    category: "Motivation",
  },

  // Success
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: "Success",
  },
  {
    text: "Success usually comes to those who are too busy to be looking for it.",
    author: "Henry David Thoreau",
    category: "Success",
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
    category: "Success",
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: "Success",
  },

  // Happiness
  {
    text: "Happiness depends upon ourselves.",
    author: "Aristotle",
    category: "Happiness",
  },
  {
    text: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    category: "Happiness",
  },
  {
    text: "Happiness is not something ready made. It comes from your own actions.",
    author: "Dalai Lama",
    category: "Happiness",
  },
  {
    text: "The most important thing is to enjoy your life—to be happy—it's all that matters.",
    author: "Audrey Hepburn",
    category: "Happiness",
  },

  // Confidence
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: "Confidence",
  },
  {
    text: "Confidence comes not from always being right but from not fearing to be wrong.",
    author: "Peter T. McIntyre",
    category: "Confidence",
  },
  {
    text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    author: "Buddha",
    category: "Confidence",
  },
  {
    text: "With confidence, you have won before you have started.",
    author: "Marcus Garvey",
    category: "Confidence",
  },

  // Goals
  {
    text: "A goal without a plan is just a wish.",
    author: "Antoine de Saint-Exupéry",
    category: "Goals",
  },
  {
    text: "Setting goals is the first step in turning the invisible into the visible.",
    author: "Tony Robbins",
    category: "Goals",
  },
  {
    text: "If you can dream it, you can achieve it.",
    author: "Zig Ziglar",
    category: "Goals",
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis",
    category: "Goals",
  },

  // Dreams
  {
    text: "All our dreams can come true, if we have the courage to pursue them.",
    author: "Walt Disney",
    category: "Dreams",
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Dreams",
  },
  {
    text: "Dream big and dare to fail.",
    author: "Norman Vincent Peale",
    category: "Dreams",
  },
  {
    text: "Hold fast to dreams, for if dreams die, life is a broken-winged bird that cannot fly.",
    author: "Langston Hughes",
    category: "Dreams",
  },
];

const CATEGORIES = [
  { label: "All", value: "All" },
  { label: "Motivation", value: "Motivation" },
  { label: "Success", value: "Success" },
  { label: "Happiness", value: "Happiness" },
  { label: "Confidence", value: "Confidence" },
  { label: "Goals", value: "Goals" },
  { label: "Dreams", value: "Dreams" },
  { label: "Other", value: "Other" },
];

export default function Home() {
  const [quoteIndex, setQuoteIndex] = useState(() =>
    Math.floor(Math.random() * QUOTES.length),
  );
  const [category, setCategory] = useState("Motivation");
  const [isAnimating, setIsAnimating] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [apiQuotes, setApiQuotes] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [editForm, setEditForm] = useState({
    text: "",
    author: "",
    category: "",
  });

  const {
    quotes,
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    updateQuote,
    deleteQuote,
  } = useQuotes();

  const allQuotes = [...QUOTES, ...apiQuotes, ...quotes];

  const filteredQuotes = useMemo(() => {
    return allQuotes.filter((quote) => {
      const matchesCategory = category === "All" || quote.category === category;

      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        search === "" ||
        quote.text.toLowerCase().includes(search) ||
        quote.author.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [allQuotes, category, searchTerm]);

  const currentQuote = filteredQuotes[quoteIndex];

  useEffect(() => {
    async function fetchQuotes() {
      setApiLoading(true);
      setApiError("");

      try {
        const response = await fetch("https://dummyjson.com/quotes?limit=30");

        if (!response.ok) {
          throw new Error("Failed to fetch quotes.");
        }

        const data = await response.json();

        function getCategory(quoteText) {
          const text = quoteText.toLowerCase();

          if (
            text.includes("happy") ||
            text.includes("happiness") ||
            text.includes("joy") ||
            text.includes("joyful") ||
            text.includes("enjoy") ||
            text.includes("smile")
          ) {
            return "Happiness";
          }

          if (
            text.includes("goal") ||
            text.includes("goals") ||
            text.includes("achieve") ||
            text.includes("achievement") ||
            text.includes("success") ||
            text.includes("succeed")
          ) {
            return "Goals";
          }

          if (
            text.includes("dream") ||
            text.includes("dreams") ||
            text.includes("vision") ||
            text.includes("imagine")
          ) {
            return "Dreams";
          }

          if (
            text.includes("confidence") ||
            text.includes("confident") ||
            text.includes("believe in yourself") ||
            text.includes("believe you can") ||
            text.includes("courage") ||
            text.includes("brave")
          ) {
            return "Confidence";
          }

          if (
            text.includes("success") ||
            text.includes("successful") ||
            text.includes("winning") ||
            text.includes("victory") ||
            text.includes("failure") ||
            text.includes("work hard")
          ) {
            return "Success";
          }

          if (
            text.includes("try") ||
            text.includes("effort") ||
            text.includes("work") ||
            text.includes("start") ||
            text.includes("begin") ||
            text.includes("action") ||
            text.includes("keep going") ||
            text.includes("never give up")
          ) {
            return "Motivation";
          }

          return "Other";
        }

        const fetchedQuotes = data.quotes.map((quote) => ({
          id: `api-${quote.id}`,
          text: quote.quote,
          author: quote.author,
          category: getCategory(quote.quote),
        }));

        setApiQuotes(fetchedQuotes);
      } catch (error) {
        console.error("API Error:", error);
        setApiError("Unable to load quotes from the API.");
      } finally {
        setApiLoading(false);
      }
    }

    fetchQuotes();
  }, []);

  function nextQuote() {
    if (filteredQuotes.length === 0) {
      return;
    }

    setIsAnimating(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      setQuoteIndex(randomIndex);
      setIsAnimating(false);
    }, 260);
  }

  function toggleFavorite() {
    if (isFavorite(currentQuote)) {
      removeFavorite(currentQuote);
    } else {
      addFavorite(currentQuote);
    }
  }

  function startEditing(quote) {
    setEditingQuote(quote);

    setEditForm({
      text: quote.text,
      author: quote.author,
      category: quote.category,
    });
  }

  function saveEditedQuote() {
    if (!editingQuote) {
      return;
    }

    const updatedQuote = {
      ...editingQuote,
      text: editForm.text.trim(),
      author: editForm.author.trim(),
      category: editForm.category,
    };

    updateQuote(updatedQuote);
    setEditingQuote(null);
  }

  function cancelEditing() {
    setEditingQuote(null);
  }

  const selectedCategoryLabel =
    category === "Motivation"
      ? "✨ Motivation"
      : (CATEGORIES.find((c) => c.value === category)?.label ??
        "✨ Motivation");

  const currentIsFavorite = currentQuote ? isFavorite(currentQuote) : false;

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
            <a
              href="#"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: "var(--color-primary)",
                backgroundColor: "var(--color-secondary)",
              }}
            >
              Home
            </a>

            <a
              href="#favorites"
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
              Favorites
            </a>

            <a
              href="/add-quote"
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
            </a>

            {/* Your Quotes */}
            <a
              href="#your-quotes"
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
            </a>

            {/* About */}
            <a
              href="/about"
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
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 pb-10">
        {/* Hero */}
        <section className="pt-8 pb-6 text-center">
          <h1
            className="text-5xl leading-tight mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-foreground)",
            }}
          >
            Your Daily Dose of{" "}
            <span style={{ color: "var(--color-primary)" }}>Inspiration</span>
          </h1>

          <p
            className="text-lg max-w-md mx-auto"
            style={{
              color: "var(--color-muted-foreground)",
              fontWeight: 300,
            }}
          >
            Discover a thought that can change your day.
          </p>
        </section>

        {/* Category selector */}
        <div className="flex flex-col items-center mb-5 gap-2">
          <label
            className="text-sm font-medium tracking-wide"
            style={{
              color: "var(--color-muted-foreground)",
            }}
          >
            Category
          </label>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full border text-sm font-medium transition-all"
              style={{
                backgroundColor: "var(--color-card)",
                borderColor: dropdownOpen
                  ? "var(--color-primary)"
                  : "var(--color-border)",
                color: "var(--color-foreground)",
                boxShadow: dropdownOpen
                  ? "0 0 0 3px rgba(91,71,214,0.12)"
                  : "0 1px 3px rgba(0,0,0,0.06)",
                minWidth: 180,
              }}
            >
              <span className="flex-1 text-left">{selectedCategoryLabel}</span>

              <svg
                className="w-4 h-4 transition-transform"
                style={{
                  color: "var(--color-muted-foreground)",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full mt-2 left-0 right-0 rounded-xl border overflow-hidden z-10"
                style={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-border)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
                  minWidth: 200,
                }}
              >
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      setCategory(cat.value);
                      setQuoteIndex(0);
                      setSearchTerm("");
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm transition-colors"
                    style={{
                      color:
                        category === cat.value
                          ? "var(--color-primary)"
                          : "var(--color-foreground)",
                      backgroundColor:
                        category === cat.value
                          ? "var(--color-secondary)"
                          : "transparent",
                      fontWeight: category === cat.value ? 500 : 400,
                    }}
                    onMouseEnter={(e) => {
                      if (category !== cat.value) {
                        e.currentTarget.style.backgroundColor =
                          "var(--color-muted)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (category !== cat.value) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-5">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setQuoteIndex(0);
              }}
              placeholder="Search quotes or authors..."
              className="w-full rounded-xl border px-4 py-3 pr-10 text-sm outline-none transition-all"
              style={{
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-border)",
                color: "var(--color-foreground)",
              }}
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setQuoteIndex(0);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
                style={{
                  color: "var(--color-muted-foreground)",
                }}
                title="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* API status */}
        {apiLoading && (
          <p
            className="text-sm text-center mb-4"
            style={{
              color: "var(--color-muted-foreground)",
            }}
          >
            Loading additional quotes...
          </p>
        )}

        {apiError && (
          <p
            className="text-sm text-center mb-4"
            style={{
              color: "#d67373",
            }}
          >
            {apiError}
          </p>
        )}

        {/* Quote card */}
        <div className="flex justify-center">
          {currentQuote ? (
            <div
              className="w-full rounded-2xl border transition-all duration-300"
              style={{
                maxWidth: 700,
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-border)",
                boxShadow:
                  "0 4px 32px rgba(91,71,214,0.07), 0 1px 4px rgba(0,0,0,0.04)",
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? "translateY(6px)" : "translateY(0)",
              }}
            >
              {/* Decorative top bar */}
              <div
                className="h-1 w-full rounded-t-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-primary) 0%, var(--color-accent) 100%)",
                }}
              />

              <div className="px-12 pt-7 pb-7">
                {/* Large quote mark */}
                <div
                  className="text-7xl leading-none mb-1 select-none"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-secondary)",
                    lineHeight: 0.85,
                  }}
                >
                  "
                </div>

                {/* Quote text */}
                <blockquote
                  className="text-2xl leading-relaxed mb-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--color-card-foreground)",
                    fontStyle: "italic",
                  }}
                >
                  {currentQuote.text}
                </blockquote>

                {/* Author + category row */}
                <div className="flex items-center justify-between">
                  <div>
                    <p
                      className="text-sm font-semibold tracking-wide mb-1"
                      style={{
                        color: "var(--color-foreground)",
                      }}
                    >
                      — {currentQuote.author}
                    </p>

                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: "var(--color-secondary)",
                        color: "var(--color-primary)",
                      }}
                    >
                      {currentQuote.category}
                    </span>
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={toggleFavorite}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition-all"
                    style={{
                      borderColor: currentIsFavorite
                        ? "var(--color-accent)"
                        : "var(--color-border)",
                      color: currentIsFavorite
                        ? "var(--color-accent)"
                        : "var(--color-muted-foreground)",
                      backgroundColor: currentIsFavorite
                        ? "#fef9ec"
                        : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (!currentIsFavorite) {
                        e.currentTarget.style.borderColor =
                          "var(--color-accent)";
                        e.currentTarget.style.color = "var(--color-accent)";
                        e.currentTarget.style.backgroundColor = "#fef9ec";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!currentIsFavorite) {
                        e.currentTarget.style.borderColor =
                          "var(--color-border)";
                        e.currentTarget.style.color =
                          "var(--color-muted-foreground)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <span style={{ fontSize: 16 }}>
                      {currentIsFavorite ? "♥" : "♡"}
                    </span>

                    {currentIsFavorite
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="w-full rounded-2xl border text-center py-12"
              style={{
                maxWidth: 700,
                backgroundColor: "var(--color-card)",
                borderColor: "var(--color-border)",
                color: "var(--color-muted-foreground)",
              }}
            >
              {apiLoading
                ? "Loading quotes..."
                : searchTerm
                  ? "No quotes found for your search."
                  : "No quotes available in this category."}
            </div>
          )}
        </div>

        {/* New Quote button */}
        <div className="flex justify-center mt-5">
          <button
            onClick={nextQuote}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-2xl text-base font-semibold transition-all active:scale-95"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-primary-foreground)",
              boxShadow: "0 4px 16px rgba(91,71,214,0.30)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#4a38c4";

              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(91,71,214,0.40)";

              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--color-primary)";

              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(91,71,214,0.30)";

              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span>✨</span>
            New Quote
          </button>
        </div>

        {/* Favorites section */}
        <section id="favorites" className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-2xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-foreground)",
              }}
            >
              Your Favorites
            </h2>

            <div className="flex items-center gap-3">
              {favorites.length > 0 && (
                <span
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{
                    backgroundColor: "var(--color-secondary)",
                    color: "var(--color-primary)",
                  }}
                >
                  {favorites.length} saved
                </span>
              )}

              <a
                href="/favorites"
                className="text-sm font-medium px-4 py-2 rounded-lg transition-all"
                style={{
                  color: "var(--color-primary)",
                  backgroundColor: "var(--color-secondary)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-primary)";
                  e.currentTarget.style.color =
                    "var(--color-primary-foreground)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-secondary)";
                  e.currentTarget.style.color = "var(--color-primary)";
                }}
              >
                View All Favorites →
              </a>
            </div>
          </div>

          {favorites.length === 0 ? (
            <div
              className="text-center py-16 rounded-2xl border"
              style={{
                borderColor: "var(--color-border)",
                borderStyle: "dashed",
                color: "var(--color-muted-foreground)",
              }}
            >
              <p className="text-3xl mb-3">♡</p>

              <p className="text-sm">Your favorites will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {favorites.slice(0, 4).map((fav) => (
                <div
                  key={fav.text}
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
                  {/* Left accent */}
                  <div
                    className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      opacity: 0.35,
                    }}
                  />

                  <div className="pl-4">
                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{
                        color: "var(--color-card-foreground)",
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                      }}
                    >
                      "{fav.text}"
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className="text-xs font-semibold"
                          style={{
                            color: "var(--color-foreground)",
                          }}
                        >
                          — {fav.author}
                        </p>

                        <span
                          className="inline-flex mt-1 text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: "var(--color-muted)",
                            color: "var(--color-muted-foreground)",
                          }}
                        >
                          {fav.category}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFavorite(fav)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                        style={{ color: "#d67373" }}
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 011 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Your Quotes section */}
        <section id="your-quotes" className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="text-2xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-foreground)",
                }}
              >
                Your Quotes
              </h2>

              <p
                className="text-sm mt-1"
                style={{
                  color: "var(--color-muted-foreground)",
                }}
              >
                Quotes you have added to the collection.
              </p>
            </div>

            {quotes.length > 0 && (
              <span
                className="text-xs font-medium px-3 py-1.5 rounded-full"
                style={{
                  backgroundColor: "var(--color-secondary)",
                  color: "var(--color-primary)",
                }}
              >
                {quotes.length} {quotes.length === 1 ? "quote" : "quotes"}
              </span>
            )}
          </div>

          {quotes.length === 0 ? (
            <div
              className="text-center py-16 rounded-2xl border"
              style={{
                borderColor: "var(--color-border)",
                borderStyle: "dashed",
                color: "var(--color-muted-foreground)",
              }}
            >
              <p className="text-3xl mb-3">✦</p>

              <p className="text-sm">Your added quotes will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {quotes.map((quote) => (
                <div
                  key={quote.id}
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
                  {/* Left accent */}
                  <div
                    className="absolute left-0 top-6 bottom-6 w-0.5 rounded-full"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      opacity: 0.35,
                    }}
                  />

                  <div className="pl-4">
                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{
                        color: "var(--color-card-foreground)",
                        fontFamily: "var(--font-display)",
                        fontStyle: "italic",
                      }}
                    >
                      {editingQuote?.id === quote.id ? (
                        <div className="space-y-4">
                          {/* Quote text */}
                          <div>
                            <label
                              className="block text-xs font-medium mb-1.5"
                              style={{ color: "var(--color-muted-foreground)" }}
                            >
                              Quote
                            </label>

                            <textarea
                              value={editForm.text}
                              onChange={(e) =>
                                setEditForm((prev) => ({
                                  ...prev,
                                  text: e.target.value,
                                }))
                              }
                              rows={4}
                              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none resize-none"
                              style={{
                                backgroundColor: "var(--color-background)",
                                borderColor: "var(--color-border)",
                                color: "var(--color-foreground)",
                              }}
                            />
                          </div>

                          {/* Author */}
                          <div>
                            <label
                              className="block text-xs font-medium mb-1.5"
                              style={{ color: "var(--color-muted-foreground)" }}
                            >
                              Author
                            </label>

                            <input
                              type="text"
                              value={editForm.author}
                              onChange={(e) =>
                                setEditForm((prev) => ({
                                  ...prev,
                                  author: e.target.value,
                                }))
                              }
                              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
                              style={{
                                backgroundColor: "var(--color-background)",
                                borderColor: "var(--color-border)",
                                color: "var(--color-foreground)",
                              }}
                            />
                          </div>

                          {/* Category */}
                          <div>
                            <label
                              className="block text-xs font-medium mb-1.5"
                              style={{ color: "var(--color-muted-foreground)" }}
                            >
                              Category
                            </label>

                            <select
                              value={editForm.category}
                              onChange={(e) =>
                                setEditForm((prev) => ({
                                  ...prev,
                                  category: e.target.value,
                                }))
                              }
                              className="w-full rounded-xl border px-3 py-2.5 text-sm outline-none"
                              style={{
                                backgroundColor: "var(--color-background)",
                                borderColor: "var(--color-border)",
                                color: "var(--color-foreground)",
                              }}
                            >
                              {CATEGORIES.filter(
                                (cat) => cat.value !== "All",
                              ).map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                  {cat.label}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Actions */}
                          <div className="flex justify-end gap-2 pt-1">
                            <button
                              type="button"
                              onClick={cancelEditing}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                              style={{
                                color: "var(--color-muted-foreground)",
                                backgroundColor: "var(--color-muted)",
                              }}
                            >
                              Cancel
                            </button>

                            <button
                              type="button"
                              onClick={saveEditedQuote}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                              style={{
                                color: "var(--color-primary-foreground)",
                                backgroundColor: "var(--color-primary)",
                              }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>"{quote.text}"</div>
                      )}
                    </p>

                    <div className="flex items-center justify-between">
                      <div>
                        <p
                          className="text-xs font-semibold"
                          style={{
                            color: "var(--color-foreground)",
                          }}
                        >
                          — {quote.author}
                        </p>

                        <span
                          className="inline-flex mt-1 text-xs px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: "var(--color-muted)",
                            color: "var(--color-muted-foreground)",
                          }}
                        >
                          {quote.category}
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1">
                        {/* Edit button */}
                        <button
                          type="button"
                          onClick={() => startEditing(quote)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                          style={{ color: "var(--color-primary)" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#f3efff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }}
                          title="Edit quote"
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
                              d="M15.232 5.232l3.536 3.536M4 20h4l10.5-10.5a2.121 2.121 0 00-3-3L5 17v3z"
                            />
                          </svg>
                        </button>

                        {/* Delete button */}
                        <button
                          type="button"
                          onClick={() => deleteQuote(quote.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                          style={{ color: "#d67373" }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#fff0f0";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                          }}
                          title="Delete quote"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 011 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
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
