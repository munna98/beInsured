import {
    Grid,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
  } from "@mui/material";
  import { DatePicker } from "@mui/x-date-pickers";
  
  export const ReportCriteriaForm = ({
    agentData,
    agentplanData,
    values,
    onChange,
    onFromDateChange,
    onToDateChange,
    onSubmit,
    onExtendedChange,
    extended,
    loading,
  }) => {
    return (
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="report-type-label">Report Type</InputLabel>
            <Select
              labelId="report-type-label"
              name="reportType"
              value={values.reportType}
              label="Report Type"
              onChange={onChange}
            >
              {agentplanData.map((type) => (
                <MenuItem key={type._id} value={type._id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel id="agent-label">Agent</InputLabel>
            <Select
              labelId="agent-label"
              name="agent"
              value={values.agent}
              label="Agent"
              onChange={onChange}
            >
              {agentData.map((agent) => (
                <MenuItem key={agent._id} value={agent._id}>
                  {agent.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2.5}>
          <DatePicker
            fullWidth
            label="From Date"
            name="fromdate"
            renderInput={(params) => <TextField {...params} />}
            value={values.fromDate}
            onChange={onFromDateChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2.5}>
          <DatePicker
            fullWidth
            label="To Date"
            name="todate"
            renderInput={(params) => <TextField {...params} />}
            value={values.toDate}
            onChange={onToDateChange}
          />
        </Grid>
        {/* <Grid item xs={12} md={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={extended}
                onChange={onExtendedChange}
                color="primary"
              />
            }
            label="Expand"
          />
        </Grid> */}
        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onSubmit}
            type="submit"
            disabled={loading}
          >
            Generate Report
          </Button>
        </Grid>
      </Grid>
    );
  };
                                                                                      