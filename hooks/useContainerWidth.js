// Hit the food - useContainerWidth Hook
// Reference copy extracted from index.html

// ── CONTAINER WIDTH HOOK (iframe-safe ResizeObserver) ─────────────────────
const useContainerWidth = (ref) => {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => setW(entry.contentRect.width));
    ro.observe(ref.current);
    setW(ref.current.offsetWidth);
    return () => ro.disconnect();
  }, []);
  return w;
};
