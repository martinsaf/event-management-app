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
      // Normaliza os dados antes de enviar
      const normalizedEvent = {
        ...updatedEvent,
        categoryIds: updatedEvent.categoryIds.map((id) => id.toString()), // Garante que categoryIds sejam strings
        createdBy: updatedEvent.createdBy.toString(), // Garante que createdBy seja string
      };

      const response = await fetch(`http://localhost:3000/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizedEvent), // Envia os dados normalizados
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
      navigate(`/event/${event.id}`);
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
