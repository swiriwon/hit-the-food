// Hit the food - StorePage Component
// Reference copy extracted from index.html

// ── STORE PAGE ─────────────────────────────────────────────────────────────
const StorePage = ({ onHome, cart, onAdd, onRemove, onProductClick }) => {
  // Navigation state
  const [viewMode, setViewMode] = useState("shop"); // "shop" | "category" | "subcategory"
  const [activeCategory, setActiveCategory] = useState(null); // Level 1
  const [activeSubcategory, setActiveSubcategory] = useState(null); // Level 2
  const [activeTab, setActiveTab] = useState("All"); // Level 3
  const [browseOpen, setBrowseOpen] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const cartBtnRef = useRef(null);
  const rootRef = useRef(null);
  const contW = useContainerWidth(rootRef);
  const isNarrow = contW > 0 && contW < 920;
  const isMobile = contW > 0 && contW < 600;
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((s,[id,q]) => {
    const p = ALL_PRODUCTS.find(x => x.id === Number(id));
    return s + (p?.price || 0) * q;
  }, 0);

  // Navigation handlers
  const goToShop = () => {
    setViewMode("shop");
    setActiveCategory(null);
    setActiveSubcategory(null);
    setActiveTab("All");
  };

  const goToCategory = (cat) => {
    setViewMode("category");
    setActiveCategory(cat);
    setActiveSubcategory(null);
    setActiveTab("All");
  };

  const goToSubcategory = (cat, subcat) => {
    setViewMode("subcategory");
    setActiveCategory(cat);
    setActiveSubcategory(subcat);
    setActiveTab("All");
  };

  // Get current structure
  const categoryStructure = activeCategory ? CATEGORY_STRUCTURE[activeCategory] : null;
  const subcategories = categoryStructure?.subcategories || [];
  
  // Get tabs for current subcategory
  let tabs = ["All"];
  if (activeSubcategory && categoryStructure && categoryStructure.tabs && categoryStructure.tabs[activeSubcategory]) {
    tabs = categoryStructure.tabs[activeSubcategory];
  }

  // Product Section component
  const Section = ({ title, products, showViewMore = true, onViewMore }) => (
    <div style={{ marginBottom:36 }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
        <h2 style={{ fontWeight:800, fontSize:18, color:"#111", letterSpacing:"-0.3px" }}>{title}</h2>
        {showViewMore && (
          <button 
            onClick={onViewMore}
            style={{ background:"none", border:"none", color:"#003d2b", fontWeight:700, fontSize:12.5, cursor:"pointer", display:"flex", alignItems:"center", gap:4 }}
          >
            View more <span style={{ fontSize:10 }}>›</span>
          </button>
        )}
      </div>
      <ProductGrid products={products} cart={cart} onAdd={onAdd} onRemove={onRemove} onProductClick={onProductClick} />
    </div>
  );

  // Get products for current view
  const getSubcategoryProducts = (subcat, tab = "All") => {
    const subcatData = SUBCATEGORY_PRODUCTS[subcat];
    if (!subcatData) return [];
    return subcatData[tab] || subcatData["All"] || [];
  };

  return (
    <div ref={rootRef} style={{ display:"flex", minHeight:"100vh", fontFamily:"'Noto Sans KR',sans-serif", background:"white", width:"100%" }}>
      {/* Sidebar */}
      {!isNarrow && (
      <aside style={{ width:248, minWidth:248, background:"white", borderRight:"1px solid #efefef", display:"flex", flexDirection:"column", overflowY:"auto", flexShrink:0, position:"sticky", top:0, height:"100vh", paddingLeft:16 }}>
        {/* Logo with Hamburger */}
        <div style={{ padding:"22px 18px 18px", borderBottom:"1px solid #f5f5f5", display:"flex", alignItems:"center", gap:12 }}>
          <button 
            onClick={() => setAccountOpen(true)}
            style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", alignItems:"center", justifyContent:"center", color:"#333" }}
          >
            <Icons.Menu size={22} sw={2.2} />
          </button>
          <img src={LOGO_IMG} alt="Hit the Food" style={{ height:32, objectFit:"contain", cursor:"pointer" }} onClick={onHome} />
        </div>

        {/* Store badge */}
        <div style={{ padding:"12px 14px", borderBottom:"1px solid #f0ede8", background:"#fafaf8" }}>
          <div style={{ fontSize:9.5, color:"#aaa", fontWeight:600, letterSpacing:"0.6px", textTransform:"uppercase", marginBottom:8 }}>Store</div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:38, height:38, background:"#c8102e", borderRadius:7, display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:900, fontSize:10, lineHeight:1.1, textAlign:"center", flexShrink:0 }}>MEGA<br/>MART</div>
            <div>
              <div style={{ fontWeight:800, fontSize:14, color:"#1a1a1a" }}>Mega Mart</div>
              <div style={{ fontSize:10.5, color:"#888" }}>10% service fee</div>
            </div>
          </div>
        </div>

        {/* Main menu */}
        {[
          { id:"shop", icon:"🏪", label:"Shop" },
          { id:"again", icon:"🔄", label:"Buy it again" },
          { id:"recipes", icon:"📖", label:"Recipes" },
          { id:"lists", icon:"📋", label:"Lists" },
        ].map(item => {
          const isActive = item.id === "shop" ? viewMode === "shop" : false;
          return (
            <div key={item.id} onClick={() => item.id === "shop" && goToShop()}
              style={{ padding:"10px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:10, fontSize:13.5, fontWeight:isActive?700:500, color:isActive?"#003d2b":"#444", background:isActive?"#f0faf5":"transparent", borderRight:isActive?"3px solid #003d2b":"3px solid transparent", margin:"1px 0", borderRadius:"8px 0 0 8px" }}>
              <span style={{ fontSize:16 }}>{item.icon}</span>{item.label}
            </div>
          );
        })}
        
        <div style={{ height:1, background:"#f0ede8", margin:"6px 0" }} />
        
        {/* Browse aisles header */}
        <div onClick={() => setBrowseOpen(!browseOpen)}
          style={{ padding:"10px 14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", fontSize:13.5, fontWeight:700, color:"#1a1a1a" }}>
          <span>Browse aisles</span>
          <span style={{ fontSize:10, color:"#aaa" }}>{browseOpen ? "▲" : "▼"}</span>
        </div>
        
        {/* Category list with subcategories */}
        {browseOpen && MEGA_BROWSE_AISLES.map(aisle => {
          const isActiveCategory = activeCategory === aisle;
          const structure = CATEGORY_STRUCTURE[aisle];
          const subs = structure?.subcategories || [];
          
          return (
            <div key={aisle}>
              {/* Level 1 category */}
              <div 
                onClick={() => goToCategory(aisle)}
                style={{ 
                  padding:"8px 14px 8px 26px", cursor:"pointer", fontSize:13, 
                  color: isActiveCategory ? "#003d2b" : "#555", 
                  fontWeight: isActiveCategory ? 700 : 500, 
                  background: isActiveCategory && !activeSubcategory ? "#f0faf5" : "transparent", 
                  borderRight: isActiveCategory && !activeSubcategory ? "3px solid #003d2b" : "3px solid transparent", 
                  borderRadius:"8px 0 0 8px"
                }}
              >
                {aisle}
              </div>
              
              {/* Level 2 subcategories - show when category is active */}
              {isActiveCategory && subs.length > 0 && (
                <div style={{ marginLeft:12, borderLeft:"1px solid #e8e8e8", marginBottom:4 }}>
                  {subs.map(sub => {
                    const isActiveSub = activeSubcategory === sub;
                    return (
                      <div 
                        key={sub}
                        onClick={(e) => { e.stopPropagation(); goToSubcategory(aisle, sub); }}
                        style={{ 
                          padding:"6px 14px 6px 14px", cursor:"pointer", fontSize:12.5, 
                          color: isActiveSub ? "#003d2b" : "#666", 
                          fontWeight: isActiveSub ? 600 : 400,
                          background: isActiveSub ? "#f0faf5" : "transparent",
                          borderRadius:"4px 0 0 4px",
                          marginLeft:8
                        }}
                      >
                        {sub}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </aside>
      )}

      {/* Main content */}
      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>
        {/* Header */}
        <header style={{ background:"white", borderBottom:"1px solid #efefef", padding:"14px 28px", flexShrink:0, zIndex:100, position:"sticky", top:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:14 }}>
            {/* Hamburger for narrow/mobile */}
            {isNarrow && (
              <button 
                onClick={() => setAccountOpen(true)}
                style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", alignItems:"center", justifyContent:"center", color:"#333", flexShrink:0 }}
              >
                <Icons.Menu size={22} sw={2.2} />
              </button>
            )}
            {isNarrow && (
              <img src={LOGO_IMG} alt="Hit the Food" style={{ height:24, objectFit:"contain", flexShrink:0, cursor:"pointer" }} onClick={onHome} />
            )}
            
            {/* Back button */}
            <button 
              onClick={onHome} 
              style={{ 
                background:"#f5f5f5", border:"none", color:"#333", 
                borderRadius:10, padding:"9px 14px", cursor:"pointer", 
                fontWeight:600, fontSize:13, whiteSpace:"nowrap", 
                display:"flex", alignItems:"center", gap:6,
                flexShrink:0
              }}
            >
              <span style={{ fontSize:16 }}>←</span> Back
            </button>
            
            {/* Search bar - flex to fill available space */}
            <div style={{ flex:1, position:"relative", minWidth:200 }}>
              <svg style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                placeholder="Search Mega Mart"
                style={{
                  width:"100%", padding:"11px 14px 11px 42px",
                  border:`2px solid ${searchFocus ? "#003d2b" : "#ebebeb"}`,
                  borderRadius:12, fontSize:13.5, outline:"none",
                  background: searchFocus ? "white" : "#f7f7f7",
                  transition:"border-color 0.15s, background 0.15s", color:"#111",
                }}
              />
            </div>
            
            {/* Delivery / Pickup Toggle */}
            {!isMobile && (
            <div style={{ display:"flex", background:"#f5f5f5", borderRadius:30, padding:4, flexShrink:0 }}>
              <button 
                onClick={() => {}}
                style={{ 
                  background:"white", border:"none", borderRadius:26, padding:"8px 18px",
                  fontWeight:700, fontSize:13, cursor:"pointer", color:"#111",
                  boxShadow:"0 1px 3px rgba(0,0,0,0.1)"
                }}
              >Delivery</button>
              <button 
                onClick={() => {}}
                style={{ 
                  background:"transparent", border:"none", borderRadius:26, padding:"8px 18px",
                  fontWeight:500, fontSize:13, cursor:"pointer", color:"#888"
                }}
              >Pickup</button>
            </div>
            )}
            
            {/* Time and Address */}
            {!isMobile && (
            <div style={{ display:"flex", alignItems:"center", gap:6, cursor:"pointer", flexShrink:0 }}>
              <span style={{ display:"flex", alignItems:"center", color:"#666" }}><Icons.Clock size={18} sw={2} /></span>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:"#111" }}>Today, 11am <span style={{ fontSize:10, color:"#888" }}>ⓘ</span></div>
                <div style={{ fontSize:12, color:"#666" }}>150 Grant Avenue <span style={{ fontSize:10 }}>▾</span></div>
              </div>
            </div>
            )}
            
            {/* Free Delivery Progress Bar */}
            {!isMobile && (() => {
              const freeDeliveryThreshold = 35;
              const remaining = Math.max(0, freeDeliveryThreshold - cartTotal);
              const isFree = cartTotal >= freeDeliveryThreshold;
              const progress = Math.min(100, (cartTotal / freeDeliveryThreshold) * 100);
              
              return (
                <div style={{ 
                  background: isFree ? "#003d2b" : "#f0f0f0", 
                  borderRadius:30, padding:"10px 18px", 
                  display:"flex", alignItems:"center", gap:12,
                  minWidth:280, flexShrink:0,
                  transition:"background 0.3s"
                }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:12, color: isFree ? "white" : "#333", fontWeight:600 }}>
                      {isFree 
                        ? "You're getting $0 delivery fee" 
                        : `Add $${remaining.toFixed(2)} to get $0 delivery fee`}
                    </div>
                    {!isFree && (
                      <div style={{ marginTop:5, height:4, background:"#ddd", borderRadius:2, overflow:"hidden" }}>
                        <div style={{ width:`${progress}%`, height:"100%", background:"#003d2b", borderRadius:2, transition:"width 0.3s" }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}
            
            {/* Cart */}
            <div style={{ position:"relative", flexShrink:0 }} ref={cartBtnRef}>
              <button
                onClick={() => setCartOpen(true)}
                style={{ 
                  background: cartCount > 0 ? "#003d2b" : "#f7f7f7", 
                  color: cartCount > 0 ? "white" : "#555",
                  border:"none", borderRadius:10, padding:"10px 16px", 
                  cursor:"pointer", fontWeight:800, fontSize:14, 
                  display:"flex", alignItems:"center", gap:8, 
                  transition:"background 0.15s" 
                }}
              >
                <Icons.ShoppingCart size={18} sw={2.5} />
                {cartCount}
              </button>
            </div>
          </div>
          
          {/* Quick category tabs - visible in shop mode */}
          {viewMode === "shop" && (
            <div style={{ display:"flex", gap:4, overflowX:"auto", scrollbarWidth:"none", marginTop:14 }} className="hide-scrollbar">
              {QUICK_CATEGORIES.map(cat => (
                <div 
                  key={cat.id} 
                  onClick={() => goToCategory(QUICK_TO_CATEGORY[cat.id])}
                  style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5, cursor:"pointer", flexShrink:0, padding:"6px 10px", transition:"all 0.15s" }}
                >
                  <div style={{ width:56, height:56, background:"#f8f7f4", borderRadius:12, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <img src={cat.img} alt={cat.label} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                  <span style={{ fontSize:10.5, fontWeight:600, color:"#666", whiteSpace:"pre-wrap", maxWidth:66, textAlign:"center", lineHeight:1.2 }}>{cat.label}</span>
                </div>
              ))}
            </div>
          )}
          
          {/* Breadcrumb + Level 3 tabs - visible in category/subcategory mode */}
          {viewMode !== "shop" && (
            <div>
              {/* Breadcrumb */}
              <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom: activeSubcategory ? 12 : 0, fontSize:13 }}>
                <span onClick={goToShop} style={{ color:"#0d5c3f", cursor:"pointer", fontWeight:500 }}>Shop</span>
                <span style={{ color:"#999" }}>›</span>
                <span 
                  onClick={() => goToCategory(activeCategory)} 
                  style={{ color: activeSubcategory ? "#0d5c3f" : "#111", cursor: activeSubcategory ? "pointer" : "default", fontWeight: activeSubcategory ? 500 : 700 }}
                >
                  {activeCategory}
                </span>
                {activeSubcategory && (
                  <>
                    <span style={{ color:"#999" }}>›</span>
                    <span style={{ color:"#111", fontWeight:700 }}>{activeSubcategory}</span>
                  </>
                )}
              </div>
              
              {/* Level 3 filter tabs - show when subcategory is selected */}
              {activeSubcategory && tabs.length > 1 && (
                <div style={{ display:"flex", gap:8 }}>
                  {tabs.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        padding:"8px 16px", borderRadius:20, cursor:"pointer", fontSize:13, fontWeight:600,
                        background: activeTab === tab ? "#1a1a1a" : "white",
                        color: activeTab === tab ? "white" : "#444",
                        border: activeTab === tab ? "none" : "1px solid #ddd",
                        transition:"all 0.15s"
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </header>
        <div style={{ background:"linear-gradient(90deg, #C41230 0%, #8B0D25 100%)", padding:"12px 20px", textAlign:"center" }}>
          <span style={{ fontSize:32, color:"white", fontWeight:600, letterSpacing:"0.3px" }}>Launching April 2026 — Stay tuned for something amazing!</span>
        </div>

        {/* Content area */}
        <div style={{ flex:1, padding:"24px 28px 40px 32px", background:"white" }}>
          {/* Shop mode - Best sellers + all categories */}
          {viewMode === "shop" && (
            <>
              <Section title="Best sellers" products={BESTSELLERS} showViewMore={false} />
              {MEGA_BROWSE_AISLES.map(category => (
                <Section 
                  key={category} 
                  title={category} 
                  products={CATEGORY_PRODUCTS[category] || []} 
                  onViewMore={() => goToCategory(category)}
                />
              ))}
            </>
          )}
          
          {/* Category mode - show subcategory sections */}
          {viewMode === "category" && activeCategory && (
            <>
              <h1 style={{ fontSize:26, fontWeight:800, color:"#111", marginBottom:24 }}>{activeCategory}</h1>
              
              {/* First show subcategories that have products */}
              {subcategories.map(sub => {
                const products = getSubcategoryProducts(sub);
                if (products.length === 0) return null;
                return (
                  <Section 
                    key={sub} 
                    title={sub} 
                    products={products}
                    onViewMore={() => goToSubcategory(activeCategory, sub)}
                  />
                );
              })}
              
              {/* Always show category products as "All [Category]" or fallback */}
              {(() => {
                const hasSubcategoryProducts = subcategories.some(sub => getSubcategoryProducts(sub).length > 0);
                const categoryProducts = CATEGORY_PRODUCTS[activeCategory] || [];
                
                if (!hasSubcategoryProducts && categoryProducts.length > 0) {
                  return (
                    <Section 
                      title={`All ${activeCategory}`}
                      products={categoryProducts}
                      showViewMore={false}
                    />
                  );
                }
                return null;
              })()}
            </>
          )}
          
          {/* Subcategory mode - show filtered products with tabs */}
          {viewMode === "subcategory" && activeSubcategory && (
            <>
              <h1 style={{ fontSize:26, fontWeight:800, color:"#111", marginBottom:24 }}>
                {activeTab === "All" ? activeSubcategory : activeTab}
              </h1>
              {activeTab === "All" ? (
                // "All" tab: Show each sub-section separately with View more
                tabs.filter(t => t !== "All").map(tab => {
                  const products = getSubcategoryProducts(activeSubcategory, tab);
                  if (products.length === 0) return null;
                  return (
                    <Section 
                      key={tab}
                      title={tab} 
                      products={products}
                      onViewMore={() => setActiveTab(tab)}
                    />
                  );
                })
              ) : (
                // Other tabs: Show products for selected tab only (no View more)
                <Section 
                  title={activeTab} 
                  products={getSubcategoryProducts(activeSubcategory, activeTab)}
                  showViewMore={false}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* ── ACCOUNT SLIDE PANEL (Left) ── */}
      {accountOpen && (
        <>
          {/* Overlay */}
          <div 
            onClick={() => setAccountOpen(false)}
            style={{
              position:"fixed", inset:0, background:"rgba(0,0,0,0.5)",
              zIndex:200, animation:"fadeIn 0.2s ease"
            }}
          />
          {/* Panel */}
          <div style={{
            position:"fixed", top:0, left:0, bottom:0, width: isMobile ? "85%" : 320,
            background:"white", zIndex:201, overflowY:"auto",
            boxShadow:"4px 0 24px rgba(0,0,0,0.15)",
            animation:"slideInLeft 0.25s ease"
          }}>
            {/* Header */}
            <div style={{ padding:"20px 24px", borderBottom:"1px solid #f0f0f0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:44, height:44, borderRadius:"50%", background:"#1d7742", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontWeight:800, fontSize:16 }}>W</div>
                <div>
                  <div style={{ fontWeight:700, fontSize:15, color:"#111" }}>wonsil j.</div>
                  <div style={{ fontSize:12, color:"#888" }}>Customer since May 2021</div>
                </div>
              </div>
              <button onClick={() => setAccountOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", padding:8, color:"#666" }}>
                <Icons.X size={22} sw={2} />
              </button>
            </div>

            {/* Promo Banner */}
            <div style={{ margin:"16px 20px", padding:"14px 18px", background:"#1d7742", borderRadius:12, color:"white" }}>
              <div style={{ fontWeight:800, fontSize:13, marginBottom:4 }}>Instacart+ perk alert!</div>
              <div style={{ fontSize:11, opacity:0.9, lineHeight:1.4 }}>$0 delivery fee on grocery and retail orders of $10+. Service fees apply. $35 min. for Costco.</div>
            </div>

            {/* Menu Sections */}
            <div style={{ padding:"12px 8px" }}>
              <div style={{ padding:"8px 16px", fontSize:10, color:"#999", fontWeight:700, letterSpacing:"0.8px", textTransform:"uppercase" }}>Manage your account</div>
              {[
                { icon: Icons.Store, label:"Stores", active:true },
                { icon: Icons.Package, label:"Your orders" },
                { icon: Icons.List, label:"Your lists" },
                { icon: Icons.Heart, label:"Your recipes" },
                { icon: Icons.Settings, label:"Your account settings" },
                { icon: Icons.Zap, label:"Try Instacart+" },
                { icon: Icons.User, label:"Start a family account" },
              ].map(({ icon: IconComp, label, active }) => (
                <div key={label} style={{
                  padding:"12px 16px", display:"flex", alignItems:"center", gap:14,
                  cursor:"pointer", borderRadius:10, margin:"2px 0",
                  background: active ? "#eef9f3" : "transparent",
                  color: active ? "#003d2b" : "#333", fontWeight: active ? 700 : 500, fontSize:14,
                }}>
                  <IconComp size={20} sw={active ? 2.4 : 2} />
                  {label}
                </div>
              ))}
            </div>

            <div style={{ height:1, background:"#f0f0f0", margin:"8px 20px" }} />

            <div style={{ padding:"12px 8px" }}>
              <div style={{ padding:"8px 16px", fontSize:10, color:"#999", fontWeight:700, letterSpacing:"0.8px", textTransform:"uppercase" }}>Credits and promos</div>
              {[
                { icon: Icons.Gift, label:"Invite friends, earn money", highlight:true },
                { icon: Icons.CreditCard, label:"Buy gift cards" },
                { icon: Icons.Tag, label:"Credits, promos, and gift cards" },
                { icon: Icons.CreditCard, label:"Apply: Instacart Mastercard" },
              ].map(({ icon: IconComp, label, highlight }) => (
                <div key={label} style={{
                  padding:"12px 16px", display:"flex", alignItems:"center", gap:14,
                  cursor:"pointer", borderRadius:10, margin:"2px 0",
                  color: highlight ? "#1d7742" : "#333", fontWeight:500, fontSize:14,
                }}>
                  <IconComp size={20} sw={2} />
                  {label}
                </div>
              ))}
            </div>

            <div style={{ height:1, background:"#f0f0f0", margin:"8px 20px" }} />

            <div style={{ padding:"12px 8px" }}>
              <div style={{ padding:"8px 16px", fontSize:10, color:"#999", fontWeight:700, letterSpacing:"0.8px", textTransform:"uppercase" }}>Support</div>
              {[
                { icon: Icons.HelpCircle, label:"Help Center" },
                { icon: Icons.HelpCircle, label:"How Instacart works" },
              ].map(({ icon: IconComp, label }) => (
                <div key={label} style={{
                  padding:"12px 16px", display:"flex", alignItems:"center", gap:14,
                  cursor:"pointer", borderRadius:10, margin:"2px 0",
                  color:"#333", fontWeight:500, fontSize:14,
                }}>
                  <IconComp size={20} sw={2} />
                  {label}
                </div>
              ))}
            </div>

            <div style={{ height:1, background:"#f0f0f0", margin:"8px 20px" }} />

            <div style={{ padding:"12px 8px 24px" }}>
              <div style={{ padding:"8px 16px", fontSize:10, color:"#999", fontWeight:700, letterSpacing:"0.8px", textTransform:"uppercase" }}>Our apps</div>
              {[
                { icon: Icons.ShoppingBag, label:"App Store" },
                { icon: Icons.ShoppingBag, label:"Google Play" },
              ].map(({ icon: IconComp, label }) => (
                <div key={label} style={{
                  padding:"12px 16px", display:"flex", alignItems:"center", gap:14,
                  cursor:"pointer", borderRadius:10, margin:"2px 0",
                  color:"#333", fontWeight:500, fontSize:14,
                }}>
                  <IconComp size={20} sw={2} />
                  {label}
                </div>
              ))}

              <div style={{ marginTop:16, padding:"12px 16px", display:"flex", alignItems:"center", gap:14, cursor:"pointer", borderRadius:10, color:"#333", fontWeight:500, fontSize:14 }}>
                <Icons.LogOut size={20} sw={2} />
                Log out
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding:"16px 24px", borderTop:"1px solid #f0f0f0", fontSize:11, color:"#999" }}>
              Press · Jobs · Terms · Privacy
            </div>
          </div>
        </>
      )}

      {/* ── CART SLIDE PANEL (Right) ── */}
      {cartOpen && (
        <>
          {/* Overlay */}
          <div 
            onClick={() => setCartOpen(false)}
            style={{
              position:"fixed", inset:0, background:"rgba(0,0,0,0.5)",
              zIndex:200, animation:"fadeIn 0.2s ease"
            }}
          />
          {/* Panel */}
          <div style={{
            position:"fixed", top:0, right:0, bottom:0, width: isMobile ? "90%" : 400,
            background:"white", zIndex:201,
            boxShadow:"-4px 0 24px rgba(0,0,0,0.15)",
            animation:"slideInRight 0.25s ease",
            display:"flex", flexDirection:"column"
          }}>
            {/* Header */}
            <div style={{ padding:"16px 20px", borderBottom:"1px solid #f0f0f0", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <button onClick={() => setCartOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", padding:0, color:"#555", display:"flex", alignItems:"center", fontSize:14 }}>
                  ✕
                </button>
                <span style={{ fontWeight:600, fontSize:14, color:"#111" }}>Personal Mega Mart Cart</span>
              </div>
              <div style={{ fontSize:12, color:"#888" }}>Shopping in 94306</div>
            </div>

            {/* Store badge and total */}
            <div style={{ padding:"14px 20px", borderBottom:"1px solid #f0f0f0", display:"flex", alignItems:"center", gap:12, flexShrink:0 }}>
              <div style={{ width:40, height:40, background:"#c8102e", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:8, color:"white", lineHeight:1.1, textAlign:"center", flexShrink:0 }}>
                MEGA<br/>MART
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:700, fontSize:14, color:"#111" }}>Mega Mart</div>
                <div style={{ fontSize:12, color:"#888" }}>Today, 11am</div>
              </div>
              <span style={{ fontWeight:800, fontSize:16, color:"#111" }}>${cartTotal.toFixed(2)}</span>
            </div>

            {/* Cart Content */}
            <div style={{ flex:1, overflowY:"auto", padding:"12px 20px" }}>
              {cartCount === 0 ? (
                <div style={{ textAlign:"center", padding:"60px 20px" }}>
                  <div style={{ fontSize:48, marginBottom:16 }}>🛒</div>
                  <div style={{ fontWeight:700, fontSize:18, color:"#111", marginBottom:8 }}>Your cart is empty</div>
                  <div style={{ fontSize:14, color:"#888" }}>Start shopping to add items</div>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div style={{ marginBottom:8 }}>
                    {Object.entries(cart).map(([id, qty]) => {
                      const product = ALL_PRODUCTS.find(p => p.id === Number(id));
                      if (!product) return null;
                      return (
                        <div key={id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 0", borderBottom:"1px solid #f0f0f0" }}>
                          <div style={{ width:52, height:52, background:"#fff", borderRadius:8, border:"1px solid #e8e8e8", overflow:"hidden", flexShrink:0 }}>
                            <img src={product.img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <div style={{ fontSize:14, fontWeight:600, color:"#111", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{product.name}</div>
                            <div style={{ fontSize:13, color:"#888", marginTop:2 }}>${product.price.toFixed(2)}</div>
                            <button style={{ fontSize:12, color:"#2d6a4f", background:"none", border:"none", cursor:"pointer", padding:0, marginTop:4, display:"flex", alignItems:"center", gap:4 }}>
                              <span>↻</span> Choose replacement
                            </button>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
                            <button onClick={() => onRemove(Number(id))} style={{ width:32, height:32, borderRadius:"50%", border:"1.5px solid #ddd", background:"white", cursor:"pointer", fontWeight:700, fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", color:"#333" }}>−</button>
                            <span style={{ fontWeight:700, fontSize:15, minWidth:24, textAlign:"center" }}>{qty}</span>
                            <button onClick={() => onAdd(Number(id))} style={{ width:32, height:32, borderRadius:"50%", border:"none", background:"#1d7742", color:"white", cursor:"pointer", fontWeight:700, fontSize:18, display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Make this order a gift */}
                  <div style={{ padding:"14px 0", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f0f0f0" }}>
                    <span style={{ fontSize:13, color:"#555", display:"flex", alignItems:"center", gap:8 }}>🎁 Make this order a gift</span>
                    <div style={{ width:42, height:24, background:"#d1d5db", borderRadius:12, cursor:"pointer", position:"relative" }}>
                      <div style={{ width:20, height:20, background:"white", borderRadius:"50%", position:"absolute", top:2, left:2, boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }} />
                    </div>
                  </div>

                  {/* Complete your cart */}
                  <div style={{ marginTop:16, paddingBottom:20 }}>
                    <div style={{ fontWeight:700, fontSize:14, marginBottom:4 }}>Complete your cart</div>
                    <div style={{ fontSize:12, color:"#888", marginBottom:12 }}>Based on items in your cart</div>
                    <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap:10 }}>
                      {SUGG.slice(0, isMobile ? 6 : 9).map(s => (
                        <div key={s.id} style={{ display:"flex", flexDirection:"column" }}>
                          <div style={{ position:"relative", width:"100%", paddingBottom:"100%", background:"#f8f7f4", borderRadius:8, overflow:"hidden" }}>
                            <img src={s.img} alt={s.name} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} />
                            <div style={{ position:"absolute", top:4, right:4 }}>
                              <button onClick={() => onAdd(s.id)} style={{ width:24, height:24, borderRadius:"50%", background:"#1d7742", border:"none", color:"white", fontWeight:800, cursor:"pointer", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }}>+</button>
                            </div>
                          </div>
                          <div style={{ fontSize:11, fontWeight:800, marginTop:4 }}>${s.price.toFixed(2)}</div>
                          <div style={{ fontSize:10, color:"#444", lineHeight:1.35, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{s.name}</div>
                          {s.sponsored && <div style={{ fontSize:9, color:"#bbb" }}>Sponsored</div>}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sticky Footer with checkout */}
            {cartCount > 0 && (
              <div style={{ 
                padding:"16px 20px 24px", 
                borderTop:"1px solid #e8e8e8", 
                background:"white", 
                flexShrink:0
              }}>
                {/* Free delivery progress bar */}
                {(() => {
                  const freeDeliveryThreshold = 35;
                  const remaining = Math.max(0, freeDeliveryThreshold - cartTotal);
                  const isFree = cartTotal >= freeDeliveryThreshold;
                  const progress = Math.min(100, (cartTotal / freeDeliveryThreshold) * 100);
                  
                  return (
                    <div style={{ 
                      background: isFree ? "#003d2b" : "#f0f0f0", 
                      borderRadius:30, padding:"12px 16px", marginBottom:14,
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      transition:"background 0.3s"
                    }}>
                      <div style={{ flex:1, marginRight:12 }}>
                        <div style={{ fontSize:13, color: isFree ? "white" : "#333", fontWeight:600 }}>
                          {isFree 
                            ? "You're getting $0 delivery fee" 
                            : `Add $${remaining.toFixed(2)} to get $0 delivery fee`}
                        </div>
                        {!isFree && (
                          <div style={{ marginTop:6, height:4, background:"#ddd", borderRadius:2, overflow:"hidden" }}>
                            <div style={{ width:`${progress}%`, height:"100%", background:"#003d2b", borderRadius:2, transition:"width 0.3s" }} />
                          </div>
                        )}
                      </div>
                      <div style={{ 
                        display:"flex", alignItems:"center", gap:4,
                        color: isFree ? "white" : "#003d2b", fontWeight:800, fontSize:14
                      }}>
                        <Icons.ShoppingCart size={18} sw={2.5} />
                        {cartCount}
                      </div>
                    </div>
                  );
                })()}
                
                <button style={{ 
                  width:"100%", background:"#1d7742", color:"white", border:"none", 
                  borderRadius:28, padding:"16px 20px", fontSize:16, fontWeight:800, 
                  cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" 
                }}>
                  <span>Go to checkout</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
