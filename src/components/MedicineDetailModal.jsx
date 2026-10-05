import { useEffect } from 'react';

export default function MedicineDetailModal({
  medicine,
  onClose,
  allMedicines,
  onSelectRelated
}) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!medicine) return null;

  // Find related medicine objects
  const relatedList = (medicine.relatedMedicines || [])
    .map((relatedId) => allMedicines.find((m) => m.id === relatedId))
    .filter(Boolean);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <div className="modal-badges">
              <span className="badge category-badge">{medicine.category}</span>
              {medicine.prescriptionRequired ? (
                <span className="badge rx-badge">Prescription Required (Rx)</span>
              ) : (
                <span className="badge otc-badge">Over The Counter (OTC)</span>
              )}
            </div>
            <h2 className="modal-title">{medicine.name}</h2>
            <p className="modal-generic">{medicine.genericName}</p>
          </div>

          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body">
          {/* Summary */}
          <div className="modal-section">
            <h3 className="section-title">Overview</h3>
            <p className="section-text">{medicine.summary}</p>
          </div>

          {/* Common Brands */}
          <div className="modal-section">
            <h3 className="section-title">Common Brand Names</h3>
            <div className="brands-pill-list">
              {medicine.commonBrands.map((brand, idx) => (
                <span key={idx} className="brand-chip">
                  {brand}
                </span>
              ))}
            </div>
          </div>

          {/* Uses */}
          <div className="modal-section">
            <h3 className="section-title">Key Medical Uses</h3>
            <ul className="uses-list">
              {medicine.uses.map((use, index) => (
                <li key={index}>
                  <span className="check-icon">✓</span>
                  <span>{use}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Dosage & Administration */}
          <div className="modal-section dosage-card">
            <div className="section-heading-with-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="6" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3 className="section-title">Recommended Dosage & Guide</h3>
            </div>
            <p className="dosage-text">{medicine.dosage}</p>
          </div>

          {/* How It Works */}
          {medicine.howItWorks && (
            <div className="modal-section">
              <h3 className="section-title">Mechanism of Action (How It Works)</h3>
              <p className="section-text mechanism-text">{medicine.howItWorks}</p>
            </div>
          )}

          {/* Side Effects */}
          <div className="modal-section">
            <h3 className="section-title">Common Side Effects</h3>
            <div className="side-effects-list">
              {medicine.sideEffects.map((sideEffect, index) => (
                <div key={index} className="side-effect-item">
                  <span className="side-effect-dot"></span>
                  <span>{sideEffect}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warnings & Precautions */}
          <div className="modal-section precaution-card">
            <div className="section-heading-with-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <h3 className="section-title warning-title">Precautions & Warnings</h3>
            </div>
            <ul className="precautions-list">
              {medicine.precautions.map((precaution, idx) => (
                <li key={idx}>{precaution}</li>
              ))}
            </ul>
          </div>

          {/* Related Medicines */}
          {relatedList.length > 0 && (
            <div className="modal-section related-section">
              <h3 className="section-title">Related Medicines</h3>
              <p className="related-hint">Often used in tandem or for related symptoms:</p>
              <div className="related-pills">
                {relatedList.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    className="related-pill-btn"
                    onClick={() => onSelectRelated(rel)}
                    title={`View ${rel.name}`}
                  >
                    <span>{rel.name}</span>
                    <span className="related-arrow">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Medical Disclaimer */}
          <div className="medical-disclaimer">
            <p>
              <strong>Medical Disclaimer:</strong> Information provided is for educational reference only and does not substitute professional medical advice, diagnosis, or treatment. Always consult a licensed doctor or pharmacist before starting or stopping medication.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button type="button" className="close-action-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
