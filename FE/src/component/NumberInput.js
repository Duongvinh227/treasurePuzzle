import { TextField } from "@mui/material";

export default function NumberInput({ label, value, onChange }) {
  return (
    <TextField
      label={label}
      value={value}
      type="number"
      onChange={(e) => onChange(e.target.value)}
      slotProps={{
        htmlInput: { min: 1 },
        inputLabel: {
          sx: { fontWeight: 600, color: "primary.main" }
        }
      }}
      variant="outlined"
      sx={{
        width: 200,
        mr: 2,
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          backgroundColor: "#f9f9f9",
          "& fieldset": {
            borderColor: "#ccc"
          },
          "&:hover fieldset": {
            borderColor: "#1976d2"
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976d2",
            borderWidth: "2px"
          }
        },
        "& input": {
          textAlign: "center",
          fontWeight: 500
        }
      }}
    />
  );
}
