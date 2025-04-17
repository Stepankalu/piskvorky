document.addEventListener('DOMContentLoaded', () => {
    // 1) Kdo je právě na tahu
    let currentPlayer = 'circle';
  
    // 2) Všechny políčka a stavový symbol
    const fields = document.querySelectorAll('.policko');
    const statusSymbol = document.querySelector('.stav_symbol');
  
    // 3) Tlačítko pro restart
    const resetBtn = document.querySelector('a.btn.reset');
  
    // 4) Funkce na překreslení ikonky tahu
    function updateStatus() {
      statusSymbol.src = `images/${currentPlayer}.svg`;
      statusSymbol.alt = currentPlayer === 'circle' ? 'Kolečko' : 'Křížek';
    }
  
    // 5) Co se stane po kliknutí na políčko
    function handleFieldClick(e) {
      const field = e.target;
      // vykreslí správný symbol
      field.classList.add(currentPlayer === 'circle' ? 'kolecko' : 'krizek');
      // zablokuje opakované kliknutí
      field.disabled = true;
      // přepne hráče
      currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
      updateStatus();
    }
  
    // 6) Připojí event listener na každé políčko
    fields.forEach(field => {
      field.addEventListener('click', handleFieldClick);
    });
  
    // 7) Restart hry: smaže třídy i stav políček a vrátí kolečko na tah
    resetBtn.addEventListener('click', e => {
      e.preventDefault();     
      currentPlayer = 'circle';
      fields.forEach(field => {
        field.disabled = false;
        field.classList.remove('kolecko', 'krizek');
      });
      updateStatus();
    });
  
    // první vykreslení
    updateStatus();
  });
  