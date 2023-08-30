import DownloadManager from '../components/downloadManagerView';
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/api/notification';
import ServerView from '../components/openServerView';
import Settings from '../components/settingsView';
import Sidebar from '../components/Sidebar';
import { GlobalStyles, Wrapper, WindowDragBar, ViewsWrapper } from './styles';
import { useEffect } from 'react';

export const Shell = () => {

  const confirmNotificationPermission = async () => {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === 'granted';
    }
    if (permissionGranted) {
      console.log("Permission Granted")
      sendNotification('Tauri is awesome!');
      sendNotification({ title: 'TAURI', body: 'Tauri is awesome!' });
    }
  }

  (async() => await confirmNotificationPermission())()

  return (
    <>
      <GlobalStyles />
      <WindowDragBar />
      <Wrapper>
        <Sidebar />
        <ViewsWrapper>
          <ServerView />
          <DownloadManager />
        </ViewsWrapper>
      </Wrapper>
    </>
  );
}