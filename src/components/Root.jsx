import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

// Root component to serve as the main layout
export const Root = () => {
  return (
    <Box>
      <Navigation />
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};
