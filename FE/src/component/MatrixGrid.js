import { useEffect, useRef, useState } from "react";

const MatrixGrid = ({ matrix, m, path, currentStep }) => {
  const containerRef = useRef(null);
  const [cellSize, setCellSize] = useState(50);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [scrollPos, setScrollPos] = useState({ top: 0, left: 0 });

  const MIN_SIZE = 25;
  const MAX_SIZE = 50;

  // Update the container and cell size
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        const size = Math.floor(width / m);
        setCellSize(Math.max(MIN_SIZE, Math.min(MAX_SIZE, size)));
        setContainerSize({ width, height });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [m]);

  const onScroll = (e) => {
    setScrollPos({ top: e.target.scrollTop, left: e.target.scrollLeft });
  };

  // Calculate the cells to render
  const startRow = Math.floor(scrollPos.top / cellSize);
  const endRow = Math.min(matrix.length, startRow + Math.ceil(containerSize.height / cellSize) + 2);
  const startCol = Math.floor(scrollPos.left / cellSize);
  const endCol = Math.min(m, startCol + Math.ceil(containerSize.width / cellSize) + 2);

  // Calculate offset to center if the grid < the container
  const totalWidth = m * cellSize;
  const totalHeight = matrix.length * cellSize;
  const offsetX = totalWidth < containerSize.width ? (containerSize.width - totalWidth) / 2 : 0;
  const offsetY = totalHeight < containerSize.height ? (containerSize.height - totalHeight) / 2 : 0;

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className="overflow-auto relative"
      style={{ width: "100%", height: "500px" }}
    >
      <div
        style={{
          width: `${totalWidth}px`,
          height: `${totalHeight}px`,
          position: "relative",
          marginLeft: offsetX,
          marginTop: offsetY,
        }}
      >
        {matrix.slice(startRow, endRow).map((row, i) =>
          row.slice(startCol, endCol).map((cell, j) => {
            const rowIndex = startRow + i;
            const colIndex = startCol + j;

            const isCurrent =
              path[currentStep] &&
              path[currentStep][0] === rowIndex &&
              path[currentStep][1] === colIndex;

            const isVisited =
              path.findIndex(
                ([x, y], idx) => idx < currentStep && x === rowIndex && y === colIndex
              ) !== -1;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`flex items-center justify-center border text-sm font-bold ${
                  isCurrent ? "bg-yellow-300" : isVisited ? "bg-green-300" : "bg-white"
                }`}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  position: "absolute",
                  top: `${rowIndex * cellSize}px`,
                  left: `${colIndex * cellSize}px`,
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
