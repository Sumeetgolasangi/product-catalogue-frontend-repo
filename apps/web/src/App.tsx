import { Link, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import CategoryRoute from "./pages/CategoryRoute";
import SearchRoute from "./pages/SearchRoute";
import ProductDetail from "./pages/ProductDetail";
import "./styles.css";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:name" element={<CategoryRoute />} />
        <Route path="/search" element={<SearchRoute />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route
          path="*"
          element={
            <main className="section">
              <h1>Page not found</h1>
              <Link to="/">Return home</Link>
            </main>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
