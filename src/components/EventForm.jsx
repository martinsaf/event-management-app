import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Textarea,
  Button,
  Checkbox,
  FormLabel,
  Stack,
  Center,
  VStack,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useAppContext } from "../context"; // Import context to get categories and users

// Reusable form component for adding and editing events
const EventForm = ({ onSubmit, initialData = {}, submitButtonText }) => {
  const toast = useToast(); // Hook to display toast notifications
  const { categories, users } = useAppContext(); // Load categories and users from context

  // State variables for form fields
  const [title, setTitle] = useState(initialData.title || ""); // State for event title
  const [description, setDescription] = useState(initialData.description || ""); // State for event description
  const [image, setImage] = useState(initialData.image || ""); // State for event image URL
  const [startTime, setStartTime] = useState(initialData.startTime || ""); // State for event start time
  const [endTime, setEndTime] = useState(initialData.endTime || ""); // State for event end time
  const [selectedCategories, setSelectedCategories] = useState(
    initialData.categoryIds || []
  );
  // State for selected categories
  const [selectedUser, setSelectedUser] = useState(initialData.createdBy || ""); // State for selected user

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategories(
      (prevSelected) =>
        prevSelected.includes(categoryId)
          ? prevSelected.filter((id) => id !== categoryId) // Remove category if already selected
          : [...prevSelected, categoryId] // Add category if not selected
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Form validation
    if (
      !title ||
      !description ||
      !image ||
      !startTime ||
      !endTime ||
      !selectedUser ||
      selectedCategories.length === 0
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Check if start time is after end time
    if (new Date(startTime) > new Date(endTime)) {
      toast({
        title: "Validation Error",
        description: "Start time cannot be after end time",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Create event object from form data and call onSubmit callback
    onSubmit({
      title,
      description,
      image,
      startTime,
      endTime,
      categoryIds: selectedCategories,
      createdBy: Number(selectedUser),
    });
  };

  return (
    <Center>
      <VStack spacing={6} width="100%" maxWidth="600px" mt={8}>
        <Heading size="lg">{submitButtonText} Event</Heading> {/* Form title */}
        <Box as="form" onSubmit={handleSubmit} width="100%">
          {/* Form container */}
          <FormLabel mt={4}>Title</FormLabel> {/* Label for title input */}
          <Input
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Update title state
          />
          <FormLabel mt={4}>Description</FormLabel>
          {/* Label for description textarea */}
          <Textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)} // Update description state
          />
          <FormLabel mt={4}>Image URL</FormLabel>
          {/* Label for image URL input */}
          <Input
            name="image"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)} // Update image state
          />
          <FormLabel mt={4}>Start Time</FormLabel>
          {/* Label for start time input */}
          <Input
            name="startTime"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)} // Update start time state
          />
          <FormLabel mt={4}>End Time</FormLabel>
          {/* Label for end time input */}
          <Input
            name="endTime"
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)} // Update end time state
          />
          <FormLabel mt={4}>Categories</FormLabel>
          {/* Label for categories checkboxes */}
          <Stack spacing={2}>
            {categories.map((category) => (
              <Checkbox
                key={category.id}
                value={category.id}
                isChecked={selectedCategories.includes(category.id)} // Set checkbox state
                onChange={() => handleCategoryChange(category.id)} // Handle category selection
              >
                {category.name} {/* Display category name */}
              </Checkbox>
            ))}
          </Stack>
          <FormLabel mt={4}>Created By</FormLabel>
          {/* Label for creator select */}
          <Select
            placeholder="Select creator"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)} // Update selected user state
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} {/* Display user name */}
              </option>
            ))}
          </Select>
          <Button type="submit" colorScheme="teal" width="full" mt={8}>
            {submitButtonText} Event
          </Button>
        </Box>
      </VStack>
    </Center>
  );
};

export default EventForm;
