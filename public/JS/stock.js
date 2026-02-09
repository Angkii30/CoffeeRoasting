// alert('JS โหลดแล้ว');
const table = document.querySelector('#stockTable');
const searchInput = document.querySelector('#searchInput');
const dateFilter = document.querySelector('#dateFilter');

function getRows() {
  return table.querySelectorAll('tbody tr');
}

// ===== SEARCH =====
if (searchInput) {
  searchInput.addEventListener('keyup', () => {
    const keyword = searchInput.value.toLowerCase();

    getRows().forEach(row => {
      row.style.display = row.innerText.toLowerCase().includes(keyword)
        ? ''
        : 'none';
    });
  });
}

// ===== DATE FILTER =====
if (dateFilter) {
  dateFilter.addEventListener('change', () => {
    const selectedDate = dateFilter.value;

    getRows().forEach(row => {
      const dateText = row.children[2].innerText; // วันที่รับเข้า
      const rowDate = convertDate(dateText);

      row.style.display =
        !selectedDate || rowDate === selectedDate ? '' : 'none';
    });
  });
}

// แปลง 12/01/68 → 2025-01-12
function convertDate(thDate) {
  const [d, m, y] = thDate.split('/');
  return `20${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

// ===== DELETE =====
document.querySelectorAll('.delete').forEach(btn => {
  btn.addEventListener('click', () => {
    if (confirm('ต้องการลบรายการนี้หรือไม่')) {
      btn.closest('tr').remove();
      updateTotal();
    }
  });
});

// ===== TOTAL KG =====
function updateTotal() {
  let total = 0;

  getRows().forEach(row => {
    const qty = parseInt(row.querySelector('.qty').innerText);
    total += qty;
  });

  console.log('ปริมาณรวมทั้งหมด:', total, 'KG');
}

updateTotal();
