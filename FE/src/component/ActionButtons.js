// ActionButtons.js
import React from "react";
import { Button } from "@mui/material";

const ActionButtons = ({
  n,
  m,
  p,
  setMatrix,
  handleRun,
  setOpenUserGuideDialog,
  setHistoryDialog,
  generateRandomMatrix,
}) => {
  return (
    <div className="flex justify-center space-x-4">
      <Button
        variant="outlined"
        onClick={() =>
          setMatrix(generateRandomMatrix(parseInt(n) || 0, parseInt(m) || 0, parseInt(p) || 0))
        }
      >
        Generate Random Matrix
      </Button>

      <Button variant="outlined" onClick={handleRun}>
        Run
      </Button>

      <Button variant="outlined" onClick={() => setOpenUserGuideDialog(true)}>
        User Guide
      </Button>

      <Button variant="outlined" onClick={() => setHistoryDialog(true)}>
        History
      </Button>
    </div>
  );
};

export default ActionButtons;
