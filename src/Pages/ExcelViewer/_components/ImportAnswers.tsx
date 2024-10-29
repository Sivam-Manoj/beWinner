import { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import UploadIcon from "@mui/icons-material/UploadFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-toastify";

type Props = {
  open: boolean;
  handleClose: () => void;
  onFileUpload: (data: { table: any[][]; text: string }) => void; // Accepts parsed data
};

const ImportAnswers = ({ open, handleClose, onFileUpload }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setFileError(
          "Unsupported file type. Please upload an Excel file (.xlsx or .xls)."
        );
        return;
      }
      const file = acceptedFiles[0];
      if (file) {
        setSelectedFile(file);
        setFileError(null);
      }
    },
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    maxFiles: 1,
  });

  const parseExcelFile = async (file: File) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1,
    });

    // Extract text format
    const textFormat = jsonData.map((row: any) => row.join(" ")).join("\n"); // Join rows and columns to create a text representation

    return { table: jsonData, text: textFormat };
  };

  const onSubmit = async () => {
    if (!selectedFile) {
      toast.error("Please select or drop an Excel file.");
      setFileError("Please select or drop an Excel file.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const data: any = await parseExcelFile(selectedFile);

      // Log the extracted text to the console
      console.log("Text from file:", data.text);

      // Call onFileUpload with parsed data
      onFileUpload(data);

      toast.success("File uploaded successfully");

      // Reset the selected file
      setSelectedFile(null);
      handleClose();
    } catch (error) {
      toast.error("Error parsing the Excel file. Please try again.");
      console.error("Parsing error:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="flex items-center justify-between">
          <Typography variant="h5" className="flex items-center gap-2">
            <CloudUploadIcon /> Import Excel File
          </Typography>
          <IconButton size="small" onClick={handleClose}>
            <i className="ri-close-line text-2xl" />
          </IconButton>
        </div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <div
          {...getRootProps()}
          className={`flex flex-col items-center gap-3 border-2 ${
            isDragActive ? "border-blue-500" : "border-dashed border-gray-300"
          } p-6 rounded-lg hover:bg-gray-50 transition cursor-pointer`}
        >
          <input {...getInputProps()} />
          <UploadIcon fontSize="large" className="text-blue-500" />
          <Typography className="text-gray-600">
            {isDragActive
              ? "Drop the file here..."
              : "Drag and drop an Excel file here, or click to select"}
          </Typography>
          {selectedFile && (
            <Typography className="text-gray-600 mt-2">
              Selected file: {selectedFile.name}
            </Typography>
          )}
          {fileError && (
            <Typography color="error" className="text-center mt-2">
              {fileError}
            </Typography>
          )}
        </div>
      </DialogContent>
      <DialogActions className="justify-center">
        <Button
          variant="contained"
          onClick={onSubmit}
          className={`bg-blue-500 hover:bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Submitting..." : "Submit"} {/* Show loading text */}
        </Button>
        <Button variant="outlined" color="error" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportAnswers;
