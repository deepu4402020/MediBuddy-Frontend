export default function Navbar({ totalCount, onReset }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={onReset} role="button" tabIndex={0} title="Reset search">
          <div className="brand-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">MediSearch</span>
            <span className="brand-subtitle">Medicine & Drug Guide</span>
          </div>
        </div>

        <div className="navbar-badge">
          <span className="badge-pulse"></span>
          <span>{totalCount} Verified Medicines</span>
        </div>
      </div>
    </header>
  );
}
