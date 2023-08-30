
import "./style.css"
import { appWindow } from '@tauri-apps/api/window';
import { invoke } from "@tauri-apps/api";
import { ServerList } from "./serverList";
import { useEffect, useState } from "react";
import { Store } from "tauri-plugin-store-api";

export type RCServer = {
  serverUrl: string,
  isDefault: boolean
}

const Settings = () => {

  const store = new Store("../../../.store.json")
  const [servers, setServers] = useState<RCServer[]>([{ serverUrl: "https://open.rocket.chat", isDefault: true }])
  const [defaultServerIndex, setDefaultServerIndex] = useState<number>(0);
  const [serverUrl, setServerUrl] = useState<string>("")
  const [notificationsAllowedState, setNotificationsAllowed] = useState<boolean>(true)
  const [newWindowsOnServerSwitchState, setNewWindowsOnServerSwitch] = useState<boolean>(false);

  useEffect(() => {
    store.load().then(async () => {
      const servers = await store.get("servers")
      if (servers) {
        const serverUrls = servers as RCServer[];
        setServers(serverUrls)
        const defaultServer = (await store.get("defaultServer")) as { serverUrl: string, index: number }
        setDefaultServerIndex(defaultServer.index)
      } else {
        store.set("servers", [{ serverUrl: "https://open.rocket.chat", isDefault: true}])
        store.set("defaultServer", { serverUrl: "https://open.rocket.chat", index: 0 })
      }

      const allowNotifications = await store.get("allowNotifications")
      if (allowNotifications) {
        setNotificationsAllowed(allowNotifications as boolean)
      } else {
        store.set("allowNotifications", true)
      }

      const newWindowsOnServerSwitch = await store.get("newWindowsOnServerSwitch");
      if (newWindowsOnServerSwitch) {
        setNewWindowsOnServerSwitch(newWindowsOnServerSwitch as boolean)
      } else {
        store.set("newWindowsOnServerSwitch", false)
      }
    })

    store.save().then(() => {
      console.log("Store Saved")
    })

  }, [])

  useEffect(() => {
    store.set("servers", servers).then(() => {
      store.save().then(() => {
        console.log("Servers Saved")
      })
    })
  }, [servers])

  useEffect(() => {
    store.set("defaultServer", { serverUrl: servers[defaultServerIndex], index: defaultServerIndex}).then(() => {
      store.save().then(() => {
        console.log("Servers Saved")
      })
    })
  }, [defaultServerIndex])

  useEffect(() => {
    store.set("notificationAllowed", notificationsAllowedState).then(() => {
      store.save().then(() => {
        console.log("Servers Saved")
      })
    })
  }, [notificationsAllowedState])

  useEffect(() => {
    store.set("newWindowsOnServerSwitch", newWindowsOnServerSwitchState).then(() => {
      store.save().then(() => {
        console.log("Servers Saved")
      })
    })
  }, [newWindowsOnServerSwitchState])

  // useEffect(() => {
  // store.set("defaultServer", JSON.stringify({serverUrl : servers[defaultServerIndex].serverUrl, index: defaultServerIndex})).then(() => {
  //   store.save().then((value) => {
  //     console.log(value)
  //     console.log("Store Saved")
  //   })
  // })

  // }, [servers, defaultServerIndex])

  const makeDefaultServer = (index: number, serverUrl: string) => {
    invoke("change_default_server", {defaultServer: serverUrl})
    store.set("defaultServer", { serverUrl: serverUrl, index: index }).then(() => {
      store.save().then(() => {
        invoke("change_default_server", { defaultServer: serverUrl })
        setServers((prevServers) => {
          prevServers[index].isDefault = true;
          prevServers[defaultServerIndex].isDefault = false;
          return prevServers
        })
        setDefaultServerIndex(index);
      })
    })
  }

  const removeServer = (index: number) => {
    if (servers.length === 1) {
      setServers((prevServers) => {
        prevServers[0].isDefault = true
        return prevServers
      })
    } else {
      setServers((prevServers) => {
        const newServers = [...prevServers];
        newServers.splice(index, 1);
        return newServers;
      })
    }
  }

  const addServer = () => {
    setServers((prevServers) => [...prevServers, { serverUrl: serverUrl, isDefault: false }])
  }

  const closeWindow = () => {
    // Save Settings Before Closing
    appWindow.close()
  }

  return (
    <div className="settingsView">
      <div className="leftUtilityPane">
        <div className="imgDiv">
          <img id="rc-logo" src="../../../public/rocketChat.png" />
        </div>
        <div className="closeWindowDiv">
          <button onClick={closeWindow} className="closeButton">Close Settings</button>
        </div>
      </div>
      <div className="rightSettingsPane">
        <p className="topHeading">Preferences</p>
        <div className="generalSettings">
          <div className="checkboxItem">
            <input className="inputCheckbox" type="checkbox" defaultChecked={notificationsAllowedState} value={"checked"} name="Allow Notifications" />
            <label>Allow Noticiations</label>
          </div>
          <div className="checkboxItem">
            <input className="inputCheckbox" type="checkbox" name="Allow Notifications" defaultChecked={newWindowsOnServerSwitchState} />
            <label>Popup New Windows on Server Switch</label>
          </div>
        </div>
        <div className="serversPane">
          <div className="serverAddPane">
            <input className="serverInput" type="url" value={serverUrl} onChange={(event) => setServerUrl(event.target.value)} placeholder="Enter Rocket.Chat Server URL" />
            <button onClick={() => addServer()} className="serverAddButton">Add</button>
          </div>
          <ServerList servers={servers} removeServer={removeServer} makeDefaultServer={makeDefaultServer} />
        </div>
      </div>
    </div>
  )
}

export default Settings
