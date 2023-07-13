import { ActionOf } from "../actions";  
import { SIDEBAR_SERVER_BUTTON_CLICKED, SIDEBAR_DOWNLOAD_BUTTON_CLICKED, SIDEBAR_SETTINGS_BUTTON_CLICKED } from "../actions/sidebar";

// define actions
type currentViewActions = ActionOf<typeof SIDEBAR_SERVER_BUTTON_CLICKED> | ActionOf<typeof SIDEBAR_DOWNLOAD_BUTTON_CLICKED> | ActionOf<typeof SIDEBAR_SETTINGS_BUTTON_CLICKED>

// define states
type currentViewStates = 'server_view' | 'settings_view' | 'downloads_view';

// define reducer
// func (state: 'server_view', action : currentViewActions) => currentViewStates

export const currentView = (
  state: currentViewStates = 'server_view',
  action: currentViewActions
) : currentViewStates => {
    switch (action.type){
      case SIDEBAR_SERVER_BUTTON_CLICKED:
        return 'server_view';
      case SIDEBAR_DOWNLOAD_BUTTON_CLICKED:
        return 'downloads_view';
      case SIDEBAR_SETTINGS_BUTTON_CLICKED:
        return 'settings_view';
      default:
        return state
    }
}
