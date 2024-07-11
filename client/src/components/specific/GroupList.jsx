import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import GroupListItem from "../shared/GroupListItem";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
const GroupList = ({
  groupList = [
    { _id: "nasda" },
    { _id: "Dsadnbsa" },
    { _id: "Dsadnbsas" },
    { _id: "Dsadnbssa" },
  ],
  activeId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Stack
      alignItems={"center"}
      height={"100vh"}
      sx={{ overflow: "auto", width: { xs: "300px", md: "auto" } }}
    >
      {groupList &&
        groupList.map((group, i) => (
          <motion.div
            initial={{ y: "-10%", opacity: 0 }}
            whileInView={{
              y: "0%",
              opacity: 1,
              transition: { delay: (i + 1) / 10 },
            }}
            style={{ width: "100%" }}
            onClick={() => {
              navigate("/groups?group=" + group?._id);
            }}
          >
            <GroupListItem
              key={group?._id}
              totalMembers={group?.totalMembers}
              group_name={group?.name}
              avatar={group?.avatar}
              isActive={group?._id === activeId}
            />
          </motion.div>
        ))}
      {!groupList.length && (
        <Box>
          <Typography textAlign={"center"} fontSize={"20px"} p={"2rem"}>
            No Groups!
          </Typography>
          <Typography
            component={"p"}
            px={"0.5rem"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            textAlign={"center"}
            variant="body1"
          >
            Go to Home and create new groups
          </Typography>
        </Box>
      )}
    </Stack>
  );
};

export default GroupList;
