import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import EventForm from "../components/EventForm";

// Component to edit an existing event
export const EditEventPage = () => {
  const { event } = useLoaderData(); // Load event data using React Router's useLoaderData
  const navigate = useNavigate(); // Hook to navigate programmatically
  const toast = useToast(); // Hook to display toast notifications

  // Handle form submission
  const handleEditEvent = async (updatedEvent) => {
    try {
      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      });
      if (!response.ok) {
        throw new Error("Failed to update event");
      }
      toast({
        title: "Event Updated",
        description: "The event has been successfully updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate(`/event/${event.id}`); // Navigate to the event page
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <EventForm
      onSubmit={handleEditEvent}
      initialData={event}
      submitButtonText="Update"
    />
  );
};
