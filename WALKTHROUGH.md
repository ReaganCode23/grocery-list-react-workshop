# Web Dev I: build a grocery list

Follow the 14 slides in order. You will build a grocery list in one hour. Edit **only `src/App.jsx`**. The HTML page and Tailwind setup are ready. `APP_Finished.jsx` shows the completed app if you need to catch up.

The code blocks below match the finished app. Slides 4–5 explain files that are already complete. Add the later code to `src/App.jsx` in the order shown.

## Slide 1 — Web Dev I (1 minute)

Today you will build a grocery list on your computer. Save a change in React and watch the browser update. By the end, you can add an item and see the total change.

## Slide 2 — What are we building? (2 minutes)

Your app will have Home and Grocery List views. The list starts with Apples. You will enter an item name, price, and category, then see a running total. There is no database or login, so refreshing resets the list.

## Slide 3 — Folder and setup (4 minutes)

Open a terminal **inside the `lab-1` folder** and run:

```bash
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`. You should see “Grocery Helper 🛒”. `npm install` downloads the packages. `npm run dev` starts the website on your computer. Leave that terminal running. If it fails, check `node --version`; this project needs Node 20.19+ or 22.12+.

## Slide 4 — React, Vite, npm, Tailwind (2 minutes)

Open `package.json` and find these scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

React creates and updates the page. Vite runs it while you work. npm installs packages and runs these scripts. Tailwind supplies classes such as `bg-green-600` for a green background and `p-6` for padding. You will use these classes without setting up Tailwind yourself.

## Slide 5 — How the website starts (2 minutes)

Open `index.html` and find these lines:

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

The browser opens `index.html`. Then `main.jsx` finds `root` and puts `App` there. Leave these files alone today. Make your changes in `src/App.jsx`.

## Slide 6 — React component (3 minutes)

Open `src/App.jsx`. The starter is already a component:

```jsx
export default function App() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow">
        <h1 className="text-3xl font-bold text-green-700">
          Grocery Helper 🛒
        </h1>
        <p className="mt-2 text-slate-600">
          Let's build a grocery list.
        </p>
      </div>
    </main>
  );
}
```

`App` is a React component. `return` describes what appears on the page. The HTML-looking syntax is JSX. It uses `className` for CSS classes. Change the paragraph, save, watch the browser update, then undo the change.

## Slide 7 — React state (3 minutes)

Add this import at the top of `src/App.jsx`:

```jsx
import { useState } from "react";
```

Inside `App`, above `return`, add:

```jsx
const [page, setPage] = useState("home");
```

State remembers a value React can display. `page` holds the current value, `setPage` changes it, and `"home"` is the starting value. Nothing visible changes yet because the JSX does not use `page`. The next two slides connect it to buttons and visible content.

## Slide 8 — React buttons (5 minutes)

Replace the starter's entire `return (...)` with this. Keep the import, the `page` state, and the final `}` of `App`:

```jsx
return (
  <main className="min-h-screen bg-slate-100 p-6 text-slate-800">
    <div className="mx-auto max-w-xl">
      <nav className="mb-6 flex gap-2">
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={() => setPage("home")}
        >
          Home
        </button>
        <button
          className="rounded bg-green-600 px-4 py-2 text-white"
          onClick={() => setPage("list")}
        >
          Grocery List
        </button>
      </nav>

      <section className="rounded-xl bg-white p-6 shadow">
        <h1 className="text-3xl font-bold text-green-700">
          Grocery Helper 🛒
        </h1>
        <p className="mt-3 text-slate-600">
          Keep track of what you need and how much it costs.
        </p>
      </section>
    </div>
  </main>
);
```

`onClick` waits for a click. The arrow function runs `setPage` **when clicked**, not while rendering. Clicking still shows the same content; the page display has not been connected to state yet.

## Slide 9 — Showing different pages (6 minutes)

Replace the single `<section>...</section>` after `</nav>` with these two sections:

```jsx
{page === "home" && (
  <section className="rounded-xl bg-white p-6 shadow">
    <h1 className="text-3xl font-bold text-green-700">
      Grocery Helper 🛒
    </h1>
    <p className="mt-3 text-slate-600">
      Keep track of what you need and how much it costs.
    </p>
  </section>
)}

{page === "list" && (
  <section className="rounded-xl bg-white p-6 shadow">
    <h1 className="text-3xl font-bold text-green-700">
      Grocery List
    </h1>
  </section>
)}
```

