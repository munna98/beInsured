import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Avatar, 
  Box, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Typography, 
  IconButton, 
  Stack, 
  Collapse,
  Grid 
} from '@mui/material';
import PencilIcon from '@heroicons/react/24/solid/PencilIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import { SvgIcon, Tooltip } from '@mui/material';
import DeleteDialog from 'src/components/delete-dialog';
import { format } from 'date-fns';

export const RmsCardList = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    setData,
    apiUrl = '',
    rmToEdit = {},
    setRmToEdit,
    setDisplayForm,
  } = props;

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [expanded, setExpanded] = useState(false);

  const handleClickDeleteOpen = (id) => {
    setDeleteDialogOpen(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setDeleteDialogOpen(false);
  };

  const fetchRm = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setData(data);
  };

  const handleEdit = (rmId) => {
    setDisplayForm((prev) => true);
    const rm = items.find((rm) => rm._id === rmId);
    setRmToEdit(rm);
  };

  const handleExpandClick = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {items.map((rm) => (
          <Grid item xs={12} sm={6} md={3} key={rm.id}>
            <Card>
              <CardContent>
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Avatar
                src={rm.avatar}
                sx={{
                  height: 80,
                  mb: 2,
                  width: 80,
                }}
              />
              <Typography gutterBottom variant="h5">
                {rm.firstName}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {rm.email}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {rm.phone}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {rm.location}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                {format(new Date(rm.createdAt), 'dd-MM-yyyy')}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Stack direction="row" spacing={1}>
              <IconButton>
                <Tooltip title="Edit">
                  <SvgIcon
                    fontSize="small"
                    cursor="pointer"
                    color="neutral"
                    aria-label="edit"
                    onClick={() => handleEdit(rm._id)}
                  >
                    <PencilIcon />
                  </SvgIcon>
                </Tooltip>
              </IconButton>
              <IconButton>
                <Tooltip title="Delete">
                  <SvgIcon
                    fontSize="small"
                    cursor="pointer"
                    color="neutral"
                    aria-label="delete"
                    onClick={() => handleClickDeleteOpen(rm._id)}
                  >
                    <TrashIcon />
                  </SvgIcon>
                </Tooltip>
              </IconButton>
              <IconButton
                onClick={() => handleExpandClick(rm._id)}
                aria-expanded={expanded === rm._id}
                aria-label="show more"
              >
                {expanded === rm._id ? <ArrowDownIcon /> : <ArrowUpIcon />}
              </IconButton>
            </Stack>
          </CardActions>
          <Collapse in={expanded === rm._id} timeout="auto" unmountOnExit>
            {/* <CardContent>
              <Typography paragraph>Agents:</Typography>
              {rm.agents.map((agent, index) => (
                <Typography key={index} paragraph>
                  {agent.name}
                </Typography>
              ))}
            </CardContent> */}
          </Collapse>
        </Card>
        </Grid>
        ))}
      </Grid>
      <DeleteDialog
        open={deleteDialogOpen}
        handleClose={handleClose}
        deleteId={deleteId}
        apiUrl={apiUrl}
        fetchData={fetchRm}
      />
    </Box>
  );
};

RmsCardList.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  setData: PropTypes.func,
  apiUrl: PropTypes.string,
  rmToEdit: PropTypes.object,
  setRmToEdit: PropTypes.func,
  setDisplayForm: PropTypes.func,
};
