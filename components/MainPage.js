// Hit the food - MainPage Component
// Reference copy extracted from index.html

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
const MainPage = ({ onStoreClick, cart, onAdd, onRemove, onProductClick }) => {
  const [search, setSearch]         = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [navActive, setNavActive]   = useState("Home");
  const [cartOpen, setCartOpen]     = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [showMore, setShowMore]     = useState(false);
  const rootRef  = useRef(null);
  const cartBtnRef = useRef(null);
  const winW     = useContainerWidth(rootRef);

  // ── fluid breakpoints (all derived from container width)
  const isMobile  = winW > 0 && winW < 600;
  const isTablet  = winW > 0 && winW < 920;
  const sideW     = isMobile ? 0 : isTablet ? 64 : 248;
  const contentW  = winW - sideW;               // available width
  // Increased padding for more breathing room
  const rightPad  = isMobile ? 20 : Math.round(Math.min(64, contentW * 0.045));
  const leftPad   = isMobile ? 20 : Math.round(Math.min(56, contentW * 0.04));
  const bodyPad   = rightPad; // backward compat for banner inner padding

  // ── chip row: N chips fill exactly visibleArea ──────────────────────────
  const chipGap     = 18;
  const visibleArea = contentW - leftPad - rightPad;
  const N_chips     = isMobile ? 3 : isTablet ? 5 : Math.max(5, Math.floor(visibleArea / 100));
  const chipW       = Math.round((visibleArea - chipGap * (N_chips - 1)) / N_chips);
  
  // Visible store count (excluding "Show all" chip, max 12)
  const visibleStoreCount = Math.min(12, N_chips - 1);

  // ── flyer row: N cards visible ───
  const flyerGap  = 16;
  const N_flyer   = isMobile ? 2 : isTablet ? 3 : Math.max(4, Math.floor(visibleArea / 200));
  const flyerW    = Math.round((visibleArea - flyerGap * (N_flyer - 1)) / N_flyer);
  
  // Visible flyer count (max 12)
  const visibleFlyerCount = Math.min(12, N_flyer);

  const cartCount = Object.values(cart).reduce((a,b)=>a+b, 0);

  const NAV_ITEMS = [
    { icon: Icons.Home, label:"Home" },
    { icon: Icons.Utensils, label:"Restaurants" },
    { icon: Icons.CreditCard, label:"EBT" },
    { icon: Icons.Tag, label:"Offers" },
    { icon: Icons.ShoppingCart, label:"Grocery" },
    { icon: Icons.Zap, label:"Convenience" },
    { icon: Icons.Wine, label:"Alcohol" },
    { icon: Icons.ShoppingBag, label:"Retail" },
  ];

  const NAV_MORE = [
    { icon: Icons.Pickup, label:"Pickup" },
    { icon: Icons.Truck, label:"Local" },
    { icon: Icons.Package, label:"Wholesale" },
    { icon: Icons.Pharmacy, label:"Pharmacy" },
    { icon: Icons.Pets, label:"Pets" },
    { icon: Icons.Beauty, label:"Beauty" },
    { icon: Icons.Gift, label:"Gifts" },
  ];

  const SectionHeader = ({ title, sub, cta }) => (
    <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:20 }}>
      <div>
        <h2 style={{ fontWeight:800, fontSize: isMobile ? 18 : 21, color:"#0a0a0a", letterSpacing:"-0.4px", lineHeight:1.2 }}>{title}</h2>
        {sub && <div style={{ fontSize:13, color:"#777", marginTop:4, fontWeight:500 }}>{sub}</div>}
      </div>
      {cta && (
        <button style={{ background:"none", border:"none", color:"#0d5c3f", fontWeight:700, fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", gap:4, whiteSpace:"nowrap", flexShrink:0, marginLeft:14, padding:"4px 0" }}>
          {cta} <span style={{ fontSize:15, fontWeight:600 }}>›</span>
        </button>
      )}
    </div>
  );

  return (
    <div ref={rootRef} style={{ display:"flex", minHeight:"100vh", fontFamily:"'Noto Sans KR',sans-serif", background:"white", width:"100%" }}>

      {/* ── LEFT SIDEBAR ── */}
      {!isMobile && (
        <aside style={{
          width:sideW, minWidth:sideW,
          background:"white",
          borderRight:"1px solid #efefef",
          position:"sticky", top:0, height:"100vh",
          overflowY:"auto", flexShrink:0,
          display:"flex", flexDirection:"column",
          transition:"width 0.2s",
          paddingLeft: isTablet ? 0 : 16,
        }}>
          {/* Logo with Hamburger */}
          <div style={{
            padding: isTablet ? "20px 0" : "22px 18px 18px",
            borderBottom:"1px solid #f5f5f5",
            display:"flex", alignItems:"center",
            justifyContent: isTablet ? "center" : "flex-start",
            gap:12,
          }}>
            {!isTablet && (
              <button 
                onClick={() => setAccountOpen(true)}
                style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", alignItems:"center", justifyContent:"center", color:"#333" }}
              >
                <Icons.Menu size={22} sw={2.2} />
              </button>
            )}
            <img src={LOGO_IMG} alt="Hit the Food" style={{ height: isTablet ? 28 : 32, objectFit:"contain" }} />
          </div>

          {/* Nav */}
          <nav style={{ padding: isTablet ? "12px 0" : "14px 12px", flex:1 }}>
            {NAV_ITEMS.map(({ icon: IconComp, label }) => {
              const active = navActive === label;
              return (
                <div key={label} onClick={() => setNavActive(label)}
                  style={{
                    padding: isTablet ? "12px 0" : "11px 16px",
                    cursor:"pointer",
                    display:"flex", alignItems:"center",
                    justifyContent: isTablet ? "center" : "flex-start",
                    gap:12, borderRadius:10, margin:"2px 0",
                    fontWeight: active ? 700 : 500, fontSize:14.5,
                    color: active ? "#003d2b" : "#444",
                    background: active ? "#eef9f3" : "transparent",
                    transition:"all 0.15s",
                  }}>
                  <span style={{ flexShrink:0, display:"flex", alignItems:"center" }}>
                    <IconComp size={20} sw={active ? 2.4 : 2} />
                  </span>
                  {!isTablet && label}
                </div>
              );
            })}

            {/* Show more/less */}
            {!isTablet && (
              <>
                <div 
                  onClick={() => setShowMore(!showMore)}
                  style={{
                    padding:"11px 16px", cursor:"pointer", display:"flex", alignItems:"center",
                    gap:12, borderRadius:10, margin:"2px 0", fontWeight:500, fontSize:14.5, color:"#444",
                    transition:"all 0.15s",
                  }}>
                  <span style={{ flexShrink:0, display:"flex", alignItems:"center", transform: showMore ? "rotate(180deg)" : "rotate(0)", transition:"transform 0.2s" }}>
                    <Icons.ChevronDown size={20} sw={2} />
                  </span>
                  {showMore ? "Show less" : "Show more"}
                </div>

                {showMore && NAV_MORE.map(({ icon: IconComp, label }) => {
                  const active = navActive === label;
                  return (
                    <div key={label} onClick={() => setNavActive(label)}
                      style={{
                        padding:"11px 16px", cursor:"pointer", display:"flex", alignItems:"center",
                        gap:12, borderRadius:10, margin:"2px 0",
                        fontWeight: active ? 700 : 500, fontSize:14.5,
                        color: active ? "#003d2b" : "#444",
                        background: active ? "#eef9f3" : "transparent",
                        transition:"all 0.15s",
                      }}>
                      <span style={{ flexShrink:0, display:"flex", alignItems:"center" }}>
                        <IconComp size={20} sw={active ? 2.4 : 2} />
                      </span>
                      {label}
                    </div>
                  );
                })}
              </>
            )}
          </nav>

          {!isTablet && (
            <>
              <div style={{ height:1, background:"#f0f0f0", margin:"0 16px" }} />
              <div style={{ padding:"14px 12px 20px" }}>
                <div style={{ padding:"6px 16px 8px", fontSize:10, color:"#bbb", fontWeight:700, letterSpacing:"0.8px", textTransform:"uppercase" }}>You</div>
                {[
                  { icon: Icons.Newspaper, label:"Flyers", badge:"New" },
                  { icon: Icons.User, label:"Account" },
                ].map(({ icon: IconComp, label, badge }) => {
                  const isActive = navActive === label;
                  return (
                    <div key={label} 
                      onClick={() => label === "Account" ? setAccountOpen(true) : setNavActive(label)}
                      style={{ 
                        padding:"11px 16px", cursor:"pointer", display:"flex", alignItems:"center", gap:12, 
                        fontSize:14.5, color: isActive ? "#003d2b" : "#444", borderRadius:10, margin:"2px 0", 
                        fontWeight: isActive ? 700 : 500, 
                        background: isActive ? "#eef9f3" : "transparent",
                        transition:"all 0.15s" 
                      }}>
                      <span style={{ flexShrink:0, display:"flex", alignItems:"center" }}>
                        <IconComp size={20} sw={isActive ? 2.4 : 2} />
                      </span>
                      {label}
                      {badge && !isActive && <span style={{ marginLeft:"auto", background:"linear-gradient(135deg, #0d5c3f 0%, #0a4a33 100%)", color:"white", borderRadius:20, fontSize:9, fontWeight:800, padding:"3px 9px" }}>{badge}</span>}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </aside>
      )}

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex:1, minWidth:0, display:"flex", flexDirection:"column" }}>

        {/* Sticky Header */}
        <header style={{
          background:"white", borderBottom:"1px solid #f0f0f0",
          padding: `12px ${rightPad}px 12px ${leftPad}px`,
          display:"flex", alignItems:"center", gap:12,
          position:"sticky", top:0, zIndex:50, flexShrink:0,
        }}>
          {/* Hamburger menu for mobile */}
          {isMobile && (
            <button 
              onClick={() => setAccountOpen(true)}
              style={{ background:"none", border:"none", cursor:"pointer", padding:4, display:"flex", alignItems:"center", justifyContent:"center", color:"#333", flexShrink:0 }}
            >
              <Icons.Menu size={22} sw={2.2} />
            </button>
          )}
          {isMobile && (
            <img src={LOGO_IMG} alt="Hit the Food" style={{ height:24, objectFit:"contain", flexShrink:0 }} />
          )}
          {/* Search */}
          <div style={{ flex:1, position:"relative" }}>
            <svg style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
              placeholder="Search products, stores, and recipes"
              style={{
                width:"100%", padding:"11px 14px 11px 40px",
                border:`2px solid ${searchFocus ? "#003d2b" : "#ebebeb"}`,
                borderRadius:12, fontSize:13.5, outline:"none",
                background: searchFocus ? "white" : "#f7f7f7",
                transition:"border-color 0.15s, background 0.15s", color:"#111",
              }}
            />
          </div>
          {!isMobile && (
            <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:12.5, color:"#333", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, padding:"8px 10px", borderRadius:8, border:"1.5px solid #ebebeb" }}>
              <span style={{ display:"flex", alignItems:"center" }}><Icons.MapPin size={14} sw={2.2} /></span>
              <span style={{ fontWeight:500 }}>150 Grant Ave</span>
              <span style={{ fontSize:10, color:"#aaa", marginLeft:1 }}>▼</span>
            </div>
          )}
          {/* Cart */}
          <div style={{ position:"relative", flexShrink:0 }} ref={cartBtnRef}>
            <button 
              onClick={() => setCartOpen(true)}
              style={{
                background: cartCount > 0 ? "#003d2b" : "#f7f7f7",
                color: cartCount > 0 ? "white" : "#555",
                border:"none", borderRadius:10,
                padding: cartCount > 0 ? "9px 16px" : "9px 14px",
                cursor:"pointer", fontWeight:700, fontSize:13.5,
                display:"flex", alignItems:"center", gap:6,
                transition:"background 0.15s",
              }}>
              <Icons.ShoppingCart size={18} sw={2.5} />
              {cartCount > 0
                ? <span style={{ fontWeight:800 }}>{cartCount} item{cartCount > 1 ? "s" : ""}</span>
                : <span style={{ fontSize:12 }}>Cart</span>
              }
            </button>
          </div>
        </header>
        <div style={{ background:"linear-gradient(90deg, #C41230 0%, #8B0D25 100%)", padding:"12px 20px", textAlign:"center" }}>
          <span style={{ fontSize:32, color:"white", fontWeight:600, letterSpacing:"0.3px" }}>Launching April 2026 — Stay tuned for something amazing!</span>
        </div>

        {/* Scrollable Body — 100% width, fluid padding */}
        <div style={{ flex:1, padding:`36px ${rightPad}px 100px ${leftPad}px`, width:"100%", overflowY:"auto" }}>

          {/* ── HOME CONTENT ── */}
          {navActive !== "Flyers" && navActive !== "Account" && (
          <>
          {/* ── YOUR STORES ── */}
          <section style={{ marginBottom:44 }}>
            <SectionHeader title="Your stores" cta="View all" />
            <div style={{ display:"flex", gap:chipGap }}>
              {YOUR_STORES.slice(0, visibleStoreCount).map(s => (
                <StoreChip key={s.id} store={s} chipW={chipW} onClick={() => s.id === "megamart" && onStoreClick()} />
              ))}
              {/* Show all chip */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", width:chipW, flexShrink:0 }}>
                <div style={{ width:Math.max(62, chipW-6), height:Math.max(62, chipW-6), borderRadius:"50%", background:"#f8f8f8", border:"2px dashed #ddd", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, color:"#bbb" }}>›</div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:12, fontWeight:600, color:"#1a1a1a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"100%" }}>Show all</div>
                  <div style={{ fontSize:11, color:"#888", height:15 }}>125 stores</div>
                </div>
              </div>
            </div>
          </section>

          {/* ── PROMO BANNERS — pure gradient, no img dependency ── */}
          <section style={{ marginBottom:40 }}>
            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:18 }}>

              {/* Banner 1 — Delivery */}
              <div style={{
                borderRadius:20, cursor:"pointer", position:"relative", overflow:"hidden",
                minHeight: isMobile ? 150 : 170,
                background:"linear-gradient(130deg,#062416 0%,#0a3d26 45%,#0f5c38 100%)",
              }}>
                {/* layered texture */}
                <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 80% 80% at 90% 110%,rgba(0,200,100,0.18) 0%,transparent 60%)" }} />
                <div style={{ position:"absolute", top:-40, right:-40, width:220, height:220, borderRadius:"50%", border:"1px solid rgba(126,255,197,0.08)" }} />
                <div style={{ position:"absolute", top:10, right:20, width:110, height:110, borderRadius:"50%", border:"1px solid rgba(126,255,197,0.06)" }} />
                {/* content */}
                <div style={{ position:"relative", zIndex:2, padding: isMobile ? "22px 20px" : `26px ${Math.min(36, bodyPad + 8)}px`, display:"flex", alignItems:"center", justifyContent:"space-between", height:"100%", minHeight:"inherit" }}>
                  <div>
                    <div style={{ fontSize:9.5, color:"rgba(126,255,197,0.65)", fontWeight:700, letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:7 }}>Limited offer</div>
                    <div style={{ color:"#7effc5", fontWeight:900, fontSize: isMobile ? 28 : Math.round(Math.min(36, contentW * 0.042)), lineHeight:1.05, marginBottom:5 }}>$0 delivery</div>
                    <div style={{ color:"rgba(255,255,255,0.82)", fontSize:13, marginBottom:6 }}>on your first 3 orders</div>
                    <div style={{ fontSize:9, color:"rgba(255,255,255,0.28)", marginBottom:14 }}>Svc fees apply. 3 orders in 14 days.</div>
                    <button style={{ background:"#7effc5", border:"none", borderRadius:10, padding:"8px 20px", fontWeight:800, fontSize:12.5, cursor:"pointer", color:"#062016" }}>Shop now</button>
                  </div>
                  <div style={{ fontSize: isMobile ? 52 : Math.round(Math.min(78, contentW * 0.08)), lineHeight:1, flexShrink:0, marginLeft:10 }}>🚚</div>
                </div>
              </div>

              {/* Banner 2 — NYT Cooking */}
              <div style={{
                borderRadius:20, cursor:"pointer", position:"relative", overflow:"hidden",
                minHeight: isMobile ? 150 : 170,
                background:"linear-gradient(130deg,#fdf6ec 0%,#f9e8cb 60%,#f2d9ae 100%)",
              }}>
                <div style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 80% at 100% 120%,rgba(200,140,40,0.12) 0%,transparent 60%)" }} />
                <div style={{ position:"absolute", bottom:-50, right:-20, width:220, height:220, borderRadius:"50%", border:"1px solid rgba(160,100,20,0.08)" }} />
                <div style={{ position:"relative", zIndex:2, padding: isMobile ? "22px 20px" : `26px ${Math.min(36, bodyPad + 8)}px`, display:"flex", alignItems:"center", justifyContent:"space-between", height:"100%", minHeight:"inherit" }}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:9 }}>
                      <span style={{ color:"#c0392b", fontWeight:900, fontSize:13, fontStyle:"italic" }}>𝕹</span>
                      <span style={{ fontWeight:800, fontSize:10.5, color:"#666", letterSpacing:"1px" }}>NYT COOKING</span>
                    </div>
                    <div style={{ fontWeight:900, fontSize: isMobile ? 18 : Math.round(Math.min(26, contentW * 0.032)), lineHeight:1.25, color:"#111", marginBottom:14 }}>
                      Easy slow cooker<br/>soups & stews
                    </div>
                    <button style={{ background:"#111", color:"white", border:"none", borderRadius:10, padding:"8px 20px", fontWeight:800, fontSize:12.5, cursor:"pointer" }}>Explore recipes</button>
                  </div>
                  <div style={{ fontSize: isMobile ? 52 : Math.round(Math.min(78, contentW * 0.08)), lineHeight:1, flexShrink:0, marginLeft:10 }}>🍲</div>
                </div>
              </div>
            </div>
          </section>

          {/* ── FLYER DEALS ── */}
          <section style={{ marginBottom:44 }}>
            <SectionHeader title="Flyer deals Mar 4–10" sub="At Safeway · Up to 58% off" cta="See all deals" />
            <div style={{ display:"flex", gap:flyerGap }}>
              {FLYER_PRODUCTS.slice(0, visibleFlyerCount).map(p => (
                <FlyerCard key={p.id} p={p} onAdd={onAdd} onRemove={onRemove} cart={cart} w={flyerW} onClick={onProductClick} />
              ))}
            </div>
          </section>

          {/* ── BEYOND GROCERY ── */}
          <section style={{ marginBottom:44 }}>
            <SectionHeader title="Beyond grocery" cta="View all" />
            <div style={{ display:"flex", gap:chipGap }}>
              {BEYOND_STORES.slice(0, visibleStoreCount).map(s => (
                <StoreChip key={s.id} store={s} chipW={chipW} onClick={() => {}} />
              ))}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:8, cursor:"pointer", width:chipW, flexShrink:0 }}>
                <div style={{ width:Math.max(62, chipW-6), height:Math.max(62, chipW-6), borderRadius:"50%", background:"#f8f8f8", border:"2px dashed #ddd", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, color:"#bbb" }}>›</div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:12, fontWeight:600, color:"#1a1a1a", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:"100%" }}>Show all</div>
                  <div style={{ fontSize:11, color:"#888", height:15 }}>43 stores</div>
                </div>
              </div>
            </div>
          </section>

          {/* ── STORES TO SAVE ── */}
          <section style={{ marginBottom:56 }}>
            <SectionHeader title="Stores to help you save" cta="View all" />
            <div style={{
              display:"grid",
              gridTemplateColumns: isMobile
                ? "1fr 1fr"
                : isTablet
                ? "1fr 1fr 1fr"
                : "repeat(5, 1fr)",
              gap:16,
            }}>
              {SAVE_STORES.map((s) => (
                <div key={s.id}
                  style={{
                    background:s.color, borderRadius:18, padding:"18px 20px",
                    display:"flex", alignItems:"center", gap:16,
                    cursor:"pointer", transition:"transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}
                >
                  <div style={{ width:46, height:46, background:"rgba(255,255,255,0.8)", borderRadius:14, display:"flex", alignItems:"center", justifyContent:"center", fontSize:23, flexShrink:0 }}>
                    {s.icon}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:800, fontSize:14, color:"#111", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{s.name}</div>
                    <div style={{ fontSize:11.5, color:"#666", marginTop:3 }}>{s.tag}</div>
                  </div>
                  <span style={{ fontSize:16, color:"#bbb", flexShrink:0 }}>›</span>
                </div>
              ))}
            </div>
          </section>
          </>
          )}

          {/* ── FLYERS CONTENT ── */}
          {navActive === "Flyers" && (
          <>
            {/* Header */}
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24 }}>
              <div>
                <h1 style={{ fontSize:28, fontWeight:800, color:"#111", marginBottom:6 }}>Flyers</h1>
                <p style={{ fontSize:13, color:"#888" }}>
                  Images for demonstration only. Prices and products may vary. 
                  <span style={{ marginLeft:4, cursor:"pointer" }}>ⓘ</span>
                </p>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", color:"#111", fontSize:14, fontWeight:600 }}>
                <span style={{ fontSize:16 }}>🔔</span>
                Notifications
              </div>
            </div>

            {/* Store Sections */}
            {FLYER_STORES.map(store => (
              <section key={store.id} style={{ marginBottom:40 }}>
                {/* Store Header */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ 
                      width:44, height:44, background: store.color, borderRadius:10, 
                      display:"flex", alignItems:"center", justifyContent:"center", 
                      color:"white", fontWeight:900, fontSize:11 
                    }}>
                      {store.name.slice(0,2).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:16, color:"#111" }}>{store.name}</div>
                      <div style={{ fontSize:13, color:"#666" }}>Flyer deals {store.dateRange}</div>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <span style={{ fontSize:14, fontWeight:600, color:"#111", cursor:"pointer" }}>Shop flyer ›</span>
                    <div style={{ display:"flex", gap:6 }}>
                      <button style={{ width:32, height:32, borderRadius:"50%", border:"1px solid #ddd", background:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#888" }}>‹</button>
                      <button style={{ width:32, height:32, borderRadius:"50%", border:"1px solid #ddd", background:"white", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"#888" }}>›</button>
                    </div>
                  </div>
                </div>

                {/* Products Row */}
                <div style={{ display:"flex", gap:flyerGap, overflowX:"auto" }} className="hide-scrollbar">
                  {/* Flyer Image Card */}
                  <div style={{ 
                    width:flyerW, minWidth:flyerW, height: flyerW * 1.5, borderRadius:18, overflow:"hidden", 
                    background:`linear-gradient(180deg, ${store.color}22 0%, ${store.color}44 100%)`,
                    display:"flex", flexDirection:"column", justifyContent:"flex-end",
                    position:"relative", cursor:"pointer", flexShrink:0,
                    border:"1px solid #e8e8e8"
                  }}>
                    <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <div style={{ 
                        width: flyerW * 0.5, height: flyerW * 0.5, background: store.color, borderRadius:12, 
                        display:"flex", alignItems:"center", justifyContent:"center", 
                        color:"white", fontWeight:900, fontSize: flyerW * 0.1
                      }}>
                        {store.name.slice(0,3).toUpperCase()}
                      </div>
                    </div>
                    <div style={{ 
                      background: store.color, color:"white", padding:"10px 16px", 
                      textAlign:"center", fontWeight:700, fontSize:13 
                    }}>
                      {store.dateRange}
                    </div>
                  </div>

                  {/* Product Cards - use FlyerCard component */}
                  {store.products.slice(0, 10).map(p => (
                    <FlyerCard key={p.id} p={p} onAdd={onAdd} onRemove={onRemove} cart={cart} w={flyerW} onClick={onProductClick} />
                  ))}
                </div>
              </section>
            ))}
          </>
          )}

        </div>

        {/* ── MOBILE BOTTOM NAV ── */}
        {isMobile && (
          <nav style={{
            position:"fixed", bottom:0, left:0, right:0,
            background:"white", borderTop:"1px solid #efefef",
            display:"flex", justifyContent:"space-around",
            padding:"8px 0 12px", zIndex:100,
          }}>
            {[
              { icon: Icons.Home, label:"Home" },
              { icon: Icons.Search, label:"Search" },
              { icon: Icons.ShoppingBag, label:"Retail" },
              { icon: Icons.Tag, label:"Offers" },
              { icon: Icons.User, label:"Account" },
            ].map(({ icon: IconComp, label }) => (
              <div key={label} onClick={() => label === "Account" ? setAccountOpen(true) : setNavActive(label)} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer" }}>
                <span style={{ color: navActive === label ? "#003d2b" : "#888" }}><IconComp size={22} sw={navActive === label ? 2.4 : 1.8} /></span>
                <span style={{ fontSize:9.5, color: navActive === label ? "#003d2b" : "#888", fontWeight: navActive === label ? 700 : 500 }}>{label}</span>
              </div>
            ))}
          </nav>
        )}
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
            background:"white", zIndex:201, overflowY:"auto",
            boxShadow:"-4px 0 24px rgba(0,0,0,0.15)",
            animation:"slideInRight 0.25s ease",
            display:"flex", flexDirection:"column"
          }}>
            {/* Header */}
            <div style={{ padding:"16px 20px", borderBottom:"1px solid #f0f0f0", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
              <button onClick={() => setCartOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", padding:8, color:"#666", display:"flex", alignItems:"center" }}>
                <Icons.X size={24} sw={2} />
              </button>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontWeight:700, fontSize:15, color:"#111" }}>Carts</div>
                <div style={{ fontSize:12, color:"#888" }}>Shopping in 94306</div>
              </div>
              <div style={{ width:40 }} />
            </div>

            {/* Cart Content */}
            <div style={{ flex:1, overflowY:"auto", padding:"16px 20px" }}>
              {cartCount === 0 ? (
                <div style={{ textAlign:"center", padding:"60px 20px" }}>
                  <div style={{ fontSize:48, marginBottom:16 }}>🛒</div>
                  <div style={{ fontWeight:700, fontSize:18, color:"#111", marginBottom:8 }}>Your cart is empty</div>
                  <div style={{ fontSize:14, color:"#888" }}>Start shopping to add items</div>
                </div>
              ) : (
                <>
                  {/* Store Cart */}
                  <div style={{ background:"#f8f8f8", borderRadius:12, padding:16, marginBottom:16 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                      <div style={{ width:44, height:44, background:"#fff", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:10, color:"#003d2b", border:"1px solid #e8e8e8" }}>
                        MEGA
                      </div>
                      <div>
                        <div style={{ fontWeight:700, fontSize:14, color:"#111" }}>Mega Mart</div>
                        <div style={{ fontSize:12, color:"#888" }}>Personal Cart</div>
                      </div>
                    </div>
                    <div style={{ fontSize:12, color:"#1d7742", fontWeight:600, marginBottom:12 }}>+ Delivery by 3:00pm</div>
                    
                    {/* Cart Items Preview */}
                    <div style={{ display:"flex", gap:8, marginBottom:16 }}>
                      {Object.entries(cart).slice(0, 3).map(([id]) => (
                        <div key={id} style={{ width:48, height:48, background:"#fff", borderRadius:8, border:"1px solid #e8e8e8" }} />
                      ))}
                    </div>

                    <button 
                      onClick={onStoreClick}
                      style={{
                        width:"100%", padding:"14px 20px",
                        background:"#003d2b", color:"white", border:"none",
                        borderRadius:12, fontWeight:700, fontSize:14,
                        cursor:"pointer"
                      }}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
