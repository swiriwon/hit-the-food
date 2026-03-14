// Hit the food - MainCartDropdown Component (Main Page Multi-store Cart)
// Reference copy extracted from index.html

// ── MAIN CART DROPDOWN (Multi-store) ──────────────────────────────────────
const MainCartDropdown = ({ cart, cartBtnRef, onClose, onStoreClick }) => {
  const panelRef = useRef(null);
  const items = Object.entries(cart).filter(([,v]) => v > 0);
  
  // Get products for display
  const cartProducts = items.map(([id]) => ALL_PRODUCTS.find(x => x.id === Number(id))).filter(Boolean);

  useEffect(() => {
    const h = e => {
      if (
        panelRef.current && !panelRef.current.contains(e.target) &&
        cartBtnRef.current && !cartBtnRef.current.contains(e.target)
      ) onClose();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [onClose]);

  return (
    <div ref={panelRef} style={{ position:"absolute", top:"calc(100% + 10px)", right:0, width:420, maxHeight:"85vh", overflowY:"auto", background:"white", borderRadius:16, boxShadow:"0 8px 40px rgba(0,0,0,0.18)", zIndex:9999, border:"1px solid #e8e6e1" }}>
      {/* Header */}
      <div style={{ padding:"16px 20px", borderBottom:"1px solid #f0ede8", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <button onClick={onClose} style={{ background:"none", border:"none", fontSize:18, cursor:"pointer", color:"#333", padding:4 }}>✕</button>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontWeight:700, fontSize:15 }}>Carts</div>
          <div style={{ fontSize:12, color:"#666" }}>Shopping in 94306</div>
        </div>
        <div style={{ width:26 }} /> {/* Spacer for centering */}
      </div>
      
      {items.length === 0 ? (
        <div style={{ textAlign:"center", padding:"48px 20px", color:"#888" }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🛒</div>
          <div style={{ fontSize:14, fontWeight:500 }}>Your carts are empty</div>
          <div style={{ fontSize:13, color:"#aaa", marginTop:4 }}>Start shopping to add items</div>
        </div>
      ) : (
        <div style={{ padding:"16px" }}>
          {/* CHEF'STORE Cart (example - empty for now) */}
          <div style={{ background:"#f9f9f9", borderRadius:14, padding:"16px 18px", marginBottom:12, border:"1px solid #eee" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <div style={{ width:42, height:42, background:"#1a365d", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:800, fontSize:7, lineHeight:1.1, textAlign:"center", padding:4 }}>
                <span>US<br/>CHEF'STORE</span>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:14, color:"#111" }}>CHEF'STORE</div>
                <div style={{ fontSize:12, color:"#666" }}>Personal Cart</div>
                <div style={{ fontSize:12, color:"#0d9e5f", fontWeight:600, display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
                  <span>⚡</span> Delivery by 10:15am
                </div>
              </div>
            </div>
            {/* Empty state for this store */}
            <div style={{ display:"flex", gap:8, marginBottom:14, minHeight:40 }}>
              <div style={{ width:40, height:40, background:"#eee", borderRadius:8 }} />
            </div>
            <button style={{ width:"100%", background:"#1d7742", color:"white", border:"none", borderRadius:28, padding:"12px 20px", fontSize:14, fontWeight:700, cursor:"pointer" }}>
              Continue Shopping
            </button>
          </div>
          
          {/* Mega Mart Cart (with actual items) */}
          <div style={{ background:"#f9f9f9", borderRadius:14, padding:"16px 18px", border:"1px solid #eee" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
              <div style={{ width:42, height:42, background:"#c8102e", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:900, fontSize:10, lineHeight:1.1, textAlign:"center" }}>MEGA<br/>MART</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:14, color:"#111" }}>Mega Mart</div>
                <div style={{ fontSize:12, color:"#666" }}>Personal Cart</div>
                <div style={{ fontSize:12, color:"#0d9e5f", fontWeight:600, display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
                  <span>⚡</span> Delivery by 9:45am
                </div>
              </div>
            </div>
            {/* Product images */}
            <div style={{ display:"flex", gap:8, marginBottom:14, flexWrap:"wrap" }}>
              {cartProducts.slice(0, 6).map(p => (
                <img key={p.id} src={p.img} alt={p.name} style={{ width:44, height:44, objectFit:"cover", borderRadius:8, background:"#fff", border:"1px solid #eee" }} />
              ))}
              {cartProducts.length > 6 && (
                <div style={{ width:44, height:44, borderRadius:8, background:"#e8e8e8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:600, color:"#666" }}>
                  +{cartProducts.length - 6}
                </div>
              )}
            </div>
            <button 
              onClick={() => { onClose(); onStoreClick && onStoreClick(); }}
              style={{ width:"100%", background:"#1d7742", color:"white", border:"none", borderRadius:28, padding:"12px 20px", fontSize:14, fontWeight:700, cursor:"pointer" }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
