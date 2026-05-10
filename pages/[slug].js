import { keywords } from '../../lib/keywords';
import { generateProducts } from '../../lib/generateProducts';

export default function ProductPage({ keyword, products }) {
  const AFFILIATE_TAG = "yourstore-20";
  
  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1>{keyword?.title}</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>{keyword?.description}</p>
      
      <div style={{ display: 'grid', gap: '30px' }}>
        {products?.map((product, i) => (
          <div key={i} style={{ 
            padding: '24px', 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px' 
          }}>
            <h3>{product.name}</h3>
            <p style={{ color: '#666', fontSize: '14px' }}>{product.brand}</p>
            <p style={{ margin: '16px 0' }}>{product.reason}</p>
            
            <div style={{ marginTop: '16px' }}>
              <strong>Highlights:</strong>
              <ul>
                {product.highlights?.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <strong>{product.priceRange}</strong>
              <a 
                href={`https://amazon.com?tag=${AFFILIATE_TAG}`}
                style={{ 
                  marginLeft: '16px',
                  padding: '8px 16px',
                  background: '#ff9900',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  display: 'inline-block'
                }}
              >
                View on Amazon →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = keywords.map(kw => ({
    params: { slug: kw.slug }
  }));
  
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const keyword = keywords.find(k => k.slug === params.slug);
  
  if (!keyword) {
    return { props: { keyword: null, products: [] } };
  }
  
  try {
    const products = await generateProducts(keyword.query);
    return { props: { keyword, products } };
  } catch (error) {
    console.error('Error generating products:', error);
    return { props: { keyword, products: [] } };
  }
}
