import React, { useState, useEffect } from 'react';

interface PuzzlePiece {
  id: number;
  position: number;
  correctPosition: number;
  imageUrl: string;
}

interface Props {
  imageUrl: string;
  piecesPerRow: number;
}

const PuzzleGame: React.FC<Props> = ({ imageUrl, piecesPerRow }) => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [shuffled, setShuffled] = useState(false);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const generatePieces = () => {
      const pieceWidth = 100 / piecesPerRow;
      const newPieces: PuzzlePiece[] = [];

      for (let i = 0; i < piecesPerRow * piecesPerRow; i++) {
        const row = Math.floor(i / piecesPerRow);
        const col = i % piecesPerRow;

        newPieces.push({
          id: i,
          position: i,
          correctPosition: i,
          imageUrl: imageUrl,
        });
      }
      return newPieces;
    };

    const initialPieces = generatePieces();
    setPieces(initialPieces);
  }, [imageUrl, piecesPerRow]);

  const shufflePieces = () => {
    let shuffledPieces = [...pieces];
    for (let i = shuffledPieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPieces[i], shuffledPieces[j]] = [shuffledPieces[j], shuffledPieces[i]];
      shuffledPieces[i] = { ...shuffledPieces[i], position: i };
      shuffledPieces[j] = { ...shuffledPieces[j], position: j };
    }
    setPieces(shuffledPieces);
    setShuffled(true);
    setSolved(false);
  };

  const swapPieces = (index1: number, index2: number) => {
    const newPieces = [...pieces];
    const position1 = newPieces[index1].position;
    const position2 = newPieces[index2].position;

    newPieces[index1] = { ...newPieces[index1], position: position2 };
    newPieces[index2] = { ...newPieces[index2], position: position1 };

    setPieces(newPieces.sort((a, b) => a.position - b.position));
    checkIfSolved(newPieces);
  };

  const checkIfSolved = (currentPieces: PuzzlePiece[]) => {
    const isSolved = currentPieces.every(piece => piece.position === piece.correctPosition);
    setSolved(isSolved);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Jeu de Casse-tête</h2>
      <div className="puzzle-container" style={{ width: '300px', height: '300px', position: 'relative', overflow: 'hidden' }}>
        {pieces.map((piece, index) => {
          const row = Math.floor(piece.position / piecesPerRow);
          const col = piece.position % piecesPerRow;
          const pieceWidth = 100 / piecesPerRow;

          const bgX = (piece.correctPosition % piecesPerRow) * pieceWidth;
          const bgY = Math.floor(piece.correctPosition / piecesPerRow) * pieceWidth;

          return (
            <div
              key={piece.id}
              className="puzzle-piece"
              onClick={() => {
                if (shuffled && !solved) {
                  const emptyIndex = pieces.findIndex(p => p.imageUrl === '');
                  if (emptyIndex !== -1) {
                    swapPieces(index, emptyIndex);
                  }
                }
              }}
              style={{
                width: `${pieceWidth}%`,
                height: `${pieceWidth}%`,
                position: 'absolute',
                left: `${col * pieceWidth}%`,
                top: `${row * pieceWidth}%`,
                backgroundImage: `url(${piece.imageUrl})`,
                backgroundSize: `${piecesPerRow * 100}% ${piecesPerRow * 100}%`,
                backgroundPosition: `-${bgX}% -${bgY}%`,
                border: '1px solid #ccc',
                boxSizing: 'border-box',
                cursor: shuffled && !solved ? 'pointer' : 'default',
              }}
            />
          );
        })}
      </div>
      {!shuffled && (
        <button
          onClick={shufflePieces}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-4"
        >
          Mélanger
        </button>
      )}
      {solved && <p className="text-green-600 mt-4">Casse-tête résolu !</p>}
    </div>
  );
};

export default PuzzleGame;
