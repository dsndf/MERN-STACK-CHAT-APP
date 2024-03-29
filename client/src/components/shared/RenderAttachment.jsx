import { FileOpen } from "@mui/icons-material";
import React from "react";
import { transformImage } from "../../lib/features";

const RenderAttachment = ({ file, url }) => {
  switch (file) {
    case "image":
      return  <img
          src={transformImage(url,'200')}
          width={"200px"}
          height={"150px"}
          style={{ objectFit: "contain" }}
          alt="Attachment"
          download
        />
    case "video":
      return <video src={url} preload="none" controls width={"200px"}/>;
      break;
      case 'audio':
      return   <audio src={url} preload="none" controls />
        break;
    default:
        <FileOpen   />
      break;
  }
};

export default RenderAttachment;
