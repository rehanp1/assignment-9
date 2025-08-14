import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductComparison = ({ productIds }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (productIds.length > 0) {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/rag/compare/${productIds.join(",")}`
          );
          const data = response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products for comparison:", error);
        }
      }
    };
    fetchProducts();
  }, [productIds]);

  if (products.length === 0) {
    return <div>Select products to compare from the recommendations</div>;
  }

  // Get all unique specification keys
  const allSpecs = new Set();
  products.forEach((product) => {
    Object.keys(product.specifications || {}).forEach((key) => {
      allSpecs.add(key);
    });
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Feature</th>
            {products.map((product) => (
              <th key={product._id} className="border px-4 py-2">
                {product.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-bold">Price</td>
            {products.map((product) => (
              <td key={`${product._id}-price`} className="border px-4 py-2">
                ${product.price}
              </td>
            ))}
          </tr>
          {Array.from(allSpecs).map((spec) => (
            <tr key={spec}>
              <td className="border px-4 py-2 font-bold capitalize">{spec}</td>
              {products.map((product) => (
                <td key={`${product._id}-${spec}`} className="border px-4 py-2">
                  {product.specifications?.[spec] || "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductComparison;
