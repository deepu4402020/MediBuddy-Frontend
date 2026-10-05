# MediSearch - MediBuddy Machine Coding Submission

A clean, responsive single-page web application for searching everyday medicines and viewing comprehensive healthcare data.

## Features Built
- **Central Landing Search Bar**: Prominent search bar with instant multi-field matching (brand names, generic salt, medical uses, category).
- **Popular Suggestion Chips**: Quick-click pills for general medicines: Paracetamol, Sunscreen, Salicylic Acid, ORS, Niacinamide, Cetirizine, Ibuprofen, Omeprazole.
- **Category Filter Tabs**: Horizontally scrollable category pills (Pain Relief, Skincare, Dermatology, Hydration, Allergy, Acidity, Antibiotics, Vitamins).
- **Interactive Medicine Cards**: Clean cards with OTC/Rx badges, generic salt, top uses tags, and brand previews.
- **Detailed Modal with Related Medicine Navigation**: Full view with dosage guidelines, mechanism of action, side effects, precautions/warnings alert box, and clickable related medicine pills.
- **Keyboard Shortcuts**: Press `/` to focus the search bar from anywhere; press `Esc` to close the modal.
- **Zero Heavy External Dependencies**: Built with React + Vanilla CSS variables for a 297ms build time and 77 kB production bundle.

## Questions You May Be Asked by Mentors
See full details in the project notes. Key points:
1. **Component structuring**: Separation of concerns (`App.jsx` handles state/filtering, UI components are modular and declarative).
2. **Data structure**: Normalized array of objects with unique slug IDs and foreign-key relational references for related medicines.
3. **State flow**: Unidirectional data flow with debounced search input (150ms) and `useMemo` for derived filtered data.
4. **Optimizations**: Debouncing, `useMemo` caching, modal scroll lock cleanup, zero UI library bloat.
5. **With another hour**: Typo-tolerant fuzzy search, URL search query parameter synchronization, and side-by-side drug comparison.
