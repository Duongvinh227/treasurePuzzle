import { useEffect, useRef, useState } from "react";

const MatrixGrid = ({ matrix, m, path, currentStep }) => {
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const [cellSize, setCellSize] = useState(50);
  const [isOverflow, setIsOverflow] = useState(false);

  const MIN_SIZE = 25;
  const MAX_SIZE = 50;

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current && gridRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const size = Math.floor(containerWidth / m);
        setCellSize(Math.max(MIN_SIZE, Math.min(MAX_SIZE, size)));
        const gridWidth = m * Math.max(MIN_SIZE, Math.min(MAX_SIZE, size));
        setIsOverflow(gridWidth > containerWidth);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [m]);

  return (
    <div
      ref={containerRef}
      className={`flex w-full overflow-x-auto ${isOverflow ? "justify-start" : "justify-center"}`}
    >
      <div
        ref={gridRef}
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${m}, ${cellSize}px)`,
        }}
      >
        {matrix.map((row, i) =>
          row.map((cell, j) => {
            const isCurrent =
              path[currentStep] &&
              path[currentStep][0] === i &&
              path[currentStep][1] === j;

            const isVisited =
              path.findIndex(
                ([x, y], idx) => idx < currentStep && x === i && y === j
              ) !== -1;

            return (
              <div
                key={`${i}-${j}`}
                className={`flex items-center justify-center border text-sm font-bold ${
                  isCurrent
                    ? "bg-yellow-300"
                    : isVisited
                    ? "bg-green-300"
                    : "bg-white"
                }`}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                }}
              >
                {cell}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MatrixGrid;
