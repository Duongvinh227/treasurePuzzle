import React from "react";

const MatrixGrid = ({ matrix, m, path, currentStep }) => {
  return (
    <div className="flex justify-center">
      <div
        className="grid"
        style={{ gridTemplateColumns: `repeat(${m}, 50px)` }}
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
                className={`w-12 h-12 flex items-center justify-center border text-sm font-bold ${
                  isCurrent
                    ? "bg-yellow-300"
                    : isVisited
                    ? "bg-green-300"
                    : "bg-white"
                }`}
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
