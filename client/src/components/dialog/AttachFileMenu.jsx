import {
  AudiotrackOutlined as AudioIcon,
  Image as ImageIcon,
  VideoCameraFront as VideoIcon,
} from "@mui/icons-material";
import { IconButton, Menu, MenuItem, MenuList, Tooltip } from "@mui/material";
import React, { memo, useRef } from "react";

const AttachFileMenuItem = ({ icon, tooltipTitle, onClick }) => {
  return (
    <Tooltip title={tooltipTitle} placement="right">
      <IconButton onClick={onClick}>{icon}</IconButton>
    </Tooltip>
  );
};
const FileInputButton = ({
  inputName,
  accept,
  isMultiple = true,
  inputRef,
  onchange,
}) => {
  return (
    <input
      style={{
        opacity: 0,
        position: "absolute",
        zIndex: -1,
        cursor: "pointer",
      }}
      ref={inputRef}
      name={inputName}
      type="file"
      multiple={isMultiple}
      accept={accept}
      onChange={onchange}
    />
  );
};
const AttachFileMenu = ({
  anchorEle,
  open,
  closeHandler,
  sendAttachmentsHandler: changeHandler,
}) => {
  const imageFileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);
  const audioFileInputRef = useRef(null);
  const handlers = {
    Image: () => {
      imageFileInputRef.current?.click();
    },
    Video: () => {
      videoFileInputRef.current?.click();
    },
    Audio: () => {
      audioFileInputRef.current?.click();
    },
  };

  return (
    <Menu open={open} onClose={closeHandler} anchorEl={anchorEle}>
      <form encType="multipart/form-data">
        <MenuList sx={{ overflow: "hidden" }}>
          <MenuItem
            sx={{ position: "relative", ":hover": { bgcolor: "white" } }}
            disableTouchRipple={true}
          >
            <AttachFileMenuItem
              icon={<ImageIcon />}
              tooltipTitle={"Image"}
              onClick={handlers["Image"]}
            />
            <FileInputButton
              inputName={"imagefile"}
              accept={"image/jpeg, image/jpg, image/png, image/gif"}
              inputRef={imageFileInputRef}
              onchange={changeHandler}
            />
          </MenuItem>
          <MenuItem
            sx={{ position: "relative", ":hover": { bgcolor: "white" } }}
            disableTouchRipple={true}
          >
            <AttachFileMenuItem
              icon={<VideoIcon />}
              tooltipTitle={"Video"}
              onClick={handlers["Video"]}
            />
            <FileInputButton
              inputName={"imagefile"}
              accept={"video/mp4, video/webm, video/ogg"}
              inputRef={videoFileInputRef}
              onchange={changeHandler}
            />
          </MenuItem>
          <MenuItem
            sx={{ position: "relative", ":hover": { bgcolor: "white" } }}
            disableTouchRipple={true}
          >
            <AttachFileMenuItem
              icon={<AudioIcon />}
              tooltipTitle={"Audio"}
              onClick={handlers["Audio"]}
            />
            <FileInputButton
              inputName={"audiofile"}
              accept={"audio/mp3, audio/wav"}
              inputRef={audioFileInputRef}
              onchange={changeHandler}
            />
          </MenuItem>
        </MenuList>
      </form>
    </Menu>
  );
};

export default memo(AttachFileMenu);
