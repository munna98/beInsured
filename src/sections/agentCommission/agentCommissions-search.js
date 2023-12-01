import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const AgentCommissionsSearch = ({ searchTerm, handleSearchChange }) => {
  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        value={searchTerm}
        fullWidth
        placeholder="Search Agent Commissions"
        onChange={handleSearchChange}
        startAdornment={(
          <InputAdornment position="start">
            <SvgIcon
              color="action"
              fontSize="small"
            >
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        )}
        sx={{ maxWidth: 500 }}
      />
    </Card>
  )
};