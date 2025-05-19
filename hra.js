import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

let currentPlayer = 'circle'
const fields = document.querySelectorAll('.policko')
const statusSymbol = document.querySelector('.stav_symbol')
const resetBtn = document.querySelector('a.btn.reset')

// Aktualizuje ikonku tahu
const updateStatus = () => {
  statusSymbol.src = `images/${currentPlayer}.svg`
  statusSymbol.alt = currentPlayer === 'circle' ? 'Kolečko' : 'Křížek'
}

const handleFieldClick = async (e) => {
  // Můj tah
  const field = e.target
  field.classList.add(currentPlayer === 'circle' ? 'kolecko' : 'krizek')
  field.disabled = true

  const board = Array.from(fields).map(f => {
    if (f.classList.contains('krizek'))  return 'x'
    if (f.classList.contains('kolecko')) return 'o'
    return '_'
  })

  // Kontrola výhry 
  let winner = findWinner(board)
  if (winner === 'x' || winner === 'o' || winner === 'tie') {
    setTimeout(() => {
      alert(
        winner === 'tie'
          ? 'Hra skončila remízou.'
          : `Vyhrál hráč se symbolem ${winner}.`
      )
      location.reload()
    }, 0)
    return
  }

  // Tah AI 
  currentPlayer = 'cross'
  updateStatus()

  const response = await fetch(
    'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ board: board, player: 'x' })
    }
  )
  const data = await response.json()

  const aiIndex = data.position.x + data.position.y * 10
  fields[aiIndex].classList.add('krizek')
  fields[aiIndex].disabled = true

  // Kontrola výhry
  const board2 = Array.from(fields).map(f => {
    if (f.classList.contains('krizek'))  return 'x'
    if (f.classList.contains('kolecko')) return 'o'
    return '_'
  })
  winner = findWinner(board2)
  if (winner === 'x' || winner === 'o' || winner === 'tie') {
    setTimeout(() => {
      alert(
        winner === 'tie'
          ? 'Hra skončila remízou.'
          : `Vyhrál hráč se symbolem ${winner}.`
      )
      location.reload()
    }, 0)
    return
  }

  // Zpět na kolečko
  currentPlayer = 'circle'
  updateStatus()
}

// Připojíme listener na políčka a tlačítko reset
fields.forEach(f => f.addEventListener('click', handleFieldClick))

resetBtn.addEventListener('click', e => {
  e.preventDefault()
  currentPlayer = 'circle'
  fields.forEach(f => {
    f.disabled = false
    f.classList.remove('kolecko', 'krizek')
  })
  updateStatus()
})

updateStatus()
