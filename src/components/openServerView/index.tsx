import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/rootreducer"
import { StyledWebView, Wrapper } from "./style"

const ServerView = () => {

  const isselected = useSelector(( { currentView } : RootState) => currentView === "server_view")
  const webviewref = useRef<ReturnType<typeof document['createElement']>>(null);

  return (
    <Wrapper isVisible={isselected}>
      <StyledWebView
        src={"https://open.rocket.chat"}
        ref={webviewref}
        partition={`persist:https://open.rocket.chat`}
        {...({ allowpopups: 'allowpopups' } as any)}
      />
    </Wrapper>

  )
}

export default ServerView

