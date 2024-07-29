import React, { memo } from "react";
import { CircularProgress, Paper, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { darkBlue } from "../../constants/color";

const Table = ({
  isFetching = false,
  columns,
  rows,
  title,
  rowHeight,
  pageSize = 6,
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        px: "2rem",
        py: "2rem",
        height: "100%",
        m: "auto",
        width: { xs: "100%", md: "80%" },
      }}
    >
      <Typography
        variant="h4"
        mb={"2rem"}
        sx={{ textAlign: { xs: "center", md: "left" } }}
        color="initial"
      >
        ALL {title}
      </Typography>
      {isFetching ? (
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <DataGrid
          getRowId={(row) => row.id}
          style={{ height: "90%" }}
          rowHeight={rowHeight}
          initialState={{
            pagination: { paginationModel: { pageSize, page: 0 } },
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
      )}
    </Paper>
  );
};

export default memo(Table);
