
import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import Table from "../../components/shared/Table";
import { Avatar, AvatarGroup, IconButton, Stack, Typography } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { chats } from "../../constants/sampleData";

const Chats = () => {
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
        width: 250,
        renderCell: (params) => (
          <AvatarGroup>
            {
              params.row.avatar?.map((i,ind)=><Avatar key={i} src={i} />)
            }
         
          </AvatarGroup>
        ),
      },
      {
        field: "creator",
        headerName: "CREATOR",
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => {
          const { creator } = params.row;
          return (
            <Stack direction={"row"} gap={2}  alignItems={'center'}>
              <Avatar src={creator?.avatar} />
              <Typography variant="p" color="initial">
                {creator?.name}
              </Typography>
            </Stack>
          );
        },
      },
      {
        field: "totalMembers",
        headerName: "TOTAL MEMBERS",
        headerClassName: "table-header",
        width: 200,
        
      },
      {
        field: "totalMessages",
        headerName: "TOTAL MESSAGES",
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
          <Stack direction={"row"} gap={2} alignItems={'center'}>
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
    setRows(
     chats.map((i) => {
        return { ...i, id: i._id };
      })
    ); 
  }, []);
  
  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} title={"CHATS"} />
    </AdminLayout>
  );
};

export default Chats;
