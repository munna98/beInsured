import React from 'react';
import { Card, CardHeader, Typography, List, ListItem, ListItemText, IconButton, SvgIcon, CardActions, Button, Divider, Stack } from '@mui/material';
import { formatDistanceToNow, format } from 'date-fns'; // Import format and formatDistanceToNow functions from date-fns
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';

export const RecentReceipts = ({ receipts }) => {
  return (
    <Card sx={{ p: 3 }}>
      <CardHeader title="Recent receipts" />
      <List>
        {receipts.length === 0 ? (
          <ListItem>
            <ListItemText primary="No receipts added yet." />
          </ListItem>
        ) : (
          receipts
            .slice() // Make a shallow copy of receipts array to avoid mutating the original array
            .reverse() // Reverse the array to show the most recent first
            .slice(0, 5) // Limit to 5 items
            .map((receipt, index) => {
              const hasDivider = index < receipts.length - 1;
              const ago = formatDistanceToNow(new Date(receipt.date), { addSuffix: true });
              const formattedDate = format(new Date(receipt.date), 'dd-MM-yyyy'); // Format the date

              return (
                <ListItem divider={hasDivider} key={receipt._id} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Stack direction="column" spacing={1} sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">{receipt.agent.firstName}</Typography>
                    <Typography variant="body2" color="textSecondary">{formattedDate}</Typography>
                  </Stack>
                  <Typography variant="subtitle1" sx={{ textAlign: 'right', flexShrink: 0, ml: 2 }}>
                    {receipt.amount}
                  </Typography>
                  <IconButton edge="end">
                    <SvgIcon>
                      <EllipsisVerticalIcon />
                    </SvgIcon>
                  </IconButton>
                </ListItem>
              );
            })
        )}
      </List>
      <CardActions sx={{ justifyContent: 'flex-end', paddingY: 1 }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

