import React, { useState } from 'react';

    type CellValue = 'X' | 'O' | null;

    const TicTacToe: React.FC = () => {
      const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
      const [currentPlayer, setCurrentPlayer] = useState<CellValue>('X');
      const [winner, setWinner] = useState<CellValue>(null);

      const checkWinner = (board: CellValue[]): CellValue => {
        const lines = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8],
          [0, 3, 6], [1, 4, 7], [2, 5, 8],
          [0, 4, 8], [2, 4, 6],
        ];

        for (const [a, b, c] of lines) {
          if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
          }
        }

        return null;
      };

      const handleClick = (index: number) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const newWinner = checkWinner(newBoard);
        if (newWinner) {
          setWinner(newWinner);
        } else {
          setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        }
      };

      const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer('X');
        setWinner(null);
      };

      const renderCell = (index: number) => {
        return (
          <button
            className="w-20 h-20 border border-gray-400 text-5xl font-bold focus:outline-none"
            onClick={() => handleClick(index)}
            disabled={board[index] || winner}
          >
            {board[index]}
          </button>
        );
      };

      return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Tic Tac Toe</h2>
          {winner ? (
            <div className="text-center">
              <p className="text-green-600 font-semibold">Le gagnant est {winner}!</p>
              <button
                onClick={resetGame}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
              >
                Rejouer
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-3">
                {renderCell(0)}
                {renderCell(1)}
                {renderCell(2)}
              </div>
              <div className="grid grid-cols-3">
                {renderCell(3)}
                {renderCell(4)}
                {renderCell(5)}
              </div>
              <div className="grid grid-cols-3">
                {renderCell(6)}
                {renderCell(7)}
                {renderCell(8)}
              </div>
              <p className="mt-4">Tour du joueur: {currentPlayer}</p>
            </div>
          )}
        </div>
      );
    };

    export default TicTacToe;
