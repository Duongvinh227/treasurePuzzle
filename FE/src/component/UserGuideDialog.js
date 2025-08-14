// src/components/UserGuideDialog.jsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UserGuideDialog = ({ open, onClose, pdfSrc }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          fontWeight: "bold",
          fontSize: "1.25rem",
          textAlign: "center",
          backgroundColor: "#f5f5f5",
        }}
      >
        User Guide
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ height: "80vh", padding: 0 }}>
        <iframe
          src={pdfSrc}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="User Guide"
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserGuideDialog;
