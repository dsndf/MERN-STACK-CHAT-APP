import {
  StyledChatListColumn,
  StyledProfileColumn,
} from "../style/StyleComponent";
import Footer from "./Footer";
import Header from "./Header";
import { Stack } from "@mui/material";

import Profile from "../specific/Profile";
import ChatList from "../specific/ChatList";
import { useParams } from "react-router-dom";
import { useGetMyChatsQuery } from "../../redux/api/query";


const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const {id} = useParams(); 
    const { data, error, refetch, isLoading } = useGetMyChatsQuery();
    console.log(data);  

    return (
      <>
        <Header />
        <Stack direction={"row"} spacing={1}>
          <StyledChatListColumn>
            <ChatList activeChatId={id}  chats={data?.chats} />
          </StyledChatListColumn>
          <WrappedComponent {...props} />
          <StyledProfileColumn>
            <Profile />
          </StyledProfileColumn>
        </Stack>
        <Footer />
      </>
    );
  };
};
export default AppLayout;
