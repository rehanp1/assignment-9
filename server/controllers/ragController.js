const Product = require('../models/productModel');
const { semanticSearch } = require('../services/vectorDBService');

exports.getRecommendations = async (req, res) => {
  try {
    const { category, priceRange, query } = req.query;
    
    let searchQuery = query || '';
    if (category) searchQuery += ` ${category}`;
    if (priceRange) searchQuery += ` under $${priceRange}`;
    
    const results = await semanticSearch(searchQuery, 5);
    const productIds = results.map(r => r.metadata.productId);
    
    const products = await Product.find({ _id: { $in: productIds } });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.compareProducts = async (req, res) => {
  try {
    const productIds = req.params.ids.split(',');
    const products = await Product.find({ _id: { $in: productIds } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};