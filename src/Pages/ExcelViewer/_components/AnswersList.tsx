// MUI Imports
import Grid from "@mui/material/Grid";

// Component Imports
import ProvinceListTable from "./AnswersListTable";

const AnswersList = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProvinceListTable />
      </Grid>
    </Grid>
  );
};

export default AnswersList;
