import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import EventForm from "../components/EventForm";

// Component to add a new event
export const AddEventPage = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const toast = useToast(); // Hook to display toast notifications

  // Handle form submission
  const handleAddEvent = async (newEvent) => {
    try {
      // Normaliza os dados antes de enviar
      const normalizedEvent = {
        ...newEvent,
        categoryIds: newEvent.categoryIds.map((id) => id.toString()), // Garante que categoryIds sejam strings
        createdBy: newEvent.createdBy.toString(), // Garante que createdBy seja string
      };

      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(normalizedEvent), // Envia os dados normalizados
      });

      if (!response.ok) {
        throw new Error("Failed to add event");
      }

      toast({
        title: "Event Added",
        description: "The event has been successfully added",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
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

  return <EventForm onSubmit={handleAddEvent} submitButtonText="Add" />;
};
