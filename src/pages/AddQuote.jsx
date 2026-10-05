import { useState } from "react";
import { useQuotes } from "../context/QuoteContext";

const CATEGORIES = [
  "Motivation",
  "Success",
  "Happiness",
  "Confidence",
  "Goals",
  "Dreams",
];

export default function AddQuote() {
  const { addQuote } = useQuotes();

  const [formData, setFormData] = useState({
    text: "",
    author: "",
    category: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove the error for the field while the user is correcting it
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccessMessage("");
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.text.trim()) {
      newErrors.text = "Please enter a quote.";
    } else if (formData.text.trim().length < 10) {
      newErrors.text = "Quote must be at least 10 characters long.";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Please enter the author's name.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newQuote = {
      id: Date.now(),
      text: formData.text.trim(),
      author: formData.author.trim(),
      category: formData.category,
    };

    const result = addQuote(newQuote);

    if (result === "duplicate") {
      setWarningMessage("This quote has already been added.");
      setSuccessMessage("");
      return;
    }

    setSuccessMessage("Quote added successfully!");
    setWarningMessage("");

    setFormData({
      text: "",
      author: "",
      category: "",
    });

    setErrors({});
  }

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: "var(--color-background)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Header */}
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
            {/* Home */}
            <a
              href="/"
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
            </a>

            {/* Favorites */}
            <a
              href="/#favorites"
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

            {/* Add Quote */}
            <a
              href="/add-quote"
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: "var(--color-primary)",
                backgroundColor: "var(--color-secondary)",
              }}
            >
              Add Quote
            </a>

            {/* Your Quotes */}
            <a
              href="/#your-quotes"
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

      {/* Main */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div
          className="rounded-2xl border p-8"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
          }}
        >
          <div className="mb-8">
            <h2
              className="text-3xl mb-2"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-foreground)",
              }}
            >
              Share Some Inspiration
            </h2>

            <p
              className="text-sm"
              style={{
                color: "var(--color-muted-foreground)",
              }}
            >
              Add your own inspirational quote to the collection.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Quote */}
            <div className="mb-6">
              <label
                htmlFor="text"
                className="block text-sm font-medium mb-2"
                style={{
                  color: "var(--color-foreground)",
                }}
              >
                Quote
              </label>

              <textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                placeholder="Enter an inspirational quote..."
                rows="5"
                maxLength="300"
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all resize-none"
                style={{
                  backgroundColor: "var(--color-background)",
                  borderColor: errors.text ? "#d67373" : "var(--color-border)",
                  color: "var(--color-foreground)",
                }}
              />

              <div className="flex justify-between mt-1">
                {errors.text ? (
                  <p className="text-xs" style={{ color: "#d67373" }}>
                    {errors.text}
                  </p>
                ) : (
                  <span />
                )}

                <span
                  className="text-xs"
                  style={{
                    color: "var(--color-muted-foreground)",
                  }}
                >
                  {formData.text.length}/300
                </span>
              </div>
            </div>

            {/* Author */}
            <div className="mb-6">
              <label
                htmlFor="author"
                className="block text-sm font-medium mb-2"
                style={{
                  color: "var(--color-foreground)",
                }}
              >
                Author
              </label>

              <input
                id="author"
                name="author"
                type="text"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author's name"
                maxLength="100"
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                style={{
                  backgroundColor: "var(--color-background)",
                  borderColor: errors.author
                    ? "#d67373"
                    : "var(--color-border)",
                  color: "var(--color-foreground)",
                }}
              />

              {errors.author && (
                <p className="text-xs mt-1" style={{ color: "#d67373" }}>
                  {errors.author}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="mb-8">
              <label
                htmlFor="category"
                className="block text-sm font-medium mb-2"
                style={{
                  color: "var(--color-foreground)",
                }}
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
                style={{
                  backgroundColor: "var(--color-background)",
                  borderColor: errors.category
                    ? "#d67373"
                    : "var(--color-border)",
                  color: formData.category
                    ? "var(--color-foreground)"
                    : "var(--color-muted-foreground)",
                }}
              >
                <option value="">Select a category</option>

                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {errors.category && (
                <p className="text-xs mt-1" style={{ color: "#d67373" }}>
                  {errors.category}
                </p>
              )}
            </div>

            {/* Success message */}
            {successMessage && (
              <div
                className="mb-6 rounded-xl px-4 py-3 text-sm"
                style={{
                  backgroundColor: "#eef8ee",
                  color: "#477047",
                }}
              >
                ✓ {successMessage}
              </div>
            )}

            {/* Warning message */}
            {warningMessage && (
              <p
                className="mt-4 text-sm"
                style={{
                  color: "#b45309",
                }}
              >
                ⚠️ {warningMessage}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "var(--color-primary-foreground)",
                boxShadow: "0 4px 16px rgba(91,71,214,0.25)",
              }}
            >
              Add Quote
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
