import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';


export const CommissionPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();


  const handleAgentCommission = useCallback(
    () => {
      onClose?.();
      router.push('/agentCommissions');
    },
    [onClose,  router]
  );
  const handleIntermediaryCommission = useCallback(
    () => {
      onClose?.();
      router.push('/agentCommissions');
    },
    [onClose,  router]
  );

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 2
          }
        }}
      >
        <MenuItem onClick={handleAgentCommission}>
          Agent commission
        </MenuItem>
        <MenuItem onClick={handleIntermediaryCommission}>
          Intermediary commission
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

CommissionPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
