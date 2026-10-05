# Inspire — Inspirational Quote Generator

A React-based web application that allows users to discover, search, filter, save, and manage inspirational quotes.

The project was developed as part of the **Advanced Web Technology Phase-II** coursework and demonstrates React Hooks, routing, forms and validation, API integration, CRUD operations, search and filtering, error handling, responsive design, and performance optimization.

## Features

* ✨ **Random Quote Generator** — Generate a new random quote.
* 📂 **Category Filtering** — Browse quotes by Motivation, Success, Happiness, Confidence, Goals, Dreams, and Other.
* 🔎 **Search** — Search quotes by quote text or author.
* ❤️ **Favorites** — Add or remove quotes from your favorites.
* ➕ **Add Quotes** — Create your own quotes with form validation.
* ✏️ **Edit Quotes** — Update user-created quotes.
* 🗑️ **Delete Quotes** — Remove user-created quotes.
* 🌐 **API Integration** — Fetches additional quotes from the DummyJSON Quotes API.
* ⚠️ **Error Handling** — Handles API failures, loading states, empty categories, and unsuccessful searches.
* 🧭 **Routing** — Separate pages for Home, Favorites, Add Quote, and About.
* 📱 **Responsive Design** — Designed to work across different screen sizes.
* ⚡ **Performance Optimization** — Uses React `useMemo` to optimize quote filtering.
* 💾 **Local Data Management** — User-created quotes and favorites are managed through React Context.

## Technologies Used

* **React**
* **JavaScript**
* **React Hooks**
* **React Router**
* **Context API**
* **Tailwind CSS**
* **REST API**
* **Vite**
* **Git & GitHub**

## API

The application uses the **DummyJSON Quotes API** to retrieve additional inspirational quotes:

`https://dummyjson.com/quotes?limit=30`

The API provides quote text and author information. Since the API does not provide quote categories, API quotes are categorized on the client side using keyword-based content matching. Quotes that do not match the predefined categories are placed under **Other**.

## Project Structure

```text
Inspirational-Quote-Generator/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── context/
│   │   └── QuoteContext.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Favorites.jsx
│   │   ├── AddQuote.jsx
│   │   └── About.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ananyathakur23/Inspirational-Quote-Generator.git
```

### 2. Navigate to the project directory

```bash
cd Inspirational-Quote-Generator
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Phase-I Requirements Covered

| Requirement | Implementation |
|---|---|
| Problem Identification | Developed an inspirational quote generator to help users discover and manage motivational content. |
| Requirement Analysis | Identified requirements for quote generation, categorization, search, favorites, user-created quotes, and responsive access. |
| Use Case Identification | Users can browse, search, filter, generate, favorite, add, edit, and delete quotes. |
| Wireframe / UI Design | Designed the application interface with a structured navigation bar, quote cards, category filters, forms, and responsive layouts. |
| Project Folder Structure | Organized the project into pages, context, assets, and application configuration files. |
| React Project Setup | Created the project using React and Vite. |
| Component Creation | Implemented separate pages and reusable React components for different application features. |
| JSX Implementation | Built the application interface using JSX and React components. |
| Props | Used React component properties where required to pass data and functionality between components. |
| State Management (`useState`) | Used `useState` for quote state, search, category selection, form data, loading states, errors, and UI interactions. |
| Event Handling | Implemented click, change, submit, mouse enter, and mouse leave event handlers. |
| Conditional Rendering | Used conditional rendering for loading states, API errors, search results, favorites, forms, and empty states. |
| Lists and Keys | Used `.map()` with unique keys to render quote collections and navigation/category elements. |
| Responsive User Interface | Created a responsive interface that adapts to different screen sizes. |

## Phase-II Requirements Covered

| Requirement | Implementation |
|---|---|
| React Hooks | `useState`, `useEffect`, `useMemo`, `useContext` |
| Routing | React Router |
| Forms and Validation | Add Quote form with validation |
| API Integration | DummyJSON Quotes API |
| CRUD Operations | Add, edit, and delete user-created quotes |
| Search and Filter | Text/author search and category filtering |
| Error Handling | API errors, loading states, and empty results |
| Responsive Design | Responsive layouts using Tailwind CSS |
| Performance Optimization | `useMemo` for filtering |
| Project Testing | Manual functional testing |
| Deployment | Can be deployed using GitHub Pages, Vercel, or Netlify |

## Future Improvements

* Add more quote APIs or data sources.
* Add user authentication.
* Store user-created quotes and favorites in a database.
* Add automated testing.
* Add social sharing for individual quotes.
* Improve quote categorization using a dedicated classification system.

## Author

**Ananya Amar Thakur**