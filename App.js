// Hit the food - App Component (Root)
// Reference copy extracted from index.html

// ── ROOT ───────────────────────────────────────────────────────────────────
function App() {
  const [page, setPage] = useState("main");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState({ 5:1, 6:1, 7:1 });
  const add    = id => setCart(p => ({ ...p, [id]:(p[id]||0)+1 }));
  const remove = id => setCart(p => { const n={...p}; if(n[id]<=1) delete n[id]; else n[id]--; return n; });
  
  // Combine all products for modal
  const flyerStoreProducts = FLYER_STORES.flatMap(s => s.products);
  const allProducts = [...ALL_PRODUCTS, ...FLYER_PRODUCTS, ...flyerStoreProducts];
  
  const openProduct = (product) => {
    setSelectedProduct(product);
  };
  
  const closeProduct = () => {
    setSelectedProduct(null);
  };
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { overflow-y:scroll; }
        body { font-family:'Noto Sans KR',sans-serif; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
        ::-webkit-scrollbar { width:5px; height:5px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#d8d8d8; border-radius:4px; }
        ::-webkit-scrollbar-thumb:hover { background:#bbb; }
        .hide-scrollbar::-webkit-scrollbar { display:none; }
        .hide-scrollbar { -ms-overflow-style:none; scrollbar-width:none; }
        button:focus { outline:none; }
        button { font-family:inherit; }
        input { font-family:inherit; }
      `}</style>
      {page === "main" && <MainPage onStoreClick={() => setPage("store")} cart={cart} onAdd={add} onRemove={remove} onProductClick={openProduct} />}
      {page === "store" && <StorePage onHome={() => setPage("main")} cart={cart} onAdd={add} onRemove={remove} onProductClick={openProduct} />}
      
      {/* Product Detail Modal - overlays on top */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={closeProduct} 
          cart={cart} 
          onAdd={add} 
          onRemove={remove}
          allProducts={allProducts}
        />
      )}
    </>
  );
}

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
