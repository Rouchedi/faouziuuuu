import React, { useState, useEffect } from 'react';

    const Sudoku: React.FC = () => {
      const [board, setBoard] = useState<number[][]>([]);
      const [initialBoard, setInitialBoard] = useState<number[][]>([]);
      const [gameOver, setGameOver] = useState(false);

      useEffect(() => {
        generateSudoku();
      }, []);

      const generateSudoku = () => {
        const emptyBoard = Array(9).fill(null).map(() => Array(9).fill(0));
        let solvedBoard = solveSudoku(emptyBoard);
        if (!solvedBoard) {
          solvedBoard = Array(9).fill(null).map(() => Array(9).fill(0));
        }

        let puzzleBoard = removeNumbers(solvedBoard, 40);

        setBoard(puzzleBoard);
        setInitialBoard(puzzleBoard.map(row => row.slice()));
        setGameOver(false);
      };

      const solveSudoku = (board: number[][]): number[][] => {
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
              for (let num = 1; num <= 9; num++) {
                if (isValid(board, num, [i, j])) {
                  board[i][j] = num;

                  if (solveSudoku(board)) {
                    return board;
                  } else {
                    board[i][j] = 0;
                  }
                }
              }
              return null;
            }
          }
        }
        return board;
      };

      const isValid = (board: number[][], num: number, pos: number[]): boolean => {
        // Check row
        for (let i = 0; i < 9; i++) {
          if (board[pos[0]][i] === num && i !== pos[1]) {
            return false;
          }
        }

        // Check column
        for (let i = 0; i < 9; i++) {
          if (board[i][pos[1]] === num && i !== pos[0]) {
            return false;
          }
        }

        // Check 3x3 box
        const boxX = Math.floor(pos[1] / 3) * 3;
        const boxY = Math.floor(pos[0] / 3) * 3;

        for (let i = boxY; i < boxY + 3; i++) {
          for (let j = boxX; j < boxX + 3; j++) {
            if (board[i][j] === num && i !== pos[0] && j !== pos[1]) {
              return false;
            }
          }
        }

        return true;
      };

      const removeNumbers = (board: number[][], count: number): number[][] => {
        let attempts = count;
        while (attempts > 0) {
          let row = Math.floor(Math.random() * 9);
          let col = Math.floor(Math.random() * 9);
          if (board[row][col] !== 0) {
            board[row][col] = 0;
            attempts--;
          }
        }
        return board;
      };

      const handleInputChange = (row: number, col: number, value: string) => {
        const num = parseInt(value) || 0;
        if (num >= 0 && num <= 9) {
          const newBoard = board.map((rowArr, i) =>
            i === row ? rowArr.map((cell, j) => (j === col ? num : cell)) : rowArr
          );
          setBoard(newBoard);
        }
      };

      const checkSolution = () => {
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
              alert("La grille n'est pas complète.");
              return;
            }
            if (!isValid(board, board[i][j], [i, j])) {
              alert("La solution est incorrecte.");
              return;
            }
          }
        }
        setGameOver(true);
        alert("Félicitations ! Vous avez résolu le Sudoku.");
      };

      return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Sudoku</h2>
          <div className="grid grid-cols-9 gap-1">
            {board.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <input
                  key={`${rowIndex}-${colIndex}`}
                  type="number"
                  className={`w-8 h-8 text-center border border-gray-300 font-bold ${initialBoard[rowIndex][colIndex] !== 0 ? 'text-black' : 'text-blue-500'}`}
                  value={cell === 0 ? '' : cell}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                  disabled={initialBoard[rowIndex][colIndex] !== 0 || gameOver}
                  min="1"
                  max="9"
                />
              ))
            ))}
          </div>
          <div className="mt-4">
            <button
              onClick={checkSolution}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mr-2"
            >
              Vérifier la solution
            </button>
            <button
              onClick={generateSudoku}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
              Nouvelle partie
            </button>
          </div>
        </div>
      );
    };

    export default Sudoku;
