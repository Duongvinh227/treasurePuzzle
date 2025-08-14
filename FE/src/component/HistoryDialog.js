import React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function HistoryDialog({ open, onClose, history }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        Game History
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {(!history || history.length === 0) ? (
          <p>No history yet.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((item, idx) => (
              <li key={idx} className="border p-2 rounded">
                <div className="font-bold">Time: {item.time}</div>
                <div>Path: {item.result.map(([x, y]) => `[${x},${y}]`).join(" → ")}</div>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
