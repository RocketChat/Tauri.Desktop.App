export const SIDEBAR_SERVER_BUTTON_CLICKED = "sidebar/server_button_clicked";
export const SIDEBAR_DOWNLOAD_BUTTON_CLICKED = "sidebar/download_button_clicked";
export const SIDEBAR_SETTINGS_BUTTON_CLICKED = "sidebar/settings_button_clicked";

export type SidebarActionTypeToPayloadMap = {
  [SIDEBAR_DOWNLOAD_BUTTON_CLICKED] : void;
  [SIDEBAR_SERVER_BUTTON_CLICKED] : void;
  [SIDEBAR_SETTINGS_BUTTON_CLICKED] : void;
}
