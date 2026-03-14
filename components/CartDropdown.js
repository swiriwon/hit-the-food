// Hit the food - CartDropdown Component (Store Page Cart)
// Reference copy extracted from index.html

// ── CART DROPDOWN ──────────────────────────────────────────────────────────
const SUGG = [
  { id:201, name:"Jongga Sliced Nappa Cabbage", price:9.59, img:IMG.cabbage, sponsored:true },
  { id:202, name:"Samyang Spicy Carbonara Ramen", price:9.59, img:IMG.ramen },
  { id:203, name:"Napa Cabbage", price:2.39, img:IMG.cabbage },
  { id:204, name:"Baby Bok Choy", price:2.19, img:IMG.bokchoy },
  { id:205, name:"ORION Sweet Corn Turtle Chips", price:5.99, img:IMG.choco },
  { id:206, name:"Pulmuone Soft Tofu", price:2.19, img:IMG.tofu },
  { id:207, name:"Fresh Broccoli Crown", price:2.49, img:IMG.broccoli },
  { id:208, name:"Organic Baby Carrots", price:3.29, img:IMG.carrot },
  { id:209, name:"Shiitake Mushrooms", price:4.99, img:IMG.mushroom },
];

const CartDropdown = ({ cart, onAdd, onRemove, cartBtnRef, onClose }) => {
  const panelRef = useRef(null);
  const items = Object.entries(cart).filter(([,v]) => v > 0);
  const total = items.reduce((s,[id,q]) => {
    const p = ALL_PRODUCTS.find(x => x.id === Number(id));
    return s + (p?.price || 0) * q;
  }, 0);
  
  // Free delivery threshold
  const freeDeliveryThreshold = 35;
  const remaining = Math.max(0, freeDeliveryThreshold - total);
  const progress = Math.min(100, (total / freeDeliveryThreshold) * 100);
  const isFreeDelivery = total >= freeDeliveryThreshold;

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
    <div ref={panelRef} style={{ position:"absolute", top:"calc(100% + 10px)", right:0, width:400, maxHeight:"85vh", overflowY:"auto", background:"white", borderRadius:16, boxShadow:"0 8px 40px rgba(0,0,0,0.18)", zIndex:9999, border:"1px solid #e8e6e1" }}>
      {/* Header with store info */}
      <div style={{ padding:"16px 20px", borderBottom:"1px solid #f0ede8", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:13, color:"#555" }}>
          <span>✕</span>
          <span style={{ fontWeight:600, color:"#111" }}>Personal Mega Mart Cart</span>
        </div>
        <div style={{ fontSize:12, color:"#666" }}>Shopping in 94306</div>
      </div>
      
      {/* Store badge and delivery time */}
      <div style={{ padding:"14px 20px", borderBottom:"1px solid #f0ede8", display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:36, height:36, background:"#c8102e", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:900, fontSize:9, lineHeight:1.1, textAlign:"center", flexShrink:0 }}>MEGA<br/>MART</div>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, fontSize:14 }}>Mega Mart</div>
          <div style={{ fontSize:12, color:"#666" }}>Today, 11am</div>
        </div>
        <span style={{ fontWeight:800, fontSize:15 }}>${total.toFixed(2)}</span>
      </div>

      {/* Cart items */}
      <div style={{ padding:"8px 20px" }}>
        {items.length === 0
          ? <div style={{ textAlign:"center", padding:"36px 0", color:"#bbb" }}><div style={{ fontSize:36 }}>🛒</div><div style={{ marginTop:10, fontSize:13 }}>Your cart is empty</div></div>
          : items.map(([id, qty]) => {
              const p = ALL_PRODUCTS.find(x => x.id === Number(id));
              if (!p) return null;
              return (
                <div key={id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:"1px solid #f8f7f4" }}>
                  <img src={p.img} alt={p.name} style={{ width:48, height:48, objectFit:"cover", borderRadius:8, background:"#f8f7f4", flexShrink:0 }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, lineHeight:1.35, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</div>
                    <div style={{ fontSize:12, color:"#666", marginTop:2 }}>${p.price.toFixed(2)}</div>
                    <button style={{ fontSize:11, color:"#2d6a4f", background:"none", border:"none", cursor:"pointer", padding:0, marginTop:2, display:"flex", alignItems:"center", gap:4 }}>
                      <span>↻</span> Choose replacement
                    </button>
                  </div>
                  <AddBtn id={Number(id)} cart={cart} onAdd={onAdd} onRemove={onRemove} small />
                </div>
              );
            })
        }
      </div>

      {items.length > 0 && (
        <div style={{ padding:"10px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:"1px solid #f0ede8" }}>
          <span style={{ fontSize:13, color:"#555", display:"flex", alignItems:"center", gap:6 }}>🎁 Make this order a gift</span>
          <div style={{ width:38, height:21, background:"#d1d5db", borderRadius:11, cursor:"pointer" }} />
        </div>
      )}

      {/* Complete your cart */}
      <div style={{ padding:"14px 20px", borderTop:"1px solid #f0ede8" }}>
        <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>Complete your cart</div>
        <div style={{ fontSize:12, color:"#888", marginBottom:12 }}>Based on items in your cart</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {SUGG.slice(0, 9).map(s => (
            <div key={s.id} style={{ display:"flex", flexDirection:"column" }}>
              <div style={{ position:"relative", width:"100%", paddingBottom:"100%", background:"#f8f7f4", borderRadius:8, overflow:"hidden" }}>
                <img src={s.img} alt={s.name} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
                <div style={{ position:"absolute", top:4, right:4 }}>
                  <button onClick={() => onAdd(s.id)} style={{ width:22, height:22, borderRadius:"50%", background:"#1d7742", border:"none", color:"white", fontWeight:800, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }}>+</button>
                </div>
              </div>
              <div style={{ fontSize:11, fontWeight:800, marginTop:4 }}>${s.price.toFixed(2)}</div>
              <div style={{ fontSize:10, color:"#444", lineHeight:1.35, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{s.name}</div>
              {s.sponsored && <div style={{ fontSize:9, color:"#bbb" }}>Sponsored</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Footer with free delivery progress */}
      {items.length > 0 && (
        <div style={{ padding:"14px 20px 18px", borderTop:"1px solid #f0ede8", background:"white", position:"sticky", bottom:0 }}>
          {/* Free delivery progress bar */}
          <div style={{ 
            background: isFreeDelivery ? "#003d2b" : "#f0f0f0", 
            borderRadius:30, padding:"10px 16px", marginBottom:12,
            display:"flex", alignItems:"center", justifyContent:"space-between",
            transition:"background 0.3s"
          }}>
            <div style={{ flex:1, marginRight:12 }}>
              <div style={{ fontSize:12, color: isFreeDelivery ? "white" : "#333", fontWeight:600 }}>
                {isFreeDelivery 
                  ? "You're getting $0 delivery fee" 
                  : `Add $${remaining.toFixed(2)} to get $0 delivery fee`}
              </div>
              {!isFreeDelivery && (
                <div style={{ marginTop:6, height:4, background:"#ddd", borderRadius:2, overflow:"hidden" }}>
                  <div style={{ width:`${progress}%`, height:"100%", background:"#003d2b", borderRadius:2, transition:"width 0.3s" }} />
                </div>
              )}
            </div>
            <div style={{ 
              display:"flex", alignItems:"center", gap:4,
              color: isFreeDelivery ? "white" : "#003d2b", fontWeight:800, fontSize:14
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {items.reduce((s,[,q]) => s+q, 0)}
            </div>
          </div>
          
          <button style={{ width:"100%", background:"#1d7742", color:"white", border:"none", borderRadius:28, padding:"14px 18px", fontSize:15, fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <span>Go to checkout</span>
            <span>${total.toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  );
};
