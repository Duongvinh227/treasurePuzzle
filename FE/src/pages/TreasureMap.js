import React, { useState, useEffect } from "react";
import NumberInput from "../component/NumberInput";
import UserGuideDialog from "../component/UserGuideDialog";
import HistoryDialog from "../component/HistoryDialog";
import ActionButtons from "../component/ActionButtons";
import MatrixGrid from "../component/MatrixGrid";

export default function TreasureMap() {
  // const [n, setN] = useState("10");
  // const [m, setM] = useState("10");
  // const [p, setP] = useState("5");

  const [n, setN] = useState(1);
  const [m, setM] = useState(1);
  const [p, setP] = useState(1);
  const [errors, setErrors] = useState({});

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
    const rows = parseInt(n);
    const cols = parseInt(m);
    const maxChest = parseInt(p);

    const newErrors = {};
    if (rows < 1) newErrors.n =  "Yêu cầu : 1 <= n";
    else if(cols < 1 || cols > 500) newErrors.m = "Yêu cầu : 1 <= m <=500";
    else if(maxChest < 1 || maxChest > rows * cols) newErrors.p = "Yêu cầu : 1 <= p <= n*m";
    else{
      setMatrix(generateRandomMatrix(rows, cols));
    }
    setErrors(newErrors);
  }, [n, m, p]);

  const handleSubmit = () => {
    if (Object.keys(errors).length === 0) {
      alert(`Start game with n=${n}, m=${m}, p=${p}`);
    } else {
      alert("Fix errors first");
    }
  };

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
          <NumberInput label="Rows (n)" value={n} onChange={setN} 
                       min={1} max={500} error={errors.n} />
          <NumberInput label="Cols (m)" value={m} onChange={setM} 
                       min={1} max={500} error={errors.m}/>
          <NumberInput label="Max Chest (p)" value={p} onChange={setP} 
                       min={1} max={n * m} error={errors.p}/>
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
