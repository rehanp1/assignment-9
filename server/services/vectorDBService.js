const { Chroma } = require('langchain/vectorstores/chroma');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');
const Product = require('../models/productModel');
const sampleProducts = require('../data/sample-products.json');

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY
});

let vectorStore;

async function initializeVectorStore() {
  const products = await Product.find({});
  
  const texts = products.map(p => 
    `Product: ${p.name}\nDescription: ${p.description}\nCategory: ${p.category}`
  );
  
  const metadatas = products.map(p => ({
    productId: p._id.toString(),
    category: p.category,
    price: p.price
  }));

  vectorStore = await Chroma.fromTexts(
    texts,
    metadatas,
    embeddings,
    { collectionName: "ecommerce_products" }
  );
}

async function initializeWithSampleData() {

  if ((await Product.countDocuments()) === 0) {
    await Product.insertMany(sampleProducts);
    console.log('Inserted sample products');
  }
  await initializeVectorStore();
}

async function semanticSearch(query, k = 5) {
  if (!vectorStore) await initializeVectorStore();
  return await vectorStore.similaritySearch(query, k);
}

module.exports = {
  initializeVectorStore,
  initializeWithSampleData,
  semanticSearch
};