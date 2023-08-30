import { useState } from "react"
import "./style.css"
import { ServerItem } from "./serverItem"
import { RCServer } from "."

type ServerListProps = {
    servers: RCServer[];
    makeDefaultServer: (index: number, serverUrl: string) => void;
    removeServer: (index: number) => void;
}

export const ServerList = ({ servers, makeDefaultServer, removeServer } : ServerListProps) => {

    return (
        <div className="serversList">
            {
                servers.map((server, index) => <ServerItem index={index} server={server} makeDefaultServer={makeDefaultServer} removeServer={removeServer}/>)
            }
        </div>
    )
}

