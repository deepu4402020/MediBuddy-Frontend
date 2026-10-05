export default function EmptyState({ searchTerm, activeCategory, onReset }) {
  return (
    <div className="empty-state">
      <div className="empty-icon-wrapper">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          <line x1="8" y1="11" x2="14" y2="11"></line>
        </svg>
      </div>

      <h2 className="empty-title">No matching medicines found</h2>
      
      <p className="empty-description">
        {searchTerm ? (
          <>
            We couldn't find any medicine matching <strong>"{searchTerm}"</strong>
            {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}.
          </>
        ) : (
          `No medicines available in category "${activeCategory}".`
        )}
      </p>

      <div className="empty-suggestions">
        <p>Suggestions:</p>
        <ul>
          <li>Check for spelling errors (e.g., "Paracetamol", "Sunscreen", "ORS")</li>
          <li>Search by symptom: "fever", "pain", "skin", "allergy", "acne", "acidity"</li>
          <li>Search by brand: "Dolo", "Crocin", "Electral", "Omez"</li>
          <li>Try switching category back to "All Categories"</li>
        </ul>
      </div>

      <button type="button" className="empty-reset-btn" onClick={onReset}>
        Reset Filters & Show All
      </button>
    </div>
  );
}
