import { useState } from 'react';
import medicinesData from './data/medicines.json';
import './App.css';

const QUICK_SEARCHES = ['Paracetamol', 'Sunscreen', 'Salicylic Acid', 'ORS', 'Niacinamide', 'Cetirizine'];

export default function App() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = medicinesData.filter((item) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.uses.toLowerCase().includes(q)
    );
  });

  return (
    <div className="app">
      {/* Top Header */}
      <header className="header">
        <h1 className="logo" onClick={() => setSearch('')}>MediSearch</h1>
        <span className="count-badge">{medicinesData.length} Medicines</span>
      </header>

      {/* Hero Landing with Centered Search */}
      <main className="main">
        <section className="search-box">
          <h2 className="title">Search Medicines here ! </h2>
          <p className="subtitle">Find usage, dosage, side effects, and related medicines</p>

          <div className="input-wrap">
            <input
              type="text"
              placeholder="Search medicine (e.g. Paracetamol, Sunscreen, acne)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
            {search && (
              <button className="clear-btn" onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          <div className="quick-tags">
            <span>Quick search:</span>
            {QUICK_SEARCHES.map((item) => (
              <button
                key={item}
                className={`tag-btn ${search.toLowerCase() === item.toLowerCase() ? 'active' : ''}`}
                onClick={() => setSearch(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <div className="results-bar">
          <span>Found <strong>{filtered.length}</strong> result{filtered.length !== 1 ? 's' : ''}</span>
          {search && (
            <button className="reset-link" onClick={() => setSearch('')}>Show all</button>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid">
            {filtered.map((item) => (
              <div key={item.id} className="card" onClick={() => setSelected(item)}>
                <div className="card-header">
                  <h3>{item.name}</h3>
                  <span className="pill">{item.category}</span>
                </div>
                <p className="card-uses"><strong>Uses:</strong> {item.uses}</p>
                <button className="card-btn">View Details →</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>No medicine found matching "{search}".</p>
            <button className="tag-btn" onClick={() => setSearch('')}>Clear search</button>
          </div>
        )}
      </main>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{selected.name}</h2>
                <span className="pill">{selected.category}</span>
              </div>
              <button className="close-btn" onClick={() => setSelected(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="info-row">
                <strong>Key Uses:</strong>
                <p>{selected.uses}</p>
              </div>

              <div className="info-row highlight">
                <strong>Recommended Dosage:</strong>
                <p>{selected.dosage}</p>
              </div>

              <div className="info-row">
                <strong>Side Effects:</strong>
                <p>{selected.sideEffects}</p>
              </div>



              <div className="info-row">
                <strong>Related Medicines:</strong>
                <div className="related-list">
                  {selected.related.map((relName) => (
                    <button
                      key={relName}
                      className="related-btn"
                      onClick={() => {
                        const next = medicinesData.find((m) => m.name.toLowerCase().includes(relName.toLowerCase()));
                        if (next) setSelected(next);
                      }}
                    >
                      {relName} ›
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="close-action" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>MediSearch &bull; Educational medicine guide for quick reference.</p>
      </footer>
    </div>
  );
}
