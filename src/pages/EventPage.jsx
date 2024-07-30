import React from "react";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  Flex,
  useToast,
  Center,
} from "@chakra-ui/react";
import { useAppContext } from "../context";

// Component to display a single event's details
export const EventPage = () => {
  const { event } = useLoaderData(); // Load event data using React Router's useLoaderData
  const { users, categories } = useAppContext(); // Load users and categories from context
  const navigate = useNavigate(); // Hook to navigate programmatically
  const toast = useToast(); // Hook to display toast notifications

  // Check if event data, users data, or categories data is still undefined
  // This typically occurs while the data is being fetched from the server
  // If event, users, or categories is undefined, display a loading state to inform the user
  if (!event || !users || !categories) {
    return <Center>Loading...</Center>; // Display loading state
  }

  const creator = users.find((user) => user.id === event.createdBy); // Find the creator of the event

  // Transform the category IDs of an event into readable category names
  const eventCategories = event.categoryIds
    .map(
      (categoryId) =>
        categories.find((category) => category.id === categoryId)?.name
    )
    .filter(Boolean)
    .join(", "); // Get event categories names

  // Function to handle event deletion
  const handleDelete = async () => {
    // Ask for user confirmation before deleting
    if (window.confirm("Are you sure you want to delete this event?")) {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "DELETE", // HTTP DELETE method to delete the event
      });
      if (response.ok) {
        // If the response is successful
        toast({
          title: "Event deleted.",
          description: "The event has been successfully deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/"); // Navigate back to the events page
      } else {
        // If the response fails
        toast({
          title: "Error deleting event.",
          description:
            "There was an error deleting the event. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      maxW="800px"
      mx="auto"
      mt={10}
      p={5}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Image src={event.image} alt={event.title} borderRadius="md" mb={4} />{" "}
      {/* Display event image */}
      <Heading as="h1" size="xl" mb={4}>
        {event.title} {/* Display event title */}
      </Heading>
      <Text fontSize="lg" mb={4}>
        {event.description} {/* Display event description */}
      </Text>
      <Text fontWeight="bold">Start Time:</Text>
      <Text mb={4}>{new Date(event.startTime).toLocaleString()}</Text>{" "}
      {/* Display event start time */}
      <Text fontWeight="bold">End Time:</Text>
      <Text mb={4}>{new Date(event.endTime).toLocaleString()}</Text>{" "}
      {/* Display event end time */}
      <Text fontWeight="bold">Categories:</Text>
      <Text mb={4}>{eventCategories}</Text> {/* Display event categories */}
      <Text fontWeight="bold">Created By:</Text>{" "}
      {/* Display creator's name and image */}
      {creator && (
        <Flex align="center" mb={4}>
          <Image
            src={creator.image}
            alt={creator.name}
            boxSize="50px"
            borderRadius="full"
            mr={4}
          />
          <Text>{creator.name}</Text>
        </Flex>
      )}
      <Flex justify="space-between">
        <Button as={Link} to={`/edit-event/${event.id}`} colorScheme="teal">
          Edit
        </Button>
        <Button colorScheme="red" onClick={handleDelete}>
          Delete
        </Button>
      </Flex>
    </Box>
  );
};
