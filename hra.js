import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

document.addEventListener('DOMContentLoaded', () => {
  // 1) Kdo je právě na tahu
  let currentPlayer = 'circle';

  // 2) Všechna políčka a stavový symbol
  const fields = document.querySelectorAll('.policko');
  const statusSymbol = document.querySelector('.stav_symbol');

  // 3) Tlačítko pro restart
  const resetBtn = document.querySelector('a.btn.reset');

  // 4) Vykreslení ikonky tahu
  function updateStatus() {
    statusSymbol.src = `images/${currentPlayer}.svg`;
    statusSymbol.alt = currentPlayer === 'circle' ? 'Kolečko' : 'Křížek';
  }

  // 5) Co se stane po kliknutí na políčko
  function handleFieldClick(e) {
    const field = e.target;
    const symbolClass = currentPlayer === 'circle' ? 'kolecko' : 'krizek';
    field.classList.add(symbolClass);
    field.disabled = true;

    // Sestavíme pole pro findWinner: 'x', 'o' nebo '_'
    const board = Array.from(fields).map(f => {
      if (f.classList.contains('krizek'))  return 'x';
      if (f.classList.contains('kolecko')) return 'o';
      return '_';
    });

    // Zjistíme výsledek
    const winner = findWinner(board);

    if (winner === 'x' || winner === 'o') {
      // Timeout, aby se symbol stihl vykreslit
      setTimeout(() => {
        alert(`Vyhrál hráč se symbolem ${winner}.`);
        location.reload();
      }, 0);
      return;
    }

    if (winner === 'tie') {
      setTimeout(() => {
        alert('Hra skončila remízou.');
        location.reload();
      }, 0);
      return;
    }

    // Žádný vítěz, přepneme hráče a aktualizujeme stav
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    updateStatus();
  }

  // 6) Připojení listenerů
  fields.forEach(field => {
    field.addEventListener('click', handleFieldClick);
  });

  // 7) Reset hry
  resetBtn.addEventListener('click', e => {
    e.preventDefault();
    currentPlayer = 'circle';
    fields.forEach(field => {
      field.disabled = false;
      field.classList.remove('kolecko', 'krizek');
    });
    updateStatus();
  });

  // První vykreslení
  updateStatus();
});
