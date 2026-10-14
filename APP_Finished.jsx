import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Produce");
  const [items, setItems] = useState([
    { id: 1, name: "Apples", price: 2.99, category: "Produce" }
  ]);

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

  const totalPrice = items.reduce((total, item) => {
    return total + item.price;
  }, 0);

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

            <p className="mt-4 rounded bg-green-50 p-3">
              {items.length} items · Total: ${totalPrice.toFixed(2)}
            </p>

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

            <ul className="mt-5 space-y-2">
              {items.map(item => (
                <li key={item.id} className="rounded border p-3">
                  {item.name} - ${item.price.toFixed(2)} ({item.category})
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
