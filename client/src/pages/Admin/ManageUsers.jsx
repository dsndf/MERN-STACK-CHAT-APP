import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, IconButton, Stack } from "@mui/material";
import { userTableData } from "../../constants/sampleData";
import { Delete, Edit } from "@mui/icons-material";
import { useErrors } from "../../hooks/useErrors";
import { useFetchData } from "6pp";
import { server } from "../../config/settings";
import Title from "../../components/shared/Title";

const ManageUsers = () => {
  const {
    data,
    error: usersError,
    loading,
  } = useFetchData(server + "/admin/users", "admin-users");
 console.log({data})
  useErrors(
    [
      {
        isError: Boolean(usersError),
        error: usersError,
      },
    ],
    [usersError]
  );
  const [rows, setRows] = useState([]);
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
        renderCell: (params) => <Avatar src={params.row.avatar?.url} />,
      },
      {
        field: "totalGroups",
        headerName: "GROUPS",
        headerClassName: "table-header",
        width: 200,
      },
      {
        field: "friends",
        headerName: "FRIENDS",
        headerClassName: "table-header",
        width: 200,
        renderCell:(params)=><Avatar src={params.row.avatar?.url}/>
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
    if (data?.allUsers) {
      setRows(
        data.allUsers.map((i) => {
          return { ...i, id: i._id };
        })
      );
    }
  }, [data]);

  return (
    <AdminLayout>
       <Title title={"Users"} description={"Admin All Users."} />
      <Table columns={columns} rows={rows} title={"USERS"} rowHeight={75} />
    </AdminLayout>
  );
};

export default ManageUsers;
