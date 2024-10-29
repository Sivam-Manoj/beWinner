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
  onFileUpload: (
    data1: { table: any[][]; text: string },
    data2: { table: any[][]; text: string }
  ) => void; // Update to accept both table and text
};

const ImportAnswers = ({ open, handleClose, onFileUpload }: Props) => {
  const [selectedFile1, setSelectedFile1] = useState<File | null>(null);
  const [selectedFile2, setSelectedFile2] = useState<File | null>(null);
  const [fileError1, setFileError1] = useState<string | null>(null);
  const [fileError2, setFileError2] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const createDropzone = (
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    setFileError: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    return useDropzone({
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
  };

  const dropzone1 = createDropzone(setSelectedFile1, setFileError1);
  const dropzone2 = createDropzone(setSelectedFile2, setFileError2);

  const parseExcelFile = async (file: File, isSecondFile: boolean) => {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1,
    });

    // Extract text format with a space between columns
    const textFormat = jsonData
      .map((row: any) => {
        // Join columns with two spaces between them
        const rowText = row.join("  ");
        return rowText;
      })
      .join(
        isSecondFile && file.name !== "product_type"
          ? "\n----------------------------------------------------(Select Matching product from product list)--------------------------------------------------------\n"
          : "\n"
      ); // Conditionally add the separator line only if it's the second file and file name does not match "product_type"

    // Calculate the count of entries in the second file data
    let count = 0;
    if (isSecondFile && file.name !== "product_type") {
      // Split the text format by the separator and filter out any empty entries
      const entries = textFormat.split(
        "\n----------------------------------------------------(Select Matching product from product list)--------------------------------------------------------\n"
      );
      count = entries.filter((entry) => entry.trim() !== "").length; // Count only non-empty entries
    }

    return { table: jsonData, text: textFormat, count };
  };

  const onSubmit = async () => {
    if (!selectedFile1 || !selectedFile2) {
      toast.error("Please select or drop both Excel files.");
      if (!selectedFile1) setFileError1("Please select or drop an Excel file.");
      if (!selectedFile2) setFileError2("Please select or drop an Excel file.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const data1: any = await parseExcelFile(selectedFile1, false);
      const data2: any = await parseExcelFile(selectedFile2, true);

      // Log the extracted text to the console
      console.log("Text from first file:", data1.text);
      console.log("Text from second file:", data2.text);

      sessionStorage.setItem("count", data2.count);

      const count = sessionStorage.getItem("count");

      toast.success(`total of ${count} datas`);
      // Call onFileUpload with both parsed data
      onFileUpload(data1, data2);

      toast.success("Files uploaded successfully");

      // Reset the selected files
      setSelectedFile1(null);
      setSelectedFile2(null);
      handleClose();
    } catch (error) {
      toast.error("Error parsing the Excel files. Please try again.");
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <div className="flex items-center justify-between">
          <Typography variant="h5" className="flex items-center gap-2">
            <CloudUploadIcon /> Import Excel Files
          </Typography>
          <IconButton size="small" onClick={handleClose}>
            <i className="ri-close-line text-2xl" />
          </IconButton>
        </div>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <div className="flex gap-4">
          <div
            {...dropzone1.getRootProps()}
            className={`flex flex-col items-center gap-3 border-2 ${
              dropzone1.isDragActive
                ? "border-blue-500"
                : "border-dashed border-gray-300"
            } p-6 rounded-lg hover:bg-gray-50 transition cursor-pointer w-1/2`}
          >
            <input {...dropzone1.getInputProps()} />
            <UploadIcon fontSize="large" className="text-blue-500" />
            <Typography className="text-gray-600">
              {dropzone1.isDragActive
                ? "Drop the first file here..."
                : "Drag and drop the first Excel file here, or click to select"}
            </Typography>
            {selectedFile1 && (
              <Typography className="text-gray-600 mt-2">
                Selected file: {selectedFile1.name}
              </Typography>
            )}
            {fileError1 && (
              <Typography color="error" className="text-center mt-2">
                {fileError1}
              </Typography>
            )}
          </div>

          <div
            {...dropzone2.getRootProps()}
            className={`flex flex-col items-center gap-3 border-2 ${
              dropzone2.isDragActive
                ? "border-blue-500"
                : "border-dashed border-gray-300"
            } p-6 rounded-lg hover:bg-gray-50 transition cursor-pointer w-1/2`}
          >
            <input {...dropzone2.getInputProps()} />
            <UploadIcon fontSize="large" className="text-blue-500" />
            <Typography className="text-gray-600">
              {dropzone2.isDragActive
                ? "Drop the second file here..."
                : "Drag and drop the second Excel file here, or click to select"}
            </Typography>
            {selectedFile2 && (
              <Typography className="text-gray-600 mt-2">
                Selected file: {selectedFile2.name}
              </Typography>
            )}
            {fileError2 && (
              <Typography color="error" className="text-center mt-2">
                {fileError2}
              </Typography>
            )}
          </div>
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
