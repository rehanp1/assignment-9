import React, { useState } from "react";
import ProductRecommendations from "./components/ProductRecommendations";
import ProductComparison from "./components/ProductComparison";

function App() {
  const [view, setView] = useState("recommendations");
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex mb-8">
        <button
          onClick={() => setView("recommendations")}
          className="mr-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Recommendations
        </button>
        <button
          onClick={() => setView("comparison")}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Compare Products
        </button>
      </div>

      {view === "recommendations" ? (
        <ProductRecommendations
          onSelectProduct={(id) =>
            setSelectedProducts([...selectedProducts, id])
          }
        />
      ) : (
        <ProductComparison productIds={selectedProducts} />
      )}
    </div>
  );
}

export default App;
