import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import Table from "../../components/shared/Table";
import {
  Avatar,
  AvatarGroup,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { chats } from "../../constants/sampleData";
import { useFetchData } from "6pp";
import { server } from "../../config/settings";
import { useErrors } from "../../hooks/useErrors";
import Title from "../../components/shared/Title";

const Chats = () => {
  const {
    data,
    error: chatsError,
    loading,
  } = useFetchData(server + "/admin/chats", "admin-chats");

  useErrors(
    [
      {
        isError: Boolean(chatsError),
        error: chatsError,
      },
    ],
    [chatsError]
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
        width: 250,
        renderCell: (params) => (
          <AvatarGroup>
            {params.row.avatar?.map(({ public_id, url }, ind) => (
              <Avatar key={public_id} src={url} />
            ))}
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
            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <Avatar src={creator?.avatar?.url} />
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
    ],
    []
  );

  console.log({ rows, data });

  useEffect(() => {
    if (data?.allChats) {
      setRows(
        data.allChats.map((i) => {
          return { ...i, id: i._id };
        })
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      <Title title={"Chats"} description={"Admin All Chats."} />
      <Table
        isFetching={loading}
        rows={rows}
        columns={columns}
        pageSize={8}
        title={"CHATS"}
      />
    </AdminLayout>
  );
};

export default Chats;
