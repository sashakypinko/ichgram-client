import type { ReactElement } from 'react';
import { styled, Typography } from '@mui/material';
import Button from '@shared/components/button';

const Count = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
});

const Entity = styled(Typography)({
  fontSize: 16,
  fontWeight: 400,
});

interface Props {
  count: number;
  entity: string;
  onClick?: () => void;
}

const ButtonWithCount = ({ count, entity, onClick }: Props): ReactElement => {
  return (
    <Button color="inherit" onClick={onClick} disabled={!count}>
      <Count>{count}</Count>&nbsp;<Entity>{entity}</Entity>
    </Button>
  );
};

export default ButtonWithCount;
