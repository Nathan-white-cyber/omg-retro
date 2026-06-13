export default function SearchCtaBand() {
  return (
    <div className="search-cta">
      <div className="container">
        <span className="cta-glyph" aria-hidden="true">🎮</span>
        <div className="cta-text">
          <h2>Looking for a Specific Game?</h2>
          <p>Search our entire catalog of thousands of retro games.</p>
        </div>
        <a href="/products" className="btn btn-lg">Search Games</a>
      </div>
    </div>
  );
}
