import { RCServer } from "./index";

type ServerItemProps = {
    server: RCServer
    index: number;
    makeDefaultServer: (index: number, serverUrl: string) => void;
    removeServer: (index: number) => void;
}

export const ServerItem = ({server, index, makeDefaultServer, removeServer} : ServerItemProps) => {
    return (
        <div className="serverItem">
            <p>{server.serverUrl}</p>
            { server.isDefault ? <div className="defaultBadge">
                default
            </div> :
            <div className="serverItemActions">
                <button className="serverAction" onClick={() => makeDefaultServer(index, server.serverUrl)}>
                    Make Default
                </button>
                <button className="serverAction" onClick={() => removeServer(index)}>
                    Remove
                </button>
            </div> }
        </div>
    )
}