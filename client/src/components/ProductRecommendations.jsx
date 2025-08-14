import { useState, useEffect } from "react";
import axios from "axios";

const ProductRecommendations = ({ onSelectProduct }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const fetchRecommendations = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/rag/recommendations?query=${query}&category=${category}&priceRange=${priceRange}`
      );
      const data = response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div>
      <div className="mb-6 flex space-x-4">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
        </select>
        <input
          type="number"
          placeholder="Max price"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="px-4 py-2 border rounded"
        />
        <button
          onClick={fetchRecommendations}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p className="my-2">{product.description}</p>
            <button
              onClick={() => onSelectProduct(product._id)}
              className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
            >
              Compare
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;
