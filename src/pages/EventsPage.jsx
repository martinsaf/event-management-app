import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import {
  Box,
  Heading,
  Image,
  Text,
  Checkbox,
  Stack,
  Center,
  VStack,
  Button,
  FormLabel,
} from "@chakra-ui/react";
import { useAppContext } from "../context";
import SearchBar from "../components/SearchBar";

// Component to display a list of events
export const EventsPage = () => {
  const { events } = useLoaderData(); // Load events data using React Router's useLoaderData
  const { categories } = useAppContext(); // Load categories from context
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query
  const [selectedCategories, setSelectedCategories] = useState([]); // State to hold selected categories

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(
      (prevSelected) =>
        prevSelected.includes(categoryId)
          ? prevSelected.filter((id) => id !== categoryId) // Remove category if already selected
          : [...prevSelected, categoryId] // Add category if not selected
    );
  };

  // Filter events based on search query and selected categories
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategories.length > 0
        ? selectedCategories.some((selectedId) =>
            event.categoryIds.some(
              (eventCategoryId) =>
                eventCategoryId.toString() === selectedId.toString()
            )
          )
        : true;

    return matchesSearch && matchesCategory;
  });

  // Function to get category names from category IDs
  const getCategoryNames = (categoryIds) => {
    return categoryIds.map((id) => {
      const category = categories.find(
        (cat) => cat.id.toString() === id.toString()
      );
      return category ? category.name : "Unknown";
    });
  };

  return (
    <Center>
      <VStack spacing={4} width="80%" maxWidth="800px">
        <Heading>List of events</Heading>
        {/* Use the SearchBar component */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {/* Label for category filter */}
        <FormLabel mt={4}>Filter by categories</FormLabel>
        <Stack spacing={2} direction="row">
          {categories.map((category) => (
            <Checkbox
              key={category.id}
              value={category.id}
              onChange={() => handleCategoryChange(category.id)} // Handle category selection
              isChecked={selectedCategories.includes(category.id)} // Set checkbox state
            >
              {category.name}
            </Checkbox>
          ))}
        </Stack>
        {filteredEvents.length === 0 ? (
          <Text>No events found.</Text> // Display message if no events are found
        ) : (
          filteredEvents.map((event) => (
            <Box
              key={event.id}
              p={4}
              shadow="md"
              borderWidth="1px"
              width="100%"
              borderRadius="md"
            >
              <Heading fontSize="xl">{event.title}</Heading>
              <Text mt={4}>{event.description}</Text>
              <Image
                src={event.image}
                alt={event.title}
                my={4}
                borderRadius="md"
              />
              <Text>
                Start Time: {new Date(event.startTime).toLocaleString()}
              </Text>
              <Text>End Time: {new Date(event.endTime).toLocaleString()}</Text>
              <Text>
                Categories: {getCategoryNames(event.categoryIds).join(", ")}
              </Text>
              <Button
                as={Link}
                to={`/event/${event.id}`}
                colorScheme="teal"
                mt={4}
              >
                View Event
              </Button>
            </Box>
          ))
        )}
      </VStack>
    </Center>
  );
};
