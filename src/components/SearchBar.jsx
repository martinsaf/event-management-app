import React from "react";
import { Input } from "@chakra-ui/react";

// Component for the search bar
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <Input
      placeholder="Search events"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
    />
  );
};

export default SearchBar;
