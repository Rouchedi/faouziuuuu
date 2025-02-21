import React, { useState, useEffect } from 'react';

interface Tile {
  id: number;
  value: number;
  position: number;
}

const FifteenPuzzle: React.FC = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initialTiles: Tile[] = [];
    for (let i = 0; i < 15; i++) {
      initialTiles.push({ id: i, value: i + 1, position: i });
    }
    initialTiles.push({ id: 15, value: 0, position: 15 });

    let shuffledTiles = shuffle(initialTiles);
    setTiles(shuffledTiles);
    setMoves(0);
    setSolved(false);
  };

  const shuffle = (array: Tile[]): Tile[] => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const moveTile = (tileIndex: number) => {
    const tile = tiles[tileIndex];
    const emptyIndex = tiles.findIndex(t => t.value === 0);

    const isAdjacent =
      (tile.position === emptyIndex - 1 && emptyIndex % 4 !== 0) ||
      (tile.position === emptyIndex + 1 && emptyIndex % 4 !== 3) ||
      tile.position === emptyIndex - 4 ||
      tile.position === emptyIndex + 4;

    if (isAdjacent) {
      const newTiles = [...tiles];
      newTiles[emptyIndex] = { ...tile, position: emptyIndex };
      newTiles[tileIndex] = { ...tiles[emptyIndex], position: tile.position };
      setTiles(newTiles);
      setMoves(moves + 1);
      checkIfSolved(newTiles);
    }
  };

  const checkIfSolved = (currentTiles: Tile[]) => {
    const isSolved = currentTiles.every(tile => tile.value === tile.position + 1 || tile.value === 0);
    setSolved(isSolved);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Puzzle Coulissant (15)</h2>
      <div className="grid grid-cols-4 gap-2 w-64">
        {tiles.map((tile, index) => (
          <button
            key={tile.id}
            className={`aspect-square rounded-lg font-bold text-xl ${tile.value === 0 ? 'bg-gray-200 text-gray-200' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
            onClick={() => moveTile(index)}
            disabled={tile.value === 0 || solved}
          >
            {tile.value !== 0 ? tile.value : ''}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <p>Coups: {moves}</p>
        {solved && <p className="text-green-600">Vous avez résolu le puzzle !</p>}
        <button
          onClick={initializeGame}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
        >
          Réinitialiser le jeu
        </button>
      </div>
    </div>
  );
};

export default FifteenPuzzle;
