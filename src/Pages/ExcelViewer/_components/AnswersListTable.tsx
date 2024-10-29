import { useState, useMemo, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import ImportAnswers from "./ImportAnswers";

const STORAGE_KEY = "excelData";

const AnswersListTable = () => {
  const { t } = useTranslation();
  const [excelData, setExcelData] = useState<any[][]>([]);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const storedData = sessionStorage.getItem(STORAGE_KEY);
    if (storedData) setExcelData(JSON.parse(storedData));
  }, []);

  const handleFileUpload = async (data: { table: any[][] }) => {
    try {
      setExcelData(data.table);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data.table));
    } catch (error) {
      console.error("Error setting Excel data:", error);
    }
  };

  const handleClearData = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setExcelData([]);
  };

  const handleOpenDialog = () => setImportDialogOpen(true);
  const handleCloseDialog = () => setImportDialogOpen(false);

  const paginatedData = useMemo(
    () =>
      excelData
        .slice(1)
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), // Skip header row
    [excelData, page, rowsPerPage]
  );

  const handleChangePage = (_: any, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Card sx={{ borderRadius: 4, minHeight: 700 }}>
        <CardHeader
          title={t("Excel Reader")}
          action={
            <Box display="flex" gap={1}>
              <Button variant="contained" onClick={handleOpenDialog}>
                {t("Import File")}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClearData}
                disabled={excelData.length <= 1} // Disable if there's no data
              >
                {t("Clear Data")}
              </Button>
            </Box>
          }
          sx={{ py: 2, px: 4 }}
        />
        <Divider />

        <TableContainer
          component={Paper}
          sx={{
            maxHeight: { xs: 400, sm: 500, md: 600 }, // Responsive max height
            overflowY: "auto",
            boxShadow: "none",
            mt: 2,
          }}
        >
          <Table stickyHeader>
            {excelData.length > 1 ? (
              <>
                {/* Header Row from the First Row of Excel Data */}
                <TableRow>
                  {excelData[0].map((header: any, index: any) => (
                    <TableCell
                      key={index}
                      align="center"
                      sx={{
                        fontWeight: "bold",
                        fontSize: 15,
                        px: 2,
                        py: 1.5,
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
                <TableBody>
                  {paginatedData.map((row, index) => (
                    <TableRow key={index}>
                      {row.map((cell: any, cellIndex: number) => (
                        <TableCell
                          key={cellIndex}
                          align="center"
                          sx={{
                            px: 2,
                            py: 1,
                            fontSize: 14,
                            whiteSpace: "wrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: 150,
                          }}
                        >
                          {cell}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={10}
                    align="center"
                    sx={{ py: 4, fontSize: 16 }}
                  >
                    {t("No data available. Please import a file.")}
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>

        {/* Render pagination only if there is data */}
        {excelData.length > 1 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={excelData.length - 1} // Exclude header row
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              "& .MuiTablePagination-toolbar": { px: 2 },
              "& .MuiTablePagination-actions": { mx: 1 }, // Slight padding for actions
            }}
          />
        )}
      </Card>

      <ImportAnswers
        open={importDialogOpen}
        handleClose={handleCloseDialog}
        onFileUpload={handleFileUpload}
      />
    </div>
  );
};

export default AnswersListTable;
