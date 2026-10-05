import { useEffect, useRef } from 'react';

const SUGGESTIONS = [
  'Paracetamol',
  'Sunscreen',
  'Salicylic Acid',
  'ORS',
  'Niacinamide',
  'Cetirizine',
  'Ibuprofen',
  'Omeprazole'
];

export default function SearchBar({ searchTerm, onSearchChange, onSelectSuggestion }) {
  const inputRef = useRef(null);

  // Global hotkey: press '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="search-section">
      <div className="search-header">
        <h1 className="search-title">Search Medicines & Healthcare Data</h1>
        <p className="search-subtitle">
          Find indications, dosages, side effects, precautions, and related medicines instantly.
        </p>
      </div>

      <div className="search-input-wrapper">
        <div className="search-icon-wrapper">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by medicine name, symptom, salt, or brand (e.g. Dolo, fever, acne)..."
          className="search-input"
          aria-label="Search medicines"
          autoFocus
        />

        {searchTerm && (
          <button
            type="button"
            className="clear-button"
            onClick={() => {
              onSearchChange('');
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        <div className="shortcut-hint" title="Press / to focus search">
          <kbd>/</kbd>
        </div>
      </div>

      <div className="suggestions-container">
        <span className="suggestions-label">Popular searches:</span>
        <div className="suggestions-pills">
          {SUGGESTIONS.map((item) => (
            <button
              key={item}
              type="button"
              className={`suggestion-pill ${searchTerm.toLowerCase() === item.toLowerCase() ? 'active' : ''}`}
              onClick={() => onSelectSuggestion(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
