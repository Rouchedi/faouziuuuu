import React, { useState, useEffect } from 'react';

    type CellValue = 'R' | 'Y' | null;

    const ConnectFour: React.FC = () => {
      const [board, setBoard] = useState<CellValue[][]>(() => {
        const storedBoard = localStorage.getItem('connectFourBoard');
        return storedBoard ? JSON.parse(storedBoard) : Array(6).fill(null).map(() => Array(7).fill(null));
      });
      const [currentPlayer, setCurrentPlayer] = useState<CellValue>('R');
      const [winner, setWinner] = useState<CellValue>(null);
      const [gameOver, setGameOver] = useState(false);

      useEffect(() => {
        localStorage.setItem('connectFourBoard', JSON.stringify(board));
      }, [board]);

      const checkWinner = (board: CellValue[][]): CellValue => {
        // Check horizontal
        for (let row = 0; row < 6; row++) {
          for (let col = 0; col < 4; col++) {
            if (board[row][col] &&
              board[row][col] === board[row][col + 1] &&
              board[row][col] === board[row][col + 2] &&
              board[row][col] === board[row][col + 3]) {
              return board[row][col];
            }
          }
        }

        // Check vertical
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 7; col++) {
            if (board[row][col] &&
              board[row][col] === board[row + 1][col] &&
              board[row][col] === board[row + 2][col] &&
              board[row][col] === board[row + 3][col]) {
              return board[row][col];
            }
          }
        }

        // Check positively sloped diagonals
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 4; col++) {
            if (board[row][col] &&
              board[row][col] === board[row + 1][col + 1] &&
              board[row][col] === board[row + 2][col + 2] &&
              board[row][col] === board[row + 3][col + 3]) {
              return board[row][col];
            }
          }
        }

        // Check negatively sloped diagonals
        for (let row = 0; row < 3; row++) {
          for (let col = 3; col < 7; col++) {
            if (board[row][col] &&
              board[row][col] === board[row + 1][col - 1] &&
              board[row][col] === board[row + 2][col - 2] &&
              board[row][col] === board[row + 3][col - 3]) {
              return board[row][col];
            }
          }
        }

        return null;
      };

      const handleClick = (col: number) => {
        if (winner || gameOver) return;

        for (let row = 5; row >= 0; row--) {
          if (!board[row][col]) {
            const newBoard = board.map((arr, i) => i === row ? arr.map((value, j) => j === col ? currentPlayer : value) : arr);
            setBoard(newBoard);

            const newWinner = checkWinner(newBoard);
            if (newWinner) {
              setWinner(newWinner);
              setGameOver(true);
            } else if (newBoard.every(row => row.every(cell => cell !== null))) {
              setGameOver(true);
            } else {
              setCurrentPlayer(currentPlayer === 'R' ? 'Y' : 'R');
            }
            return;
          }
        }
      };

      const resetGame = () => {
        setBoard(Array(6).fill(null).map(() => Array(7).fill(null)));
        setCurrentPlayer('R');
        setWinner(null);
        setGameOver(false);
      };

      const renderCell = (row: number, col: number) => {
        let color = 'bg-gray-200';
        if (board[row][col] === 'R') color = 'bg-red-500';
        if (board[row][col] === 'Y') color = 'bg-yellow-500';

        return (
          <div
            className={`w-12 h-12 rounded-full border border-gray-400 ${color}`}
          />
        );
      };

      return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Connect Four</h2>
          {winner ? (
            <div className="text-center">
              <p className="text-green-600 font-semibold">Le gagnant est {winner === 'R' ? 'Rouge' : 'Jaune'}!</p>
              <button
                onClick={resetGame}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
              >
                Rejouer
              </button>
            </div>
          ) : gameOver ? (
            <div className="text-center">
              <p className="text-gray-600 font-semibold">Match nul!</p>
              <button
                onClick={resetGame}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
              >
                Rejouer
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-7 gap-1">
                {Array(7).fill(null).map((_, col) => (
                  <button
                    key={col}
                    className="w-12 h-8 bg-blue-200 hover:bg-blue-300 rounded-md focus:outline-none"
                    onClick={() => handleClick(col)}
                  >
                    Placer
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 mt-2">
                {board.map((row, rowIdx) => (
                  row.map((cell, colIdx) => (
                    <div key={`${rowIdx}-${colIdx}`} className="flex justify-center items-center">
                      {renderCell(rowIdx, colIdx)}
                    </div>
                  ))
                ))}
              </div>
              <p className="mt-4">Tour du joueur: {currentPlayer === 'R' ? 'Rouge' : 'Jaune'}</p>
            </div>
          )}
        </div>
      );
    };

    export default ConnectFour;
