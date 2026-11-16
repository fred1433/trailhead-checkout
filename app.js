const PRICE = 18;
const qty = document.getElementById('qty');
const fmt = (n) => '$' + n.toFixed(2);
function render() {
  const n = Math.max(1, parseInt(qty.value, 10) || 1);
  document.getElementById('subtotal').textContent = fmt(PRICE * n);
  document.getElementById('total').textContent = fmt(PRICE * n);
}
qty.addEventListener('input', render);
document.getElementById('pay').addEventListener('click', () => {
  document.getElementById('status').textContent = 'Order placed.';
});
render();
