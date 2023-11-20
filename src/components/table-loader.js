import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

export default function TableLoader() {
  return (
    <Grid container spacing={1}>
      {[...Array(5)].map((_, rowIndex) => (
        <Grid item key={rowIndex} xs={12}>
          <Stack direction="row" spacing={2}>
            {[...Array(4)].map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                variant="rounded"
                width={300}
                height={60}
              />
            ))}
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
