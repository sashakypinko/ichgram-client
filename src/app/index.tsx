import { FC, useEffect, useState } from 'react';
import { Box, CssBaseline, styled, ThemeProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './configs/theme';
import Routes from './routes/routes';
import SnackbarProvider from '@shared/components/snackbar';
import { useAppDispatch } from '@app/hooks';
import { getUser } from '@features/auth/store/slice';
import Sidebar from '@shared/components/sidebar';
import { AuthStorage } from '@features/auth/services/auth-storage';
import useAuthUser from '@features/auth/hooks/use-auth-user.hook';
import { getConversations } from '@entities/conversation/store/slice';
import UserOverlayPanel from '@entities/user/components/user-overlay-panel';
import NotificationOverlayPanel from '@entities/notification/components/notification-overlay-panel';
import NewConversationDialog from '@entities/conversation/components/new-conversation-dialog';
import FollowersDialog from '@entities/user/components/followers-dialog';
import FollowingDialog from '@entities/user/components/following-dialog';
import PostFormDialog from '@entities/post/components/post-form-dialog';
import PostViewDialog from '@entities/post/components/post-view-dialog';
import ErrorBoundary from '@shared/components/error-boundary';
import MobileHeader from '@shared/components/mobile-header';

import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import './index.css';

const MainContainer = styled(Box)({
  display: 'flex',
  overflowY: 'hidden',
});

const Content = styled(Box)({
  width: '100%',
  position: 'relative',
  flexGrow: 1,
});

const App: FC = () => {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  
  const dispatch = useAppDispatch();
  const authUser = useAuthUser();

  useEffect(() => {
    if (AuthStorage.getAccessToken()) {
      dispatch(getUser());
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      dispatch(getConversations());
    }
  }, [authUser]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <SnackbarProvider>
          <CssBaseline />
          <Router
            // Enabling future flags for React Router v7 to adopt upcoming behavior
            // @ts-ignore
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <MainContainer sx={{ height: windowHeight }}>
              <MobileHeader />.
              <Sidebar />
              <Content>
                <UserOverlayPanel />
                <NotificationOverlayPanel />
                <NewConversationDialog />
                <FollowersDialog />
                <FollowingDialog />
                <PostFormDialog />
                <PostViewDialog />
                <Routes />
              </Content>
            </MainContainer>
          </Router>
        </SnackbarProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
