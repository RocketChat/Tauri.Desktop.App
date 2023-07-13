import DownloadManager from '../components/downloadManagerView';
import ServerView from '../components/openServerView';
import Settings from '../components/settingsView';
import Sidebar from '../components/Sidebar';
import { GlobalStyles, Wrapper, WindowDragBar, ViewsWrapper } from './styles';

export const Shell = () => {

  return (
    <>
      <GlobalStyles/>
      <WindowDragBar/>
      <Wrapper> 
        <Sidebar/>
        <ViewsWrapper>
          <ServerView/>
          <DownloadManager/>
          <Settings/>
        </ViewsWrapper>
      </Wrapper>
    </>
  );
}