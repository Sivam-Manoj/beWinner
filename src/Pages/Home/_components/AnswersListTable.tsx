import { useState, useMemo, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Fade from "@mui/material/Fade"; // Import Fade for animation
import { useTranslation } from "react-i18next";
import ImportAnswers from "./ImportAnswers";
import ViewDataModal from "./ViewDataModal";
import CreateAiOffer from "./CreateAiOffer";
import { toast } from "react-toastify";

const STORAGE_KEY_1 = "excelData1";
const STORAGE_KEY_2 = "excelData2";
const STORAGE_KEY_TEXT_1 = "excelText1";
const STORAGE_KEY_TEXT_2 = "excelText2";

const AnswersListTable = () => {
  const { t } = useTranslation();
  const [excelData1, setExcelData1] = useState<any[]>([]);
  const [excelData2, setExcelData2] = useState<any[]>([]);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [createOfferOpen, setCreateOfferOpen] = useState(false);
  const [viewData, setViewData] = useState<any[]>([]);
  const [excelDataText1, setExcelDataText1] = useState<string[]>([]);
  const [excelDataText2, setExcelDataText2] = useState<string>("");
  const [page1, setPage1] = useState(0);
  const [rowsPerPage1, setRowsPerPage1] = useState(10);
  const [page2, setPage2] = useState(0);
  const [rowsPerPage2, setRowsPerPage2] = useState(10);

  useEffect(() => {
    const storedData1 = sessionStorage.getItem(STORAGE_KEY_1);
    const storedData2 = sessionStorage.getItem(STORAGE_KEY_2);
    const storedText1 = sessionStorage.getItem(STORAGE_KEY_TEXT_1);
    const storedText2 = sessionStorage.getItem(STORAGE_KEY_TEXT_2);

    if (storedData1) {
      try {
        setExcelData1(JSON.parse(storedData1));
      } catch (error) {
        console.error("Error parsing excelData1 from sessionStorage:", error);
      }
    }

    if (storedData2) {
      try {
        setExcelData2(JSON.parse(storedData2));
      } catch (error) {
        console.error("Error parsing excelData2 from sessionStorage:", error);
      }
    }

    if (storedText1) {
      setExcelDataText1(storedText1.split("\n"));
    }

    if (storedText2) {
      setExcelDataText2(storedText2);
    }
  }, []);

  const handleFileUpload = async (
    data1: { table: any[][]; text: string },
    data2: { table: any[][]; text: string }
  ) => {
    try {
      setExcelData1(data1.table);
      setExcelDataText1(data1.text.split("\n"));
      setExcelData2(data2.table);
      setExcelDataText2(data2.text);

      sessionStorage.setItem(STORAGE_KEY_1, JSON.stringify(data1.table));
      sessionStorage.setItem(STORAGE_KEY_2, JSON.stringify(data2.table));
      sessionStorage.setItem(STORAGE_KEY_TEXT_1, data1.text);
      sessionStorage.setItem(STORAGE_KEY_TEXT_2, data2.text);
    } catch (error: any) {
      toast.error("Error setting Excel data");
    }
  };

  const handleClearData = () => {
    sessionStorage.removeItem(STORAGE_KEY_1);
    sessionStorage.removeItem(STORAGE_KEY_2);
    sessionStorage.removeItem(STORAGE_KEY_TEXT_1);
    sessionStorage.removeItem(STORAGE_KEY_TEXT_2);
    localStorage.removeItem("count");
    setExcelData1([]);
    setExcelDataText1([]);
    setExcelData2([]);
    setExcelDataText2("");
  };

  const handleOpenDialog = () => setImportDialogOpen(true);
  const handleCloseDialog = () => setImportDialogOpen(false);

  const handleViewData = (data: any[]) => {
    setViewData(data);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => setViewModalOpen(false);

  const handleOpenCreateOffer = () => setCreateOfferOpen(true);
  const handleCloseCreateOffer = () => setCreateOfferOpen(false);

  const paginatedData1 = useMemo(
    () =>
      Array.isArray(excelData1)
        ? excelData1.slice(
            page1 * rowsPerPage1,
            page1 * rowsPerPage1 + rowsPerPage1
          )
        : [],
    [excelData1, page1, rowsPerPage1]
  );

  const paginatedData2 = useMemo(
    () =>
      Array.isArray(excelData2)
        ? excelData2.slice(
            page2 * rowsPerPage2,
            page2 * rowsPerPage2 + rowsPerPage2
          )
        : [],
    [excelData2, page2, rowsPerPage2]
  );

  const handleChangePage1 = (_: any, newPage: number) => {
    if (excelData1.length > 0) {
      setPage1(newPage);
    }
  };

  const handleChangeRowsPerPage1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage1(parseInt(event.target.value, 10));
    setPage1(0);
  };

  const handleChangePage2 = (_: any, newPage: number) => {
    if (excelData2.length > 0) {
      setPage2(newPage);
    }
  };

  const handleChangeRowsPerPage2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage2(parseInt(event.target.value, 10));
    setPage2(0);
  };

  const isDataEmpty = excelData1.length === 0 && excelData2.length === 0;

  return (
    <>
      <Card sx={{ minHeight: 700, borderRadius: 5 }} className="rounded-2xl">
        <CardHeader
          title={t("Ai Excel Parser")}
          action={
            <Box display="flex" gap={1}>
              <Button variant="contained" onClick={handleOpenDialog}>
                {t("Import Files")}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleClearData}
                disabled={isDataEmpty}
              >
                {t("Clear Data")}
              </Button>
              <Button
                variant="contained"
                onClick={handleOpenCreateOffer}
                disabled={isDataEmpty}
              >
                {t("Create Offer")}
              </Button>
            </Box>
          }
        />
        <Divider />

        {isDataEmpty ? (
          <Fade in={isDataEmpty} timeout={500}>
            <Typography align="center" className="text-sm relative top-[10rem]">
              {t("No data available. Please import a file.")}
            </Typography>
          </Fade>
        ) : (
          <Box display="flex" justifyContent="space-around" p={2}>
            {/* Table for Excel Data 1 */}
            <TableContainer
              component={Paper}
              sx={{
                width: "45%",
                overflowY: "auto",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
              >
                <Typography variant="h6">{t("Product Type")}</Typography>
                <IconButton onClick={() => handleViewData(excelData1)}>
                  <VisibilityIcon className="text-blue-400" />
                </IconButton>
              </Box>
              {excelData1.length > 0 ? (
                <>
                  <Table stickyHeader>
                    <TableBody className="overflow-y-hidden">
                      {paginatedData1.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {row.map((cell: any, cellIndex: any) => (
                            <TableCell
                              key={cellIndex}
                              sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "150px",
                              }}
                            >
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={excelData1.length}
                    rowsPerPage={rowsPerPage1}
                    page={page1}
                    onPageChange={handleChangePage1}
                    onRowsPerPageChange={handleChangeRowsPerPage1}
                  />
                </>
              ) : (
                <Typography variant="body2" align="center">
                  {t("No Data Available")}
                </Typography>
              )}
            </TableContainer>

            {/* Table for Excel Data 2 */}
            <TableContainer
              component={Paper}
              sx={{
                width: "45%",
                overflowY: "auto",
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                p={1}
              >
                <Typography variant="h6">{t("Description")}</Typography>
                <IconButton onClick={() => handleViewData(excelData2)}>
                  <VisibilityIcon className="text-blue-400" />
                </IconButton>
              </Box>
              {excelData2.length > 0 ? (
                <>
                  <Table stickyHeader>
                    <TableBody className="overflow-y-hidden">
                      {paginatedData2.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {row.map((cell: any, cellIndex: any) => (
                            <TableCell
                              key={cellIndex}
                              sx={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                maxWidth: "150px",
                              }}
                            >
                              {cell}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={excelData2.length}
                    rowsPerPage={rowsPerPage2}
                    page={page2}
                    onPageChange={handleChangePage2}
                    onRowsPerPageChange={handleChangeRowsPerPage2}
                  />
                </>
              ) : (
                <Typography variant="body2" align="center">
                  {t("No Data Available")}
                </Typography>
              )}
            </TableContainer>
          </Box>
        )}
      </Card>

      <ImportAnswers
        open={importDialogOpen}
        handleClose={handleCloseDialog}
        onFileUpload={handleFileUpload}
      />
      <ViewDataModal
        open={viewModalOpen}
        onClose={handleCloseViewModal}
        data={viewData}
      />
      <CreateAiOffer
        open={createOfferOpen}
        onClose={handleCloseCreateOffer}
        data1={excelDataText1}
        data2={excelDataText2}
      />
    </>
  );
};

export default AnswersListTable;
