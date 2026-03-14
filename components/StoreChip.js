// Hit the food - StoreChip Component
// Reference copy extracted from index.html

// ── STORE CHIP ─────────────────────────────────────────────────────────────
const StoreChip = ({ store, onClick, chipW = 80 }) => {
  const [hov, setHov] = useState(false);
  const circ = Math.max(62, Math.min(76, chipW - 6));
  const fs   = Math.round(circ * 0.38);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:"flex", flexDirection:"column", alignItems:"center",
        gap:8, cursor:"pointer", width:chipW, flexShrink:0, userSelect:"none",
      }}
    >
      {/* Circle + badges */}
      <div style={{ position:"relative", width:circ, height:circ }}>
        <div style={{
          width:circ, height:circ, borderRadius:"50%",
          background: hov ? "#f0faf5" : "#f8f8f8",
          border:`2px solid ${hov ? "#0d5c3f" : "#e5e5e5"}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:fs, transition:"all 0.18s ease",
          boxShadow: hov ? "0 4px 16px rgba(13,92,63,0.15)" : "0 1px 4px rgba(0,0,0,0.05)",
          transform: hov ? "scale(1.03)" : "scale(1)",
        }}>
          {SE[store.id] || "🏪"}
        </div>
        {store.badge && (
          <span style={{
            position:"absolute", top:-3, right:-3,
            background:"#1a1a1a", color:"white",
            borderRadius:"50%", width:20, height:20,
            fontSize:10, fontWeight:800,
            display:"flex", alignItems:"center", justifyContent:"center",
            border:"2.5px solid white",
            boxShadow:"0 1px 3px rgba(0,0,0,0.15)",
          }}>{store.badge}</span>
        )}
        {store.deal && (
          <span style={{
            position:"absolute", bottom:-9, left:"50%",
            transform:"translateX(-50%)",
            background:"linear-gradient(135deg, #0d5c3f 0%, #0a4a33 100%)", color:"white",
            fontSize:9, fontWeight:800,
            borderRadius:20, padding:"3px 8px",
            whiteSpace:"nowrap",
            border:"2px solid white",
            boxShadow:"0 2px 6px rgba(0,0,0,0.18)",
          }}>{store.deal}</span>
        )}
      </div>

      {/* Label — fixed 2-line area for alignment */}
      <div style={{ textAlign:"center", width:"100%", marginTop: store.deal ? 7 : 0 }}>
        <div style={{
          fontSize:12, fontWeight:600, color:"#1a1a1a",
          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
          maxWidth:"100%", letterSpacing:"-0.2px",
        }}>{store.name}</div>
        <div style={{ fontSize:11, color:"#777", marginTop:3, height:15, overflow:"hidden", fontWeight:500 }}>
          {store.note || store.time || store.delivery || ""}
        </div>
      </div>
    </div>
  );
};
