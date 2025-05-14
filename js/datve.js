const PRICE = 45000;
const seatMapEl = document.getElementById('seatMap');
const selectedSeats = new Set();

function showBookingForm(time) {
  document.getElementById('bookingForm').style.display = 'block';
  document.getElementById('selectedTime').textContent = time;
  document.getElementById('successSection').classList.add('hidden');
  document.getElementById('invoicePreview').classList.add('hidden');
  renderSeatMap();
  updateTotal();
}

function renderSeatMap() {
  seatMapEl.innerHTML = '';
  selectedSeats.clear();
  const rows = 10;
  const cols = 11;
  const alphabet = 'ABCDEFGHIJ';
  for (let r = 0; r < rows; r++) {
    for (let c = 1; c <= cols; c++) {
      const seatId = `${alphabet[r]}${c}`;
      const seat = document.createElement('div');
      seat.textContent = seatId;
      seat.className = 'seat';
      seat.onclick = () => toggleSeat(seat, seatId);
      seatMapEl.appendChild(seat);
    }
  }
}

function toggleSeat(el, seatId) {
  if (selectedSeats.has(seatId)) {
    selectedSeats.delete(seatId);
    el.classList.remove('selected');
  } else {
    selectedSeats.add(seatId);
    el.classList.add('selected');
  }
  updateTotal();
}

function updateTotal() {
  document.getElementById('totalPrice').textContent = selectedSeats.size * PRICE;
}

function bookTickets() {
  if (selectedSeats.size === 0) {
    alert('Vui lòng chọn ít nhất 1 ghế.');
    return;
  }
  document.getElementById('successSection').classList.remove('hidden');
}

function generateInvoiceImage() {
  const movieTitle = document.getElementById('movieTitle').textContent;
  const time = document.getElementById('selectedTime').textContent;
  const now = new Date();
  const bookingTime = now.toLocaleString('vi-VN');
  const seatList = Array.from(selectedSeats).join(', ');
  const invoiceText = `Phim: ${movieTitle}\nGiờ chiếu: ${time}\nGiờ đặt: ${bookingTime}\nGhế: ${seatList}`;

  const canvas = document.createElement('canvas');
  canvas.width = 600;
  canvas.height = 300;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  ctx.font = '16px Arial';
  const lines = invoiceText.split('\n');
  lines.forEach((line, i) => ctx.fillText(line, 20, 40 + i * 30));

  const dataUrl = canvas.toDataURL('image/png');

  const previewDiv = document.getElementById('invoicePreview');
  previewDiv.innerHTML = `<img src="${dataUrl}" alt="Hóa đơn đặt vé" style="max-width:100%; border:1px solid #ccc;">`;
  previewDiv.classList.remove('hidden');

  const link = document.createElement('a');
  link.download = 'hoa_don_dat_ve.png';
  link.href = dataUrl;
  link.click();
}