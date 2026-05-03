import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import ProductCard from "./components/ProductCard";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import type { Product } from "./data/products";
import { products, categories } from "./data/products";

function HomePage({
  cart,
  addToCart,
  wishlist,
  toggleWishlist,
  cartOpen,
  setCartOpen,
  updateQty,
  removeFromCart,
  searchQuery,
  setSearchQuery,
}: {
  cart: (Product & { qty: number })[];
  addToCart: (product: Product) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  updateQty: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const navigate = useNavigate();

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  let filtered = products.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );
  if (searchQuery.trim()) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );
  }
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "price_low") return a.price - b.price;
    if (sortBy === "price_high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "newest") return b.id - a.id;
    return b.reviews - a.reviews;
  });

  return (
    <>
      <Header
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onSearch={setSearchQuery}
      />
      <HeroBanner />

      <section className="max-w-[1400px] mx-auto px-10 pt-11">
        <h2 className="text-[26px] font-semibold tracking-[3px] uppercase text-[#0c1f3f] mb-7">
          <span className="text-[#c8102e]">FILA</span> PRODUCTS
        </h2>
        <div className="flex gap-2.5 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              className={`px-6 py-2.5 text-[13px] font-semibold border-2 transition-all duration-200 ${
                activeCategory === c.id
                  ? "bg-[#0c1f3f] text-white border-[#0c1f3f]"
                  : "bg-white text-gray-900 border-gray-200 hover:border-[#0c1f3f] hover:text-[#0c1f3f]"
              }`}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-10 py-5">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200">
          <span className="text-[13px] text-gray-500">
            총 <strong className="text-[#0c1f3f]">{filtered.length}</strong>개
            상품
          </span>
          <select
            className="px-3.5 py-1.5 border border-gray-200 bg-white text-[13px] outline-none cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="popular">인기순</option>
            <option value="newest">신상품순</option>
            <option value="price_low">낮은 가격순</option>
            <option value="price_high">높은 가격순</option>
            <option value="rating">평점순</option>
          </select>
        </div>
      </div>

      <section className="max-w-[1400px] mx-auto px-10 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <ProductCard
                product={product}
                isWished={wishlist.includes(product.id)}
                onAddToCart={addToCart}
                onToggleWish={toggleWishlist}
              />
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center py-20 text-gray-400">
            검색 결과가 없습니다.
          </p>
        )}
      </section>

      <Footer />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
      />
    </>
  );
}

function DetailPage({
  cart,
  addToCart,
  cartOpen,
  setCartOpen,
  updateQty,
  removeFromCart,
  setSearchQuery,
}: {
  cart: (Product & { qty: number })[];
  addToCart: (product: Product) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  updateQty: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <>
      <Header
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onSearch={setSearchQuery}
      />
      <ProductDetail onAddToCart={addToCart} />
      <Footer />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
      />
    </>
  );
}

function LoginPage({
  cart,
  cartOpen,
  setCartOpen,
  updateQty,
  removeFromCart,
  setSearchQuery,
}: {
  cart: (Product & { qty: number })[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  updateQty: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}) {
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  return (
    <>
      <Header
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onSearch={setSearchQuery}
      />
      <Login />
      <Footer />
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateQty}
        onRemove={removeFromCart}
      />
    </>
  );
}

function App() {
  const [cart, setCart] = useState<(Product & { qty: number })[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const newQty = i.qty + delta;
        return newQty > 0 ? { ...i, qty: newQty } : i;
      })
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <BrowserRouter basename="/filashop">
      <div className="min-h-screen bg-white">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                cart={cart}
                addToCart={addToCart}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                updateQty={updateQty}
                removeFromCart={removeFromCart}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <DetailPage
                cart={cart}
                addToCart={addToCart}
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                updateQty={updateQty}
                removeFromCart={removeFromCart}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                cart={cart}
                cartOpen={cartOpen}
                setCartOpen={setCartOpen}
                updateQty={updateQty}
                removeFromCart={removeFromCart}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;