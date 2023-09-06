'use strict';
const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 2,
  B: 4,
  C: 6,
  D: 8,
};

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

// 1. deposit some money
const deposit = () => {
  while (true) {
    const depositAmount = prompt('enter a deposit amount: ');
    const numberDepositAmount = parseFloat(depositAmount); // parseFloat -> return a number, if there is not a number return NaN
    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
      // if input from user is NaN or input less than 0: print "invalid..."
      console.log('invalid deposit amount, try again');
    } else return numberDepositAmount;
  }
};

// 2. get the number of lines to bet on
const getNumberOfLines = () => {
  while (true) {
    const lines = prompt('enter the number of lines (1 - 3): ');
    const numberOfLines = parseFloat(lines);
    if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {
      console.log('invalid number of lines, try again');
    } else return numberOfLines;
  }
};

// 3. collect a bet amount
const getBet = (balance, lines) => {
  while (true) {
    const bet = prompt('enter the total bet: ');
    const numberOfBet = parseFloat(bet);
    if (
      isNaN(numberOfBet) ||
      numberOfBet <= 0 ||
      numberOfBet > balance / lines
    ) {
      console.log('invalid bet, try again');
    } else return numberOfBet;
  }
};

// 4. spin the slot machine
const spin = () => {
  const symbols = [];
  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
    // looping and looking for keys and values from "SYMBOLS_COUNT"
    for (let i = 0; i < count; i++) {
      symbols.push(symbol); // pushing to this array all the symbols to save it
    }
  }
  //   console.log(symbols);
  const reels = [];
  for (let i = 0; i < COLS; i++) {
    reels.push([]);
    const reelSymbols = [...symbols];
    // console.log(reelSymbols); // at this point: symbols === reelSymbols
    for (let j = 0; j < ROWS; j++) {
      const randomIndex = Math.floor(Math.random() * reelSymbols.length);
      const selectedSymbol = reelSymbols[randomIndex]; // once selected a random index
      reels[i].push(selectedSymbol); // and push it
      reelSymbols.splice(randomIndex, 1); // remove this element, to avoid repeat numbers
    }
  }
  return reels;
};

const transpose = function (reels) {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    rows.push([]);
    for (let j = 0; j < COLS; j++) {
      rows[i].push(reels[j][i]);
    }
  }
  return rows;
};

const printRows = rows => {
  for (const row of rows) {
    let rowString = '';
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += ' | ';
      }
    }
    console.log(rowString);
  }
};

// 5. che if th user won
const getWinnings = (rows, bet, lines) => {
  let winnings = 0;
  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }
    if (allSame) {
      winnings += bet * SYMBOL_VALUES[symbols[0]];
    }
  }
  return winnings;
};
const game = () => {
  let balance = deposit();

  while (true) {
    console.log('you have a balace of $' + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log('you won, $' + winnings.toString());

    if (balance <= 0) {
      console.log('you ran out of money');
      break;
    }
    const playAgain = prompt('do you want to play again? (y/n)');

    if (playAgain != 'y') break;
  }
};
game();
// 6. give the user their winnnings
// 7. play again
