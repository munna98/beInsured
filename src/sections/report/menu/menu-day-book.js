import { useRouter } from 'next/router';
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import { useState } from 'react';


export const MenuDayBook = () => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover state
  const router = useRouter(); // Get the router instance

  const handleClick = () => {
    console.log("lets go to agent leadger");
    router.push('/reports/day-book'); // Navigate to the report page
  };

  return (
    <Card
    onMouseEnter={() => setIsHovered(true)} // Handle mouse enter event
    onMouseLeave={() => setIsHovered(false)} // Handle mouse leave event
    onClick={handleClick} // Handle click events
    sx={{
      cursor: "pointer",
      backgroundColor: isHovered ? "neutral.100" : "inherit", // Change background color on hover
    }}
  >
      <CardContent>
        <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={1}>
          <Stack spacing={1}>
            <Typography color="text.primary" variant="h6">
              Day Book
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "success.main",
              height: 44,
              width: 44,
            }}
          >
            <SvgIcon>
              <UsersIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};