`===` checks whether two values are equal. `&&` displays the following section only when that check is true. Test both buttons. These are two views inside one component, not separate HTML pages.

## Slide 10 — Storing grocery items (5 minutes)

Directly under the `page` state, add:

```jsx
const [itemName, setItemName] = useState("");
const [price, setPrice] = useState("");
const [category, setCategory] = useState("Produce");
const [items, setItems] = useState([
  { id: 1, name: "Apples", price: 2.99, category: "Produce" }
]);
```

The first three values will hold the form inputs. `items` is an array of grocery objects. Each object has an `id` for React, plus a name, numeric price, and category. Apples lets you see list rendering before you build the form.

## Slide 11 — Showing the items (4 minutes)

Inside the Grocery List `<section>`, after its `</h1>`, add:

```jsx
<ul className="mt-5 space-y-2">
  {items.map(item => (
    <li key={item.id} className="rounded border p-3">
      {item.name} - ${item.price.toFixed(2)} ({item.category})
    </li>
  ))}
</ul>
```

`map` makes one row for every item. `key` gives React a stable identifier for each row. Curly braces insert JavaScript values into JSX. `toFixed(2)` shows two decimal places. Test: the list view should show `Apples - $2.99 (Produce)`.

## Slide 12 — Adding items (7 minutes)

After all the state declarations and before `return`, add:

```jsx
function addItem(event) {
  event.preventDefault();

  const newItem = {
    id: items.length + 1,
    name: itemName,
    price: Number(price),
    category: category
  };

  setItems([...items, newItem]);
  setItemName("");
  setPrice("");
  setCategory("Produce");
}
```

`event.preventDefault()` stops the browser's normal form reload. `newItem` holds the form values. `Number(price)` converts the input text to a number so totals work. `...items` copies existing entries into a new array, then adds the new item. The final setters clear the form. The simple ID works here because this lab does not remove items. The function will run after we add the form.

## Slide 13 — Creating a form (8 minutes)

Inside the Grocery List `<section>`, put the form **above the `<ul>`**:

```jsx
<form onSubmit={addItem} className="mt-4 grid gap-3">
  <input
    className="rounded border p-2"
    aria-label="Item name"
    placeholder="Item name"
    value={itemName}
    onChange={event => setItemName(event.target.value)}
    required
  />
  <input
    className="rounded border p-2"
    aria-label="Price"
    type="number"
    min="0"
    step="0.01"
    placeholder="Price"
    value={price}
    onChange={event => setPrice(event.target.value)}
    required
  />
  <select
    className="rounded border p-2"
    aria-label="Category"
    value={category}
    onChange={event => setCategory(event.target.value)}
  >
    <option>Produce</option>
    <option>Dairy</option>
    <option>Pantry</option>
    <option>Other</option>
  </select>
  <button className="rounded bg-green-600 p-2 text-white">
    Add item
  </button>
</form>
```

`onSubmit` calls `addItem` when the button is pressed. `value` reads from state; `onChange` writes the latest typed value to state. `required` blocks empty name or price. `type="number"`, `min`, and `step` help enter prices. `aria-label` names the controls for screen readers. Add Milk for `3.49` in Dairy and check that the new row appears.

## Slide 14 — Displaying the total (5 minutes)

After `addItem` and before `return`, add:

```jsx
const totalPrice = items.reduce((total, item) => {
  return total + item.price;
}, 0);
```

`reduce` starts with `0`, visits each item, and adds its price. In the Grocery List `<section>`, place this paragraph **after `</h1>` and before `<form>`**:

```jsx
<p className="mt-4 rounded bg-green-50 p-3">
  {items.length} items · Total: ${totalPrice.toFixed(2)}
</p>
```

`items.length` counts the rows. With Apples and Milk, the summary should say `2 items · Total: $6.48`. Add a third item and predict the new total before you submit it.

## Final 1 minute — Your finished app

Typing changes form state. Submitting changes the `items` array. React redraws the list, count, and total. Refresh the page to see that this is temporary React state, with no database. Commit your `src/App.jsx` changes and push them to your own GitHub repository.

If you fall behind, copy `APP_Finished.jsx` into `src/App.jsx` to catch up. The answer key uses `.jsx` because this is a React/JavaScript project.
