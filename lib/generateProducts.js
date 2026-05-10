const Anthropic = require("@anthropic-ai/sdk");

async function generateProducts(query) {
  const client = new Anthropic.default({ 
    apiKey: process.env.ANTHROPIC_API_KEY 
  });
  
  const msg = await client.messages.create({
    model: "claude-sonnet-4-20241022",
    max_tokens: 1200,
    messages: [{
      role: "user",
      content: `You are a product recommendation engine. User query: "${query}"

Return ONLY a valid JSON array with exactly 3 products. No markdown, no backticks.

[{
  "name": "Product Name",
  "brand": "Brand",
  "rating": 4.5,
  "reviews": "1,200+",
  "reason": "Why this product fits the need",
  "highlights": ["Feature 1", "Feature 2", "Feature 3"],
  "priceRange": "$50-$75"
}]`
    }]
  });
  
  const text = msg.content[0].text;
  return JSON.parse(text.replace(/```json|```/g, "").trim());
}

module.exports = { generateProducts };
