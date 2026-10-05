# MediSearch - MediBuddy Machine Coding Submission

A clean, beginner-friendly single-page web app built with React & Vite to search common medicines and view essential medical details and related drugs.

## Key Highlights
- **Total Code Size**: ~640 words total across `App.jsx` and `medicines.json` (easy to read, explain, and maintain in a 1-hour coding round).
- **Zero Heavy Dependencies**: Pure React with standard CSS, building in ~220ms.
- **Centered Search Landing**: Immediate search input with quick buttons for: Paracetamol, Sunscreen, Salicylic Acid, ORS, Niacinamide, Cetirizine.
- **Dynamic Multi-Field Filter**: Matches medicine name, category, medical uses, or brand names instantly.
- **Details Modal with Related Medicines**: Shows recommended dosage, side effects, brands, and clickable buttons to navigate directly to related medicines.

## Interview Questions & Answers
1. **Why this component structure?**
   - Kept state centralized in `App.jsx` (`search` and `selected` medicine) to keep the code clear, concise, and easy to trace during an interview without unnecessary prop drilling.
2. **What data structure for results?**
   - Array of objects in `medicines.json`. Native `.filter()` gives instant linear search without external search dependencies. Related medicines are referenced by string names.
3. **How does state flow?**
   - Unidirectional: `search` updates on typing/clicking quick pills -> `filtered` array recalculates -> Cards render. Clicking a card sets `selected`, which opens the modal.
4. **Optimizations applied?**
   - Lightweight bundle, single-pass filtering, no unnecessary re-renders or heavy UI libraries.
5. **What would you do with another hour?**
   - Add debouncing, URL search params (`?q=...`), fuzzy typo matching, and drug-to-drug comparison.
