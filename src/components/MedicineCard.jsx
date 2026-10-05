export default function MedicineCard({ medicine, onSelect }) {
  return (
    <article className="medicine-card" onClick={() => onSelect(medicine)}>
      <div className="card-top">
        <div className="card-badges">
          <span className="badge category-badge">{medicine.category}</span>
          {medicine.prescriptionRequired ? (
            <span className="badge rx-badge" title="Doctor prescription required">Rx Required</span>
          ) : (
            <span className="badge otc-badge" title="Over The Counter medication">OTC</span>
          )}
        </div>
        
        <h2 className="card-title">{medicine.name}</h2>
        <p className="card-generic">{medicine.genericName}</p>
      </div>

      <p className="card-summary">{medicine.summary}</p>

      <div className="card-section">
        <span className="section-label">Key Uses:</span>
        <div className="card-uses-tags">
          {medicine.uses.slice(0, 3).map((use, index) => (
            <span key={index} className="use-tag">
              ✓ {use}
            </span>
          ))}
          {medicine.uses.length > 3 && (
            <span className="use-tag more-tag">+{medicine.uses.length - 3} more</span>
          )}
        </div>
      </div>

      <div className="card-footer">
        <div className="card-brands">
          <span className="brands-label">Brands: </span>
          <span className="brands-text">{medicine.commonBrands.slice(0, 2).join(', ')}</span>
        </div>

        <button
          type="button"
          className="view-details-btn"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(medicine);
          }}
          aria-label={`View details for ${medicine.name}`}
        >
          Details <span>→</span>
        </button>
      </div>
    </article>
  );
}
