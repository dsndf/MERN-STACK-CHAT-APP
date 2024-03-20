import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import Table from "../../components/shared/Table";
import { sampleMessages } from "../../constants/sampleData";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "../../components/shared/RenderAttachment";
import moment from "moment";
import { Delete, Edit } from "@mui/icons-material";

const Messages = () => {
  const columns = useMemo(() => {
    return [
      {
        field: "id",
        headerName: "ID",
        width: 200,
        headerClassName: "table-header",
      },
      {
        field: "content",
        headerName: "CONTENT",
        width: 200,
        headerClassName: "table-header",
      },
      {
        field: "attachments",
        headerName: "ATTACHMENTS",
        width: 200,
        headerClassName: "table-header",
        renderCell: (params) => {
          const { attachments } = params.row;
          return (
            <Stack>
              {attachments &&
                attachments.map((i) => {
                  const file = fileFormat(i?.url);
                  return <RenderAttachment url={i?.url} file={file} />;
                })}
            </Stack>
          );
        },
      },
      {
        field: "chat",
        headerName: "CHAT",
        width: 200,
        headerClassName: "table-header",
      },
      {
        field: "creator",
        headerName: "CREATOR",
        width: 200,
        headerClassName: "table-header",
        renderCell: (params) => {
          const { creator } = params.row;
          return (
            <Stack direction={"row"} alignItems={"center"} gap={"1rem"}>
              <Avatar src={creator?.avatar} />
              <Typography variant="p" color="initial">
                {creator?.name}
              </Typography>
            </Stack>
          );
        },
      },
      {
        field: "createdAt",
        headerName: "CREATED AT",
        width: 200,
        headerClassName: "table-header",
        renderCell: (params) => (
          <>{moment().format("YYYY MMM DD ,  HH:MM A")}</>
        ),
      },
      {
        field: "actions",
        headerName: "ACTIONS",
        width: 150,
        headerClassName: "table-header",
        renderCell: (params) => (
          <Stack direction={"row"} alignItems={"center"} gap={"1rem"}>
            <IconButton color="dark">
              <Edit />
            </IconButton>
            <IconButton color="dark">
              <Delete />
            </IconButton>
          </Stack>
        ),
      },
    ];
  }, []);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      sampleMessages.map((i) => {
        return {
          id: i._id,
          content: i.content,
          creator: {
            name: i.sender.name,
            avatar: i.sender.avatar,
          },
          createdAt: i.createdAt,
          attachments: i.attachments,
          chat: i.chatId,
        };
      })
    );
  }, []);

  return (
    <AdminLayout>
      <Table columns={columns} rows={rows} title={"MESSAGES"} rowHeight={150} />
    </AdminLayout>
  );
};

export default Messages;
