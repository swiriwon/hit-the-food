// Hit the food - ProductGrid Component
// Reference copy extracted from index.html

// ── RESPONSIVE GRID (CSS auto-fill) ──────────────────────────────────────────
const ProductGrid = ({ products, cart, onAdd, onRemove, onProductClick }) => {
  return (
    <div style={{ 
      display:"grid", 
      gridTemplateColumns:"repeat(auto-fill, minmax(150px, 1fr))", 
      gap:8 
    }}>
      {products.map(p => <ProductCard key={p.id} product={p} cart={cart} onAdd={onAdd} onRemove={onRemove} onClick={onProductClick} />)}
    </div>
  );
};
