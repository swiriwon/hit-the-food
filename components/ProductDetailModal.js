// Hit the food - ProductDetailModal Component
// Reference copy extracted from index.html

// ── PRODUCT DETAIL MODAL ─────────────────────────────────────────────────────
const ProductDetailModal = ({ product, onClose, cart, onAdd, onRemove, allProducts }) => {
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const modalRef = useRef(null);
  
  // Similar products (excluding current)
  const similarProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);
  const itemsToAddNext = allProducts.filter(p => p.id !== product.id).slice(4, 10);
  
  // Nutrition data (mock)
  const nutrition = {
    sodium: "65mg", sugar: "11g", fat: "4g", calories: "120",
    servingSize: "28.0", servingsPerContainer: "12",
    totalFat: "4g", saturatedFat: "3g", transFat: "0g",
    cholesterol: "5mg", totalCarb: "19g", dietaryFiber: "1g", totalSugars: "11g", protein: "1g"
  };
  
  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => { 
      if (e.key === "Escape") {
        if (isZoomed) setIsZoomed(false);
        else onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose, isZoomed]);
  
  // No scroll lock - modal overlay handles interaction blocking
  
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const AccordionSection = ({ title, children, id }) => (
    <div style={{ borderBottom:"1px solid #f0f0f0" }}>
      <div 
        onClick={() => toggleSection(id)}
        style={{ 
          padding:"14px 0", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between",
          fontWeight:600, fontSize:14, color:"#1a1a1a"
        }}
      >
        {title}
        <span style={{ fontSize:11, color:"#888", transition:"transform 0.2s", transform: expandedSection === id ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
      </div>
      {expandedSection === id && (
        <div style={{ paddingBottom:16, fontSize:13, lineHeight:1.7, color:"#444" }}>
          {children}
        </div>
      )}
    </div>
  );
  
  // Image Zoom - elegant in-modal expansion
  const ZoomView = () => (
    <div 
      onClick={() => setIsZoomed(false)}
      style={{
        position:"absolute", inset:0, zIndex:20,
        background:"white",
        display:"flex", flexDirection:"column",
        cursor:"zoom-out",
        animation:"fadeIn 0.2s ease-out"
      }}
    >
      {/* Zoom header */}
      <div style={{ 
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"16px 24px", borderBottom:"1px solid #f0f0f0"
      }}>
        <button
          onClick={() => setIsZoomed(false)}
          style={{
            background:"none", border:"none", cursor:"pointer",
            display:"flex", alignItems:"center", gap:8,
            fontSize:14, fontWeight:600, color:"#333"
          }}
        >
          ← Back to product
        </button>
        <div style={{ fontSize:14, fontWeight:600, color:"#333" }}>{product.name}</div>
        <button
          onClick={() => setIsZoomed(false)}
          style={{
            background:"#f5f5f5", border:"none", borderRadius:8,
            width:36, height:36, cursor:"pointer", fontSize:18,
            display:"flex", alignItems:"center", justifyContent:"center"
          }}
        >
          ✕
        </button>
      </div>
      
      {/* Full image view */}
      <div style={{ 
        flex:1, display:"flex", alignItems:"center", justifyContent:"center",
        padding:40, background:"#fafafa"
      }}>
        <img 
          src={product.img} 
          alt={product.name}
          style={{ 
            maxWidth:"100%", maxHeight:"calc(100vh - 200px)", 
            objectFit:"contain",
            borderRadius:12,
            boxShadow:"0 8px 32px rgba(0,0,0,0.08)"
          }}
        />
      </div>
      
      {/* Footer hint */}
      <div style={{ 
        padding:"12px 24px", borderTop:"1px solid #f0f0f0",
        textAlign:"center", fontSize:12, color:"#888"
      }}>
        Click anywhere or press ESC to close
      </div>
    </div>
  );
  
  return (
    <>
      <div 
        onClick={handleBackdropClick}
        style={{ 
          position:"fixed", inset:0, zIndex:1000,
          background:"rgba(0,0,0,0.5)",
          display:"flex", alignItems:"flex-start", justifyContent:"center",
          padding:"40px 20px",
          overflowY:"auto",
          fontFamily:"'Noto Sans KR',sans-serif"
        }}
      >
      {/* Modal Container */}
      <div 
        ref={modalRef}
        style={{ 
          background:"white", borderRadius:16, 
          width:"100%", maxWidth:1000,
          maxHeight:"calc(100vh - 80px)",
          overflowY:"auto",
          boxShadow:"0 25px 50px -12px rgba(0,0,0,0.25)",
          position:"relative"
        }}
      >
        {/* Image Zoom View - overlays modal content */}
        {isZoomed && <ZoomView />}
        {/* Sticky Header */}
        <div style={{ 
          position:"sticky", top:0, zIndex:10, background:"white", 
          borderBottom:"1px solid #f0f0f0", borderRadius:"16px 16px 0 0",
          padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between"
        }}>
          <button 
            onClick={onClose}
            style={{ background:"none", border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:8, fontSize:14, fontWeight:600, color:"#333", padding:"8px 0" }}
          >
            ← Back
          </button>
          <div style={{ display:"flex", gap:10 }}>
            <button style={{ background:"#f5f5f5", border:"none", borderRadius:20, padding:"8px 18px", fontSize:13, fontWeight:600, cursor:"pointer" }}>Delivery</button>
            <button style={{ background:"white", border:"1px solid #ddd", borderRadius:20, padding:"8px 18px", fontSize:13, fontWeight:500, cursor:"pointer", color:"#666" }}>Pickup</button>
          </div>
        </div>
        
        {/* Content */}
        <div style={{ padding:"24px 32px 32px" }}>
          {/* TOP SECTION: Image | Product Info + Save */}
          <div style={{ display:"grid", gridTemplateColumns:"400px 1fr", gap:40, marginBottom:24 }}>
            {/* Left: Just Image */}
            <div>
              <div 
                onClick={() => setIsZoomed(true)}
                style={{ 
                  position:"relative", background:"#f5f5f5", borderRadius:12, overflow:"hidden",
                  aspectRatio:"1", display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"zoom-in"
                }}
              >
                {!imgLoaded && (
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.5s infinite" }} />
                )}
                <img 
                  src={product.img} 
                  alt={product.name}
                  onLoad={() => setImgLoaded(true)}
                  style={{ width:"75%", height:"75%", objectFit:"contain", opacity: imgLoaded ? 1 : 0, transition:"opacity 0.3s" }}
                />
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsZoomed(true); }}
                  style={{ position:"absolute", bottom:12, right:12, background:"white", border:"none", borderRadius:6, padding:"6px 8px", cursor:"pointer", boxShadow:"0 2px 6px rgba(0,0,0,0.1)", fontSize:14, transition:"transform 0.15s" }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.1)"}
                  onMouseLeave={e => e.target.style.transform = ""}
                >🔍</button>
              </div>
            </div>
            
            {/* Right: Product Info + Save */}
            <div style={{ display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
              {/* Top info group */}
              <div>
                <h1 style={{ fontSize:24, fontWeight:800, color:"#1a1a1a", lineHeight:1.3, marginBottom:6 }}>{product.name}</h1>
                <p style={{ fontSize:14, color:"#666", marginBottom:12 }}>{product.sub || product.size} · ${(product.price / 12).toFixed(2)} each</p>
                
                {/* Shop all + Save/List in one row */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                  <p style={{ fontSize:14, color:"#0d5c3f", cursor:"pointer", fontWeight:500, margin:0 }}>Shop all {product.name.split(" ")[0]}</p>
                  <div style={{ display:"flex", gap:20 }}>
                    <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:13, fontWeight:600, color:"#555", cursor:"pointer" }}
                      onMouseEnter={e => e.currentTarget.style.color="#0d5c3f"}
                      onMouseLeave={e => e.currentTarget.style.color="#555"}
                    >
                      🔖 Save
                    </span>
                    <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:13, fontWeight:600, color:"#555", cursor:"pointer" }}
                      onMouseEnter={e => e.currentTarget.style.color="#0d5c3f"}
                      onMouseLeave={e => e.currentTarget.style.color="#555"}
                    >
                      📋 Add to List
                    </span>
                  </div>
                </div>
                
                {/* Features row */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:16, fontSize:12, color:"#666", padding:"12px 0", borderTop:"1px solid #f0f0f0" }}>
                  <span>• Zero trans fat</span>
                  <span>• Low fat</span>
                  <span>• Low sodium</span>
                </div>
                
                {/* Nutrition quick view row */}
                <div style={{ display:"flex", gap:24, padding:"12px 0", borderBottom:"1px solid #f0f0f0" }}>
                  {[
                    { label:"Sodium", value:nutrition.sodium },
                    { label:"Sugar", value:nutrition.sugar },
                    { label:"Fat", value:nutrition.fat },
                    { label:"Calories", value:nutrition.calories },
                  ].map(item => (
                    <div key={item.label} style={{ textAlign:"center" }}>
                      <div style={{ fontSize:12, color:"#888", marginBottom:2 }}>{item.label}</div>
                      <div style={{ fontSize:15, fontWeight:700, color:"#1a1a1a" }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price & Add to cart - bottom aligned */}
              <div style={{ background:"#fafafa", borderRadius:16, padding:"20px 24px" }}>
                <div style={{ fontSize:28, fontWeight:800, marginBottom:16 }}>
                  ${product.price.toFixed(2)}
                  {product.original && (
                    <span style={{ fontSize:14, color:"#888", textDecoration:"line-through", marginLeft:10, fontWeight:500 }}>${product.original.toFixed(2)}</span>
                  )}
                </div>
                
                {/* Quantity Selector + Add to cart in one row */}
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <select 
                    value={quantity}
                    onChange={e => setQuantity(Number(e.target.value))}
                    style={{ padding:"14px 40px 14px 16px", borderRadius:12, border:"1.5px solid #ddd", fontSize:15, fontWeight:600, cursor:"pointer", appearance:"none", background:"white url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"10\" height=\"5\"><path d=\"M0 0l5 5 5-5z\" fill=\"%23666\"/></svg>') no-repeat right 14px center", flexShrink:0 }}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  
                  <button 
                    onClick={() => { for(let i=0; i<quantity; i++) onAdd(product.id); onClose(); }}
                    style={{ 
                      flex:1, background:"linear-gradient(135deg, #1d7742 0%, #166534 100%)", 
                      color:"white", border:"none", borderRadius:28, padding:"14px 24px",
                      fontSize:15, fontWeight:700, cursor:"pointer",
                      boxShadow:"0 4px 14px rgba(22,101,52,0.3)",
                      transition:"transform 0.15s, box-shadow 0.15s"
                    }}
                    onMouseEnter={e => { e.target.style.transform="translateY(-1px)"; e.target.style.boxShadow="0 6px 18px rgba(22,101,52,0.35)"; }}
                    onMouseLeave={e => { e.target.style.transform=""; e.target.style.boxShadow="0 4px 14px rgba(22,101,52,0.3)"; }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* BOTTOM SECTION: Accordions | Nutrition Facts */}
          <div style={{ display:"grid", gridTemplateColumns:"400px 1fr", gap:40, marginBottom:40 }}>
            {/* Left: Accordions */}
            <div>
              <AccordionSection title="Details" id="details">
                <p>120 calories. Low sodium. 0 g trans fat. No preservatives, no artificial colors. Low fat. The new taste of nostalgia.</p>
                <p style={{ marginTop:10 }}>Just as the sweet chocolate coating touches your tongue; just as you sink your teeth into the soft and fluffy biscuit; just as the chewy marshmallow is perfectly combined with the chocolate and biscuits.</p>
              </AccordionSection>
              
              <AccordionSection title="Ingredients" id="ingredients">
                <p>Wheat Flour, Sugar, Tapioca Glucose Syrup, Vegetable Shortening (Palm Oils, Hydrogenated Coconut Oil, Hydrogenated Palm Oil), Hydrogenated Vegetable Fat (Palm Oil, Shea Oil), Tapioca Isomalto Oligo Syrup, Cocoa Powder, Contains Less than 2% of: Whole Milk Powder, Eggs, Dextrose Monohydrate, Gelatin, Salt, Sodium Bicarbonate, Ammonium Bicarbonate, Monocalcium Phosphate, Hydroxypropyl Distarch Phosphate, Vanillin Powder (Artificial Flavor), Soy Lecithin, Hydrolysed Milk Protein, Xanthan Gum, Polyglycerol Polyricinoleate.</p>
              </AccordionSection>
              
              <AccordionSection title="Directions" id="directions">
                <p>Avoid direct sunshine, keep in cool and dry place, eat soon after opening.</p>
              </AccordionSection>
            </div>
            
            {/* Right: Nutrition Facts */}
            <div>
              <div style={{ background:"white", border:"2px solid #1a1a1a", borderRadius:12, padding:20 }}>
                <h3 style={{ fontSize:22, fontWeight:900, marginBottom:4, borderBottom:"8px solid #1a1a1a", paddingBottom:4, display:"inline-block" }}>Nutrition Facts</h3>
                <p style={{ fontSize:12, color:"#666", marginBottom:10 }}>{nutrition.servingsPerContainer} servings per container</p>
                <div style={{ display:"flex", justifyContent:"space-between", borderBottom:"1px solid #ddd", paddingBottom:8, marginBottom:8 }}>
                  <span style={{ fontWeight:700, fontSize:14 }}>Serving size</span>
                  <span style={{ fontWeight:700, fontSize:14 }}>{nutrition.servingSize}g</span>
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", fontWeight:700, borderBottom:"6px solid #1a1a1a", paddingBottom:6, marginBottom:8 }}>
                  <span style={{ fontSize:14 }}>Calories</span>
                  <span style={{ fontSize:28, fontWeight:900 }}>{nutrition.calories}</span>
                </div>
                <div style={{ textAlign:"right", fontSize:11, fontWeight:600, borderBottom:"1px solid #ddd", padding:"4px 0" }}>% Daily Value*</div>
                <div style={{ fontSize:13, lineHeight:2 }}>
                  {[
                    { label:"Total Fat", value:nutrition.totalFat, percent:"5%" },
                    { label:"  Saturated Fat", value:nutrition.saturatedFat, percent:"15%", indent:true },
                    { label:"Cholesterol", value:nutrition.cholesterol, percent:"2%" },
                    { label:"Sodium", value:nutrition.sodium, percent:"3%" },
                    { label:"Total Carbohydrate", value:nutrition.totalCarb, percent:"7%" },
                    { label:"  Dietary Fiber", value:nutrition.dietaryFiber, percent:"4%", indent:true },
                    { label:"  Total Sugars", value:nutrition.totalSugars, indent:true },
                    { label:"Protein", value:nutrition.protein },
                  ].map((item, i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", borderBottom:"1px solid #eee", padding:"3px 0", paddingLeft: item.indent ? 14 : 0 }}>
                      <span style={{ fontWeight: item.indent ? 400 : 600 }}>{item.label} {item.value}</span>
                      {item.percent && <span style={{ fontWeight:600 }}>{item.percent}</span>}
                    </div>
                  ))}
                </div>
                <p style={{ fontSize:11, color:"#666", marginTop:10, lineHeight:1.5 }}>
                  *The % Daily Value tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
                </p>
              </div>
            </div>
          </div>
          
          {/* Customers also considered */}
          <section style={{ marginBottom:36 }}>
            <h2 style={{ fontSize:18, fontWeight:800, marginBottom:16 }}>Customers also considered</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:12 }}>
              {similarProducts.map(p => (
                <div key={p.id} style={{ background:"white", borderRadius:12, overflow:"hidden", cursor:"pointer", border:"1px solid #f0f0f0", transition:"box-shadow 0.15s, transform 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = ""; }}
                >
                  <div style={{ aspectRatio:"1", position:"relative", overflow:"hidden" }}>
                    <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <div style={{ position:"absolute", top:8, right:8 }}>
                      <AddBtn id={p.id} cart={cart} onAdd={onAdd} onRemove={onRemove} small />
                    </div>
                  </div>
                  <div style={{ padding:"12px 14px" }}>
                    <div style={{ fontSize:16, fontWeight:800, marginBottom:4 }}>${p.price.toFixed(2)}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:"#1a1a1a", marginBottom:3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</div>
                    <div style={{ fontSize:11, color:"#888" }}>{p.sub || p.size}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Items to add next */}
          <section style={{ marginBottom:36 }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
              <h2 style={{ fontSize:18, fontWeight:800 }}>Items to add next</h2>
              <div style={{ display:"flex", gap:6 }}>
                <button style={{ width:32, height:32, borderRadius:"50%", border:"1px solid #ddd", background:"white", cursor:"pointer", fontSize:14, color:"#888" }}>‹</button>
                <button style={{ width:32, height:32, borderRadius:"50%", border:"1px solid #ddd", background:"white", cursor:"pointer", fontSize:14 }}>›</button>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(6, 1fr)", gap:10 }}>
              {itemsToAddNext.map(p => (
                <div key={p.id} style={{ background:"white", borderRadius:12, overflow:"hidden", cursor:"pointer", border:"1px solid #f0f0f0", transition:"box-shadow 0.15s, transform 0.15s" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = ""; }}
                >
                  <div style={{ aspectRatio:"1", position:"relative", overflow:"hidden" }}>
                    <img src={p.img} alt={p.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <div style={{ position:"absolute", top:6, right:6 }}>
                      <AddBtn id={p.id} cart={cart} onAdd={onAdd} onRemove={onRemove} small />
                    </div>
                  </div>
                  <div style={{ padding:"10px 12px" }}>
                    <div style={{ fontSize:14, fontWeight:800, marginBottom:3 }}>${p.price.toFixed(2)}</div>
                    <div style={{ fontSize:11, fontWeight:600, color:"#1a1a1a", marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</div>
                    <div style={{ fontSize:10, color:"#888" }}>{p.sub || p.size}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Product Details Section */}
          <section style={{ marginBottom:32 }}>
            <div style={{ background:"#fafafa", borderRadius:16, padding:"28px 32px" }}>
              <h3 style={{ fontSize:18, fontWeight:800, marginBottom:16, color:"#1a1a1a" }}>Details</h3>
              <p style={{ fontSize:15, lineHeight:1.8, color:"#333", marginBottom:24 }}>
                120 calories. Low sodium. 0 g trans fat, no preservatives, no artificial colors. Low fat. The new taste of nostalgia. Just as the sweet chocolate coating touches your tongue; just as you sink your teeth into the soft and fluffy biscuit; just as the chewy marshmallow is perfectly combined with the chocolate and biscuits. Close your eyes for a moment to remember the good memories.
              </p>
              
              <h3 style={{ fontSize:18, fontWeight:800, marginBottom:16, color:"#1a1a1a" }}>Ingredients</h3>
              <p style={{ fontSize:14, lineHeight:1.8, color:"#444", marginBottom:24 }}>
                Wheat Flour, Sugar, Tapioca Glucose Syrup, Vegetable Shortening (Palm Oils, Hydrogenated Coconut Oil, Hydrogenated Palm Oil), Cocoa Powder, Contains Less than 2% of: Whole Milk Powder, Eggs, Gelatin, Salt, Sodium Bicarbonate.
              </p>
              
              <h3 style={{ fontSize:18, fontWeight:800, marginBottom:16, color:"#1a1a1a" }}>Directions</h3>
              <p style={{ fontSize:14, lineHeight:1.8, color:"#444", marginBottom:24 }}>
                Avoid direct sunshine, keep in cool and dry place, eat soon after opening.
              </p>
              
              {/* Warnings */}
              <div style={{ background:"#fef9e7", borderRadius:12, padding:"16px 20px", display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ fontSize:20 }}>⚠️</span>
                <div>
                  <div style={{ fontWeight:700, fontSize:15, marginBottom:6, color:"#92400e" }}>Warnings</div>
                  <p style={{ fontSize:14, color:"#78350f", margin:0, lineHeight:1.6 }}>Contains milk, wheat, egg, soy, coconut and shea nut ingredients.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Disclaimer */}
          <div style={{ padding:20, background:"#f5f5f5", borderRadius:12, fontSize:12, color:"#666", lineHeight:1.6 }}>
            <p>Product information or packaging displayed may not be current or complete. Always refer to the physical product for the most accurate information and warnings. <a href="#" style={{ color:"#0d5c3f", fontWeight:600 }}>Learn more</a></p>
            <p style={{ marginTop:8 }}>*Actual weight may vary based on seasonality and other factors. Estimated price is approximate and provided only for reference.</p>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
    </>
  );
};
