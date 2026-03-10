// export default function PriceSummary({
//   nights,
//   price,
//   total,
//   available,
// }) {
//   return (
//     <div className="price-summary">
//       <div><p>{price} × {nights} nights</p></div>
//       <div className="total">Total: ₹{total}</div>

//       {available === false && (
//         <p className="error">Not available for selected dates</p>
//       )}
//     </div>
//   )
// }

export default function PriceSummary({ nights, price, total, available }) {
  return (
    <div className="price-summary">
      <p>
        ₹{price} × {nights} nights
      </p>

      {available && (
        <p>
          <strong>Total: ₹{total}</strong>
        </p>
      )}

      {available === false && (
        <p style={{ color: "red" }}>
          Not available for selected dates
        </p>
      )}
    </div>
  )
}

