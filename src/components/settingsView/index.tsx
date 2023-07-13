import { useSelector } from "react-redux"
import { RootState } from "../../store/rootreducer"

const Settings = () => {

  const isVisible = useSelector(( { currentView } : RootState) => currentView === "settings_view")

  return (
    <p style={{color:"white", display: isVisible ? "flex" : "none"}}>Settings Manager</p>
  )
}

export default Settings
