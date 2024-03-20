import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, IconButton, Stack } from "@mui/material";
import { userTableData } from "../../constants/sampleData";
import { Delete, Edit } from "@mui/icons-material";

const ManageUsers = () => {
  const [rows,setRows] = useState([]);
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        headerClassName: "table-header",
        width: 200,
      },
      {
        field: "name",
        headerName: "NAME",
        headerClassName: "table-header",
        width: 200,
      },
      {
        field: "avatar",
        headerName: "AVATAR",
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => <Avatar src={params.row.avatar} />,
      },
      {
        field: "groups",
        headerName: "GROUPS",
        headerClassName: "table-header",
        width: 200,
      },
      {
        field: "friends",
        headerName: "FRIENDS",
        headerClassName: "table-header",
        width: 200,
      },
      {
        field: "action",
        headerName: "Action",
        headerClassName: "table-header",
        width: 150,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <Stack direction={"row"} gap={2}>
            <IconButton color="dark">
              <Edit />
            </IconButton>
            <IconButton color="dark">
              <Delete />
            </IconButton>
          </Stack>
        ),
      },
    ],
    []
  );
  
  useEffect(() => {
    setRows(userTableData.map((i)=>{
      return {...i , id:i._id};
    } ))
  }, []);

  return (
    <AdminLayout>
      <Table
        columns={columns}
        rows={rows}
        title={"USERS"}
        rowHeight={75}
      />
    </AdminLayout>
  );
};

export default ManageUsers;
