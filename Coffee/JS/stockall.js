// ===== MOCK STOCK DATA =====
const stockData = {
  cherry: 180,
  kala: 95,
  san: 40,
  roast: 12
};

// ===== LOAD STOCK VALUE =====
document.querySelectorAll('.stock-card').forEach(card => {
  const type = card.dataset.type;
  const valueEl = card.querySelector('.stock-value');
  const amount = stockData[type] || 0;

  valueEl.textContent = amount + ' KG';

  // เตือน stock ใกล้หมด
  if (amount <= 20) {
    valueEl.style.color = '#ff4d4f';
    valueEl.textContent += ' ⚠️';
  }
});

// ===== NAVIGATE FUNCTION =====
function goStock(page) {
  window.location.href = page;
}

// ===== CARD HOVER EFFECT =====
document.querySelectorAll('.stock-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-6px)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});
