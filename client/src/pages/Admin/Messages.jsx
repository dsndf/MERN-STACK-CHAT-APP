import React, { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/layouts/AdminLayout";
import Table from "../../components/shared/Table";
import { sampleMessages } from "../../constants/sampleData";
import { Avatar, IconButton, Stack, Typography } from "@mui/material";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "../../components/shared/RenderAttachment";
import moment from "moment";
import { Delete, Edit } from "@mui/icons-material";
import { useFetchData } from "6pp";
import { server } from "../../config/settings";
import { useErrors } from "../../hooks/useErrors";
import Title from "../../components/shared/Title";

const Messages = () => {
  const {
    data,
    error: usersError,
    loading,
  } = useFetchData(server + "/admin/messages", "admin-messages");
  console.log({ data });
  useErrors(
    [
      {
        isError: Boolean(usersError),
        error: usersError,
      },
    ],
    [usersError]
  );

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
        headerAlign:"center",
        renderCell: (params) => {
          const { attachments } = params.row;
          return (
            <Stack alignItems={"flex-start"} height={"100%"} style={{ overflowY: "auto" }}>
              {attachments &&
                attachments.map((i) => {
                  const file = fileFormat(i?.url);
                  return (
                    <a href={i?.url} key={i?.public_id} download>

                      <RenderAttachment url={i?.url} file={file} />
                    </a>
                  );
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
    ];
  }, []);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (data?.messages)
      setRows(
        data?.messages?.map((i) => {
          return {
            id: i._id,
            content: i.content,
            creator: {
              name: i.sender?.name,
              avatar: i.sender?.avatar?.url,
            },
            createdAt: i.createdAt,
            attachments: i.attachments,
            chat: i.chat,
          };
        })
      );
  }, [data]);

  return (
    <AdminLayout>
        <Title title={"Messages"} description={"Admin All Messages."} />
      <Table columns={columns} rows={rows} title={"MESSAGES"} rowHeight={150} />
    </AdminLayout>
  );
};

export default Messages;
