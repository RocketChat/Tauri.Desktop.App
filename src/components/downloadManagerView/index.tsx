import { useSelector } from "react-redux"
import { RootState } from "../../store/rootreducer"

const DownloadManager = () => {

  const isVisible = useSelector(( { currentView } : RootState) => currentView === "downloads_view")
  return (
    <p style={{color:"white", display: isVisible ? "flex" : "none"}}>Download Manager View </p>
  )
}

export default DownloadManager
