import React, { memo } from "react";
import { Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { darkBlue } from "../../constants/color";

const Table = ({ columns, rows, title, rowHeight }) => {
  return (
    <Paper
      elevation={3}
      sx={{ px: "2rem", py: "2rem", height: "100%",m:"auto" ,width:{xs:"100%",md:"80%"}}}
    >
      <Typography variant="h4" mb={"2rem"} sx={{textAlign:{xs:"center",md:"left"}}} color="initial">
        ALL {title}
      </Typography>
      <DataGrid
        getRowId={(row) => row.id}
        style={{ height: "90%" }}
        rowHeight={rowHeight}
        initialState={{
          pagination: { paginationModel: { pageSize: 6, page: 1 } },
        }}
        sx={{
          border: "none",
          ".table-header": {
            bgcolor: darkBlue,
            color: "white",
          },
        }}
        rows={rows}
        columns={columns}
      />
    </Paper>
  );
};

export default  memo(Table);
