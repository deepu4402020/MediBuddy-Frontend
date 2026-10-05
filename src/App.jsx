import { useState, useMemo, useEffect } from 'react';
import medicinesData from './data/medicines.json';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import MedicineCard from './components/MedicineCard';
import MedicineDetailModal from './components/MedicineDetailModal';
import EmptyState from './components/EmptyState';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  // Optimization: Debounce search input (150ms) to avoid unnecessary re-filtering on rapid keypresses
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 150);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Extract unique categories for filter tabs
  const categories = useMemo(() => {
    const cats = Array.from(new Set(medicinesData.map((item) => item.category)));
    return cats.sort();
  }, []);

  // Filter medicines based on active category and debounced query
  const filteredMedicines = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return medicinesData.filter((medicine) => {
      // 1. Category match
      if (activeCategory !== 'All' && medicine.category !== activeCategory) {
        return false;
      }

      // If no search query, match all within the category
      if (!query) {
        return true;
      }

      // 2. Search query multi-field match
      const nameMatch = medicine.name.toLowerCase().includes(query);
      const genericMatch = medicine.genericName.toLowerCase().includes(query);
      const categoryMatch = medicine.category.toLowerCase().includes(query);
      const summaryMatch = medicine.summary.toLowerCase().includes(query);
      const usesMatch = medicine.uses.some((use) => use.toLowerCase().includes(query));
      const brandsMatch = medicine.commonBrands.some((brand) => brand.toLowerCase().includes(query));

      return (
        nameMatch ||
        genericMatch ||
        categoryMatch ||
        summaryMatch ||
        usesMatch ||
        brandsMatch
      );
    });
  }, [debouncedSearch, activeCategory]);

  // Handlers
  const handleReset = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setActiveCategory('All');
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    setActiveCategory('All');
  };

  const handleSelectRelated = (relatedMed) => {
    setSelectedMedicine(relatedMed);
  };

  return (
    <div className="app-container">
      <Navbar totalCount={medicinesData.length} onReset={handleReset} />

      <main className="main-content">
        {/* Centered Landing Search Section */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onSelectSuggestion={handleSelectSuggestion}
        />

        {/* Category Filter Pills */}
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        {/* Results Bar */}
        <div className="results-header-bar">
          <span className="results-count">
            Showing <strong>{filteredMedicines.length}</strong> of {medicinesData.length} medicines
            {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
            {debouncedSearch ? ` for "${debouncedSearch}"` : ''}
          </span>

          {(searchTerm || activeCategory !== 'All') && (
            <button type="button" className="reset-filter-btn" onClick={handleReset}>
              Reset all filters
            </button>
          )}
        </div>

        {/* Medicines Grid or Empty State */}
        {filteredMedicines.length > 0 ? (
          <div className="medicine-grid">
            {filteredMedicines.map((medicine) => (
              <MedicineCard
                key={medicine.id}
                medicine={medicine}
                onSelect={setSelectedMedicine}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            searchTerm={debouncedSearch}
            activeCategory={activeCategory}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Medicine Details Modal */}
      {selectedMedicine && (
        <MedicineDetailModal
          medicine={selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
          allMedicines={medicinesData}
          onSelectRelated={handleSelectRelated}
        />
      )}

      {/* Footer */}
      <footer className="app-footer">
        <p>
          MediSearch &copy; {new Date().getFullYear()} &bull; Built for healthcare information transparency. Not a substitute for licensed medical consultation.
        </p>
      </footer>
    </div>
  );
}

export default App;
