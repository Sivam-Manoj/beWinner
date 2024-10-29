import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

interface ViewDataModalProps {
  open: boolean;
  onClose: () => void;
  data: any[]; // Array of rows
}

const ViewDataModal: React.FC<ViewDataModalProps> = ({
  open,
  onClose,
  data,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Full Data View
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
      <DialogContent dividers sx={{ maxHeight: 500 }}>
        {data && data.length > 0 ? (
          <Table>
            <TableBody>
              {data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell: any, cellIndex: number) => (
                    <TableCell
                      key={cellIndex}
                      sx={{
                        minWidth: 100,
                        maxWidth: 200,
                      }}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography align="center" variant="body1">
            No Data Available
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewDataModal;
