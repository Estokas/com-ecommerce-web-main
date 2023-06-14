import PropTypes from "prop-types";
import React, { ReactElement } from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import FilterIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";
import MuiTableContainer from "@mui/material/TableContainer";
import CircularProgress from "@mui/material/CircularProgress";
import { CardHeader } from "@mui/material";

interface Props extends React.PropsWithChildren {
  title?: string,
  actions?: ReactElement,
  loading?: boolean,
  empty?: boolean,
  onReload?: () => void,
  placeholder?: string,
  error?: string,
  disableFilter?: boolean,
  disablePaginate?: boolean,
  onSearchChange?: (value: string) => void,
  searchValue?: string,
}

const TableContainer: React.FC<Props> = (props) => {
  const { 
    title,
    actions, 
    empty, 
    children, 
    loading, 
    onReload, 
    error,
    disableFilter,
    disablePaginate,
    onSearchChange,
    searchValue,
    placeholder = "Search"
  } = props;

  return (
    <Grid container direction="column" gap={3} alignItems="stretch">
      <Grid item xs>
        <Card 
          variant="outlined" 
          sx={{ bgcolor: 'transparent', '&:hover': { }, cursor: 'default' }}>
          {title && (<CardHeader title={title}/>)}
          {/* <MuiAppBar
            position="static"
            color="secondary"
            elevation={0}
            sx={{
              py: "5px",
              px: "10px",
              borderBottomWidth: 1,
              borderBottomColor: "grey.200",
              borderBottomStyle: "solid",
              bgcolor: "transparent",
            }}
          >
            <Grid container gap={2} alignItems="center">
              {
                !disableFilter && (
                  <Grid item>
                    <Tooltip title="Filter">
                      <IconButton>
                        <FilterIcon color="inherit" sx={{ display: "block" }} />
                      </IconButton>
                    </Tooltip>
                </Grid>
                )
              }
              {
                onSearchChange && (
                  <Grid item xs>
                    <TextField
                      fullWidth
                      placeholder={placeholder}
                      value={searchValue}
                      onChange={(e) => onSearchChange(e.target.value)}
                      InputProps={{
                        disableUnderline: true,
                        sx: { fontSize: "default" },
                      }}
                      variant="standard"
                    />
                  </Grid>
                )
              }
              <Grid item alignSelf="center">
                {actions}
                <Tooltip title="Reload">
                  <IconButton onClick={onReload}>
                    {loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <RefreshIcon color="inherit" sx={{ display: "block" }} />
                    )}
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </MuiAppBar> */}
          {error ? (
            <Typography sx={{ my: 5 }} color="text.secondary" align="center">
              {error}
            </Typography>
          ) :
            empty || loading ? (
            <Typography sx={{ my: 5 }} color="text.primary" align="center">
              No data for this module yet
            </Typography>
          ) : (
            <MuiTableContainer>{children}</MuiTableContainer>
          )}
        </Card>
      </Grid>
      {
        !disablePaginate && (
          <Grid item xs sx={{ alignSelf: "center" }}>
            <Pagination count={10} color="primary" disabled={!!(empty || error || loading)} />
          </Grid>
        )
      }
    </Grid>
  );
};


export default TableContainer;
