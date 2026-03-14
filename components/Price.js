// Hit the food - Price Component
// Reference copy extracted from index.html

const Price = ({ value, size }) => {
  const [d, c] = value.toFixed(2).split(".");
  const fs = size === "lg" ? 20 : 16;
  const ss = size === "lg" ? 11 : 9;
  return (
    <span style={{ fontWeight:800, fontSize:fs, lineHeight:1 }}>
      <sup style={{ fontSize:ss, fontWeight:800, verticalAlign:"super" }}>$</sup>
      {d}<sup style={{ fontSize:ss, fontWeight:800, verticalAlign:"super" }}>{c}</sup>
    </span>
  );
};
