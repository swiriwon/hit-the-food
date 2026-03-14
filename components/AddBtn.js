// Hit the food - AddBtn Component
// Reference copy extracted from index.html

// ── ADD BUTTON — green pill matching Instacart reference ──────────────────
const AddBtn = ({ id, cart, onAdd, onRemove, small }) => {
  const qty = cart[id] || 0;
  const h = small ? 30 : 36;
  if (qty === 0) return (
    <button
      onClick={e => { e.stopPropagation(); onAdd(id); }}
      style={{
        background:"linear-gradient(135deg, #1d7742 0%, #166534 100%)", color:"white", border:"none",
        borderRadius:100,
        padding: small ? "5px 12px" : "7px 16px",
        cursor:"pointer", fontSize: small ? 12.5 : 14, fontWeight:700,
        display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap",
        boxShadow:"0 2px 10px rgba(22,101,52,0.35)", letterSpacing:"0.1px",
        transition:"transform 0.15s, box-shadow 0.15s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(22,101,52,0.4)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(22,101,52,0.35)"; }}
    >
      <span style={{ fontSize: small ? 17 : 20, fontWeight:300, lineHeight:1, marginTop:-1 }}>+</span>
      Add
    </button>
  );
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5 }} onClick={e => e.stopPropagation()}>
      <button onClick={() => onRemove(id)}
        style={{ width:h, height:h, borderRadius:"50%", border:"2px solid #166534", background:"white", color:"#166534", fontWeight:800, cursor:"pointer", fontSize: small?14:18, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.12)", transition:"all 0.15s" }}>−</button>
      <span style={{ fontWeight:800, minWidth:16, textAlign:"center", fontSize: small?13:15 }}>{qty}</span>
      <button onClick={() => onAdd(id)}
        style={{ width:h, height:h, borderRadius:"50%", border:"none", background:"linear-gradient(135deg, #1d7742 0%, #166534 100%)", color:"white", fontWeight:800, cursor:"pointer", fontSize: small?14:18, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 6px rgba(22,101,52,0.3)", transition:"all 0.15s" }}>+</button>
    </div>
  );
};
