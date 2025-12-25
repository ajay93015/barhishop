"use client";
import { useState } from "react";
const products = [
  {
    id: "p1",
    name: "Gulab Jamun",
    price: "₹200/kg",
    cat: "gulab jamun",
    shop: "Barhi Sweet House",
    img: "https://thumbs.dreamstime.com/b/indian-sweets-gulab-jamun-14186405.jpg?w=360",
    meta: "gulab jamun rasgulla barhi sweets"
  },
  {
    id: "p2",
    name: "Chocolate Barfi",
    price: "₹300/kg",
    cat: "chocolate",
    shop: "Barhi Sweet House",
    img: "https://bakewithshivesh.com/wp-content/uploads/2022/10/IMG-0624-1229x1536.jpg",
    meta: "chocolate barfi mithai barhi"
  }
];


export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [modal, setModal] = useState(null);

  const filteredProducts = products.filter(p => {
    const matchCat = category === "all" || p.cat === category;
    const matchText =
      p.name.toLowerCase().includes(query) ||
      p.meta.includes(query);
    return matchCat && matchText;
  });

  return (
    <main className="bg-gray-50 text-gray-800">

      {/* HERO */}
      <section className="bg-orange-500 text-white py-16 text-center">
        <h1 className="text-4xl font-bold">
          Find <span className="underline">local stores</span> that deliver
        </h1>
        <p className="mt-3 opacity-90">
          Fresh Cookies, Gulab Jamun, Grocery, Medicine & more
        </p>

        {/* SEARCH */}
        <div className="mt-6 flex justify-center gap-2">
          <input
            className="px-4 py-2 rounded text-black w-64"
            placeholder="Search products or stores"
            onChange={e => setQuery(e.target.value.toLowerCase())}
          />
          <button className="bg-black px-4 py-2 rounded">
            Search
          </button>
        </div>

        {/* CATEGORIES */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {["all","gulab jamun","chocolate","sweets"].map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full text-sm ${
                category === c ? "bg-black" : "bg-white text-black"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Products & Items</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {filteredProducts.map(p => (
            <div key={p.id} className="bg-white rounded-xl shadow">
              <div
                className="h-40 rounded-t-xl"
                style={{
                  background: `url(${p.img}) center/cover`
                }}
              />
              <div className="p-4">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-500">{p.shop}</p>
                <span className="text-orange-600 font-bold">
                  {p.price}
                </span>

                <div className="flex gap-2 mt-3">
                  <button className="bg-orange-500 text-white px-3 py-1 rounded">
                    🛒 Add
                  </button>
                  <button
                    onClick={() => setModal(p)}
                    className="border px-3 py-1 rounded"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}

          {!filteredProducts.length && (
            <p className="text-gray-500">No items found</p>
          )}
        </div>
      </section>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80">
            <h3 className="font-bold">{modal.name}</h3>
            <p className="text-sm text-gray-600">{modal.shop}</p>

            <div className="flex gap-2 mt-4">
              <a className="bg-orange-500 text-white px-3 py-1 rounded" href="#">
                Call
              </a>
              <a className="border px-3 py-1 rounded" href="#">
                WhatsApp
              </a>
            </div>

            <button
              onClick={() => setModal(null)}
              className="mt-4 text-sm text-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </main>
  );
}
