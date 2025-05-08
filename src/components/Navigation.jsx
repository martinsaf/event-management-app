import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Flex, Link } from "@chakra-ui/react";

// Navigation component to display the navigation bar
export const Navigation = () => {
  return (
    <Box as="nav" bg="teal.500" p={4}>
      {/* Navigation bar container */}
      <Flex align="center" justify="center">
        <Flex>
          {/* Inner flex container for navigation links */}
          <Link
            as={NavLink}
            to="/"
            px={3}
            py={2}
            color="white"
            _hover={{ textDecoration: "none", bg: "teal.600" }}
            _activeLink={{
              fontWeight: "bold",
              borderBottom: "2px solid white",
            }}
          >
            Events
          </Link>
          <Link
            as={NavLink}
            to="/add-event"
            px={3}
            py={2}
            color="white"
            _hover={{ textDecoration: "none", bg: "teal.600" }}
            _activeLink={{
              fontWeight: "bold",
              borderBottom: "2px solid white",
            }}
          >
            Add Event
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
