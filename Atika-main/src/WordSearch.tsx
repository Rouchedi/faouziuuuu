import React, { useState, useEffect } from 'react';

    const WordSearch: React.FC = () => {
      const [grid, setGrid] = useState<string[][]>([]);
      const [words, setWords] = useState<string[]>(['ECONOMIE', 'BUDGET', 'EPARGNE', 'ACHAT', 'REPAS']);
      const [foundWords, setFoundWords] = useState<string[]>([]);
      const gridSize = 10;

      useEffect(() => {
        generateGrid();
      }, []);

      const generateGrid = () => {
        const newGrid: string[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Place words
        words.forEach(word => {
          let placed = false;
          while (!placed) {
            const x = Math.floor(Math.random() * gridSize);
            const y = Math.floor(Math.random() * gridSize);
            const directionX = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
            const directionY = Math.floor(Math.random() * 3) - 1; // -1, 0, 1

            if (directionX === 0 && directionY === 0) continue; // Avoid no direction

            let canPlace = true;
            for (let i = 0; i < word.length; i++) {
              const newX = x + i * directionX;
              const newY = y + i * directionY;

              if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize || newGrid[newY][newX] !== '') {
                canPlace = false;
                break;
              }
            }

            if (canPlace) {
              for (let i = 0; i < word.length; i++) {
                const newX = x + i * directionX;
                const newY = y + i * directionY;
                newGrid[newY][newX] = word[i];
              }
              placed = true;
            }
          }
        });

        // Fill remaining spaces with random letters
        for (let i = 0; i < gridSize; i++) {
          for (let j = 0; j < gridSize; j++) {
            if (newGrid[i][j] === '') {
              newGrid[i][j] = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
          }
        }

        setGrid(newGrid);
      };

      const handleWordSelect = (word: string) => {
        if (!foundWords.includes(word)) {
          setFoundWords([...foundWords, word]);
        }
      };

      const isWordFound = (word: string): boolean => {
        return foundWords.includes(word);
      };

      return (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Mot Caché</h2>
          <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 30px)` }}>
            {grid.map((row, rowIndex) => (
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="w-8 h-8 flex items-center justify-center border border-gray-300 font-bold uppercase"
                >
                  {cell}
                </div>
              ))
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Mots à trouver:</h3>
            <ul className="space-y-2">
              {words.map(word => (
                <li
                  key={word}
                  className={`p-2 rounded-md ${isWordFound(word) ? 'bg-green-200 line-through text-gray-500' : 'bg-gray-100 hover:bg-gray-200'}`}
                  onClick={() => handleWordSelect(word)}
                >
                  {word}
                </li>
              ))}
            </ul>
          </div>
          {foundWords.length === words.length && (
            <div className="mt-4 text-green-600 font-bold">
              Félicitations ! Vous avez trouvé tous les mots.
            </div>
          )}
        </div>
      );
    };

    export default WordSearch;
