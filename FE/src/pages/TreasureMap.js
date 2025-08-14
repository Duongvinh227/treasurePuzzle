import React, { useState, useEffect } from "react";
import NumberInput from "../component/NumberInput";
import UserGuideDialog from "../component/UserGuideDialog";
import HistoryDialog from "../component/HistoryDialog";
import ActionButtons from "../component/ActionButtons";
import MatrixGrid from "../component/MatrixGrid";

export default function TreasureMap() {
  const [n, setN] = useState("10");
  const [m, setM] = useState("10");
  const [p, setP] = useState("5");
  const [matrix, setMatrix] = useState([]);
  const [path, setPath] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userGuideDialog, setOpenUserGuideDialog] = useState(false);
  const [historyDialog, setHistoryDialog] = useState(false);

  const fakeHistory = [
    {
      time: "2025-08-14 10:00",
      result: [
        [0, 0],
        [0, 1],
        [1, 1],
      ],
    },
    {
      time: "2025-08-14 11:30",
      result: [
        [0, 0],
        [1, 0],
        [1, 1],
        [2, 1],
      ],
    },
    {
      time: "2025-08-14 12:15",
      result: [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 2],
      ],
    },
  ];

  useEffect(() => {
    const rows = parseInt(n) || 0;
    const cols = parseInt(m) || 0;
    if (rows > 0 && cols > 0) {
      setMatrix(generateRandomMatrix(rows, cols));
    }
  }, [n, m]);

  const generateRandomMatrix = (rows, cols) => {
    setCurrentStep(0);
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => Math.floor(Math.random() * 100) + 1)
    );
  };

  const handleRun = () => {
    const demoPath = [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 2],
    ];
    setPath(demoPath);
    setCurrentStep(0);

    demoPath.forEach((_, idx) => {
      setTimeout(() => setCurrentStep(idx), idx * 500);
    });
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="p-4 space-y-4">
        <div className="flex gap-4 mb-4">
          <NumberInput label="Rows (n)" value={n} onChange={setN} />
          <NumberInput label="Cols (m)" value={m} onChange={setM} />
          <NumberInput label="Max Chest (p)" value={p} onChange={setP} />
        </div>

        <ActionButtons
          n={n}
          m={m}
          setMatrix={setMatrix}
          handleRun={handleRun}
          setOpenUserGuideDialog={setOpenUserGuideDialog}
          setHistoryDialog={setHistoryDialog}
          generateRandomMatrix={generateRandomMatrix}
        />

        <MatrixGrid
          matrix={matrix}
          m={m}
          path={path}
          currentStep={currentStep}
        />
      </div>

      <UserGuideDialog
        open={userGuideDialog}
        onClose={() => setOpenUserGuideDialog(false)}
        pdfSrc="/awing_tech_assignment_v1.1_t8_2024.pdf"
      />

      <HistoryDialog
        open={historyDialog}
        onClose={() => setHistoryDialog(false)}
        history={fakeHistory}
      />
    </div>
  );
}
