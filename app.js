const PRICE = 18;
const CODES = { TRAIL10: 0.10 };
const qty = document.getElementById('qty');
const fmt = (n) => '$' + n.toFixed(2);
let discountRate = 0;
function render() {
  const n = Math.max(1, parseInt(qty.value, 10) || 1);
  const subtotal = PRICE * n;
  const discount = subtotal * discountRate;
  document.getElementById('subtotal').textContent = fmt(subtotal);
  document.getElementById('discount').textContent = '-' + fmt(discount);
  document.getElementById('total').textContent = fmt(subtotal - discount);
}
qty.addEventListener('input', render);
document.getElementById('apply').addEventListener('click', () => {
  const code = document.getElementById('code').value.trim().toUpperCase();
  const msg = document.getElementById('code-msg');
  if (CODES[code]) {
    discountRate += CODES[code];
    msg.textContent = 'Code applied: 10% off.';
  } else {
    msg.textContent = 'This code is not valid.';
  }
  render();
});
document.getElementById('pay').addEventListener('click', () => {
  document.getElementById('status').textContent = 'Order placed.';
});
render();
