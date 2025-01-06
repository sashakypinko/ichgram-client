import { FC } from 'react';
import { ListItemButton, ListItemIcon, styled, Typography } from '@mui/material';
import { IconProps } from '@shared/components/icons/icon';
import useIsBreakpoint from '@shared/hooks/use-is-breakpoint.hook';
import Breakpoint from '@shared/enums/breakpoint.enum';

const Label = styled(Typography)({
  marginLeft: 16,
});

interface Props {
  label: string;
  Icon: FC<IconProps>;
  isActive: boolean;
  onClick?: () => void;
}

const SidebarButton: FC<Props> = ({ label, Icon, isActive, onClick }) => {
  const isLg = useIsBreakpoint(Breakpoint.LG);
  const displayLabel = !isLg;

  return (
    <ListItemButton
      sx={{ px: 2, minHeight: 50, borderRadius: 2, justifyContent: displayLabel ? 'start' : 'center' }}
      onClick={onClick}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          justifyContent: 'center',
        }}
      >
        <Icon inverse={isActive} />
      </ListItemIcon>
      {displayLabel && <Label sx={{ fontWeight: isActive ? 700 : 400 }}>{label}</Label>}
    </ListItemButton>
  );
};

export default SidebarButton;
