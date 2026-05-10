import { keywords } from '../lib/keywords';

export default function Home() {
  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <h1>Curate - AI Product Recommendations</h1>
      <p style={{ color: '#666', marginBottom: '40px' }}>
        AI-powered product recommendations with Amazon affiliate links
      </p>
      
      <h2>Browse Recommendations</h2>
      <div style={{ display: 'grid', gap: '16px', marginTop: '24px' }}>
        {keywords.map(kw => (
          <a 
            key={kw.slug}
            href={`/${kw.slug}`}
            style={{ 
              padding: '20px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#000',
              display: 'block'
            }}
          >
            <h3 style={{ margin: '0 0 8px 0' }}>{kw.title}</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{kw.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
