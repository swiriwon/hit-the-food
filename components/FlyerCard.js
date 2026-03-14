// Hit the food - FlyerCard Component
// Reference copy extracted from index.html

// ── FLYER CARD ─────────────────────────────────────────────────────────────
const FlyerCard = ({ p, onAdd, onRemove, cart, w = 168, onClick }) => {
  const [hov, setHov] = useState(false);
  const qty = cart[p.id] || 0;
  return (
    <div 
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onClick && onClick(p)}
      style={{
        width:w, flexShrink:0, background:"white", borderRadius:18,
        overflow:"hidden", border:"1px solid #e8e8e8",
        boxShadow: hov ? "0 4px 20px rgba(0,0,0,0.1)" : "0 1px 6px rgba(0,0,0,0.05)",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition:"all 0.2s ease",
      display:"flex", flexDirection:"column", cursor:"pointer",
    }}>
      {/* Image — fixed height, not padding-bottom trick */}
      <div style={{ position:"relative", width:w, height:w, background:"white", flexShrink:0 }}>
        <img
          src={p.img} alt=""
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}
        />

        {p.badge && (
          <span style={{
            position:"absolute", top:10, left:10,
            background:"rgba(240,240,240,0.95)", backdropFilter:"blur(4px)",
            fontSize:10, fontWeight:700, borderRadius:6,
            padding:"3px 8px", color:"#555",
            border:"1px solid rgba(0,0,0,0.06)",
          }}>{p.badge}</span>
        )}

        {/* Add / qty control */}
        <div style={{ position:"absolute", top:10, right:10 }} onClick={(e) => e.stopPropagation()}>
          {qty === 0 ? (
            <button onClick={() => onAdd(p.id)} style={{
              background:"linear-gradient(135deg, #1d7742 0%, #166534 100%)", color:"white", border:"none",
              borderRadius:100, padding:"7px 14px",
              cursor:"pointer", fontWeight:700, fontSize:13,
              display:"flex", alignItems:"center", gap:5,
              boxShadow:"0 2px 10px rgba(22,101,52,0.35)",
              transition:"transform 0.15s, box-shadow 0.15s",
            }}>
              <span style={{ fontSize:17, fontWeight:300, lineHeight:1 }}>+</span> Add
            </button>
          ) : (
            <div style={{
              background:"linear-gradient(135deg, #1d7742 0%, #166534 100%)", borderRadius:100,
              padding:"5px 10px", display:"flex", alignItems:"center", gap:7,
              boxShadow:"0 2px 10px rgba(22,101,52,0.35)",
            }}>
              <button onClick={() => onRemove(p.id)} style={{ width:25, height:25, borderRadius:"50%", border:"none", background:"rgba(255,255,255,0.25)", color:"white", fontWeight:800, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}>−</button>
              <span style={{ color:"white", fontWeight:800, fontSize:13, minWidth:16, textAlign:"center" }}>{qty}</span>
              <button onClick={() => onAdd(p.id)}  style={{ width:25, height:25, borderRadius:"50%", border:"none", background:"rgba(255,255,255,0.25)", color:"white", fontWeight:800, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", transition:"background 0.15s" }}>+</button>
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding:"13px 15px 16px", flex:1 }}>
        <div style={{ fontSize:11, color:"#aaa", textDecoration:"line-through", fontWeight:500 }}>${p.original.toFixed(2)}</div>
        <div style={{ display:"flex", alignItems:"center", gap:7, margin:"4px 0 6px" }}>
          <Price value={p.price} size="lg" />
          <span style={{ fontSize:10, background:"#ffecec", color:"#d63031", fontWeight:800, borderRadius:6, padding:"3px 7px" }}>{p.off}</span>
        </div>
        <div style={{
          fontWeight:600, fontSize:13, lineHeight:1.4, color:"#1a1a1a",
          display:"-webkit-box", WebkitLineClamp:2,
          WebkitBoxOrient:"vertical", overflow:"hidden", marginBottom:5,
          letterSpacing:"-0.2px",
        }}>{p.name}</div>
        <div style={{ fontSize:11.5, color:"#999", fontWeight:500 }}>{p.size}</div>
        <div style={{ fontSize:11, color:"#0d5c3f", marginTop:7, display:"flex", alignItems:"center", gap:5, fontWeight:600 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"#0d5c3f", display:"inline-block" }} />
          Many in stock
        </div>
      </div>
    </div>
  );
};
