// Hit the food - ProductCard Component
// Reference copy extracted from index.html

// ── PRODUCT CARD ───────────────────────────────────────────────────────────
const ProductCard = ({ product, cart, onAdd, onRemove, onClick }) => (
  <div
    onClick={() => onClick && onClick(product)}
    style={{ background:"transparent", borderRadius:0, overflow:"hidden", cursor:"pointer", display:"flex", flexDirection:"column", minWidth:0, transition:"transform 0.15s" }}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
    onMouseLeave={e => e.currentTarget.style.transform = ""}
  >
    <div style={{ position:"relative", width:"100%", paddingBottom:"100%", background:"#f5f5f5", borderRadius:12, overflow:"hidden" }}>
      <img src={product.img} alt={product.name}
        style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", objectFit:"cover" }} />
      {product.badge && (
        <span style={{
          position:"absolute", bottom:5, left:5,
          background: product.badge==="Organic"?"#2d6a4f": product.badge==="In season"?"#b45309": product.badge==="Non GMO"?"#1d4ed8":"#7c3aed",
          color:"white", fontSize:9, fontWeight:800, borderRadius:3, padding:"2px 5px", whiteSpace:"nowrap"
        }}>{product.badge}</span>
      )}
      <div style={{ position:"absolute", top:8, right:8 }} onClick={e => e.stopPropagation()}>
        <AddBtn id={product.id} cart={cart} onAdd={onAdd} onRemove={onRemove} small />
      </div>
    </div>
    <div style={{ padding:"9px 9px 11px", flex:1, display:"flex", flexDirection:"column", gap:3 }}>
      <Price value={product.price} size="lg" />
      <div style={{ fontSize:12.5, fontWeight:600, lineHeight:1.4, color:"#1a1a1a", display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden", minHeight:"3.6em" }}>{product.name}</div>
      <div style={{ fontSize:11, color:"#999", marginTop:1 }}>{product.sub}</div>
      <div style={{ fontSize:10.5, color:"#2d6a4f", display:"flex", alignItems:"center", gap:3, marginTop:2 }}>
        <span style={{ width:6, height:6, borderRadius:"50%", background:"#2d6a4f", display:"inline-block", flexShrink:0 }} />
        Many in stock
      </div>
    </div>
  </div>
);
