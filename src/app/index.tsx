import { FC, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
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

import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import './index.css';

const App: FC = () => {
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

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', height: '100vh', overflowY: 'hidden' }}>
            <Sidebar />
            <Box width="100%" position="relative" flexGrow={1}>
              <UserOverlayPanel />
              <NotificationOverlayPanel />
              <NewConversationDialog />
              <FollowersDialog />
              <FollowingDialog />
              <PostFormDialog />
              <PostViewDialog />
              <Routes />
            </Box>
          </Box>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
