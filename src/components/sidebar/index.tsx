import { os } from "@tauri-apps/api";
import React, { useEffect } from "react";
import { RootState } from "../../store/rootreducer";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper, Content, SidebarActionButton, Button, BottomButtons } from "./style";
import brandlogo from "../../assets/brandlogo.svg"
import downloadIcon from "../../assets/downloadIcon.svg"
import settingsIcon from "../../assets/settingsIcon.svg"
import { RootAction } from "../../store/actions";
import { Dispatch } from "redux";
import { SIDEBAR_DOWNLOAD_BUTTON_CLICKED, SIDEBAR_SERVER_BUTTON_CLICKED, SIDEBAR_SETTINGS_BUTTON_CLICKED } from "../../store/actions/sidebar";

const Sidebar = () => {

  // subscribing to the current view
  const currentView = useSelector(({currentView} : RootState) => currentView)

  const dispatch = useDispatch<Dispatch<RootAction>>()

  return (
    <Wrapper>
      <Content withWindowButtons={true}>
        <Button onClick={() => dispatch({type: SIDEBAR_SERVER_BUTTON_CLICKED})}>
          <SidebarActionButton tooltip={"Rocket Chat Open Server"} isSelected={true}>
            <img src={brandlogo} style={{height: "100%"}} /> 
          </SidebarActionButton>
        </Button>
        <BottomButtons>
          <Button onClick={() => dispatch({ type:  SIDEBAR_DOWNLOAD_BUTTON_CLICKED})}>
            <SidebarActionButton tooltip={"Download Manager"} >
              <img src={downloadIcon}  style={{height: "100%"}} />
            </SidebarActionButton>
          </Button> 
          <Button onClick={() => dispatch({ type: SIDEBAR_SETTINGS_BUTTON_CLICKED})}>
            <SidebarActionButton tooltip={"Control Panel"} >
              <img src={settingsIcon}  style={{height: "100%"}} />
            </SidebarActionButton>
          </Button>
        </BottomButtons>
      </Content>
    </Wrapper> 
  )
}

export default Sidebar;
