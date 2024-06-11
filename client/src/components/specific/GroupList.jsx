import { Stack } from "@mui/material";
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
      sx={{ overflow: "auto" }}
      width={"100%"}
    >
      {groupList &&
        groupList.map((group,i) => (
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
    </Stack>
  );
};

export default GroupList;
