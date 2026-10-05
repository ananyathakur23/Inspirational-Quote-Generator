import { createContext, useContext, useEffect, useState } from "react";

const QuoteContext = createContext();

const INITIAL_FAVORITES = [
  {
    text: "The future depends on what you do today.",
    author: "Mahatma Gandhi",
    category: "Motivation",
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis",
    category: "Goals",
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
    category: "Motivation",
  },
];

export function QuoteProvider({ children }) {
  const [quotes, setQuotes] = useState(() => {
    try {
      const savedQuotes = localStorage.getItem("inspireCustomQuotes");

      return savedQuotes ? JSON.parse(savedQuotes) : [];
    } catch (error) {
      console.error("Failed to load custom quotes:", error);
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem("inspireFavorites");

      return savedFavorites ? JSON.parse(savedFavorites) : INITIAL_FAVORITES;
    } catch (error) {
      console.error("Failed to load favorites:", error);
      return INITIAL_FAVORITES;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("inspireFavorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites:", error);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem("inspireCustomQuotes", JSON.stringify(quotes));
    } catch (error) {
      console.error("Failed to save custom quotes:", error);
    }
  }, [quotes]);

  function addQuote(quote) {
    const alreadyExists = quotes.some(
      (existingQuote) =>
        existingQuote.text === quote.text &&
        existingQuote.author === quote.author,
    );

    if (alreadyExists) {
      return "duplicate";
    }

    setQuotes((prev) => [quote, ...prev]);

    return "added";
  }

  function updateQuote(updatedQuote) {
    setQuotes((prev) =>
      prev.map((quote) =>
        quote.id === updatedQuote.id ? updatedQuote : quote,
      ),
    );
  }

  function deleteQuote(id) {
    setQuotes((prev) => prev.filter((quote) => quote.id !== id));
  }

  function addFavorite(quote) {
    setFavorites((prev) => {
      const alreadyExists = prev.some(
        (favorite) =>
          favorite.text === quote.text && favorite.author === quote.author,
      );

      if (alreadyExists) {
        return prev;
      }

      return [quote, ...prev];
    });
  }

  function removeFavorite(quote) {
    setFavorites((prev) =>
      prev.filter(
        (favorite) =>
          !(favorite.text === quote.text && favorite.author === quote.author),
      ),
    );
  }

  function isFavorite(quote) {
    return favorites.some(
      (favorite) =>
        favorite.text === quote.text && favorite.author === quote.author,
    );
  }

  return (
    <QuoteContext.Provider
      value={{
        quotes,
        addQuote,
        updateQuote,
        deleteQuote,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuotes() {
  return useContext(QuoteContext);
}
