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
                <div>| Rows: {item.rowsCount} | Columns: {item.columnsCount} | Max Chests: {item.maxChest} |</div>
                <div>Path: {JSON.parse(item.moves).map(([x, y]) => `[${x},${y}]`).join(" → ")}</div>
                <div className="font-bold">MoveCost: {item.moveCost}</div>
                <div>CreatedAt: {new Date(item.createdAt).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
