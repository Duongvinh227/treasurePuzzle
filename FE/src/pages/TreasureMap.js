import React, { useState, useEffect } from "react";
import NumberInput from "../component/NumberInput";
import UserGuideDialog from "../component/UserGuideDialog";
import HistoryDialog from "../component/HistoryDialog";
import ActionButtons from "../component/ActionButtons";
import MatrixGrid from "../component/MatrixGrid";
import treasureMapService from "../services/treasureMapService";
import MessageDialog from "../component/MessageDialog";
import { findTreasure } from "../utils/utils.js";

export default function TreasureMap() {

  const MAX_DIMENSIONS = 500

  const [n, setN] = useState(3);
  const [m, setM] = useState(3);
  const [p, setP] = useState(5);
  const [matrix, setMatrix] = useState([]);

  const [path, setPath] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [messageDialog, setMessageDialog] = useState({ open: false, message: "" });

  const [userGuideDialog, setOpenUserGuideDialog] = useState(false);

  const [historyDialog, setHistoryDialog] = useState(false);
  const [history, setHistory] = useState([]);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (historyDialog) {
      const fetchHistory = async () => {
        try {
          const historys = await treasureMapService.getAllHistory();
          setHistory(historys);
        } catch (error) {
          console.error("Get history failed:", error);
          setHistory([]);
        }
      };
      fetchHistory();
    }
  }, [historyDialog]);

  useEffect(() => {
    const rows = parseInt(n) || 1;
    const cols = parseInt(m) || 1;
    const maxChest = parseInt(p) || 1;

    const newErrors = {};
    if (rows < 1) newErrors.n = "Request: 1 <= n";
    else if (cols < 1 || cols > MAX_DIMENSIONS) newErrors.m = "Request: 1 <= m <=500";
    else if (maxChest < 1 || maxChest > rows * cols) newErrors.p = "Request: 1 <= p <= n*m";

    setMatrix(generateRandomMatrix(rows, cols, maxChest));
    setErrors(newErrors);
  }, [n, m, p]);

  const generateRandomMatrix = (rows, cols, maxChest) => {
    setCurrentStep(0);
    const totalCells = rows * cols;

    // Create a list of values: 1..(maxChest-1)
    let values = [];
    while (values.length < totalCells - 1) {
      for (let i = 1; i < maxChest && values.length < totalCells - 1; i++) {
        values.push(i);
      }
    }

    // Add exactly 1 value: maxChest
    values.push(maxChest);

    // Shuffle to randomize positions
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [values[i], values[j]] = [values[j], values[i]];
    }

    // Split into a rows x cols matrix
    let matrix = [];
    for (let r = 0; r < rows; r++) {
      matrix.push(values.slice(r * cols, (r + 1) * cols));
    }

    return matrix;
  };

  const handleRun = async () => {
    if (Object.keys(errors).length > 0) {
      setMessageDialog({ open: true, message: "Vui lòng sửa các lỗi input trước khi chạy!" });
      return;
    }

    try {
      const { minCost, planPath } = findTreasure(parseInt(n), parseInt(m), parseInt(p), matrix);

      setMessageDialog({ open: true, message: `Nhiên liệu tối thiểu cần có: ${minCost}` });

      const data = {
        rowsCount: parseInt(n),
        columnsCount: parseInt(m),
        maxChest: parseInt(p),
        moveCost: minCost,
        planMoves: JSON.stringify(planPath)
      };
      await treasureMapService.saveMapAndInfo(data);

      setPath(planPath);
      setCurrentStep(0);

      planPath.forEach((_, idx) => {
        setTimeout(() => setCurrentStep(idx), idx * 500);
      });

    } catch (error) {
      console.error("Run failed:", error);
      setMessageDialog({ open: true, message: "Lỗi khi tính đường đi" });
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="p-4 space-y-4 w-full max-w-screen-xl">
        <div className="flex gap-4 mb-4 justify-center">
          <NumberInput label="Rows (n)" value={n} onChange={setN}
            min={1} max={MAX_DIMENSIONS} error={errors.n} />
          <NumberInput label="Cols (m)" value={m} onChange={setM}
            min={1} max={MAX_DIMENSIONS} error={errors.m} />
          <NumberInput label="Max Chest (p)" value={p} onChange={setP}
            min={1} max={n * m} error={errors.p} />
        </div>

        <ActionButtons
          n={n}
          m={m}
          p={p}
          setMatrix={setMatrix}
          handleRun={handleRun}
          setOpenUserGuideDialog={setOpenUserGuideDialog}
          setHistoryDialog={setHistoryDialog}
          generateRandomMatrix={generateRandomMatrix}
        />

        <div className="overflow-x-auto">
          <MatrixGrid
            matrix={matrix}
            m={m}
            path={path}
            currentStep={currentStep}
          />
        </div>
      </div>

      <UserGuideDialog
        open={userGuideDialog}
        onClose={() => setOpenUserGuideDialog(false)}
        pdfSrc="/awing_tech_assignment_v1.1_t8_2024.pdf"
      />

      <HistoryDialog
        open={historyDialog}
        onClose={() => setHistoryDialog(false)}
        history={history}
      />

      <MessageDialog
        open={messageDialog.open}
        message={messageDialog.message}
        onClose={() => setMessageDialog({ ...messageDialog, open: false })}
      />

    </div>
  );
}
