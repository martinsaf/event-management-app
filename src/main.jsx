import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import { Root } from "./components/Root";
import { EventPage } from "./pages/EventPage";
import { EventsPage } from "./pages/EventsPage";
import { AddEventPage } from "./pages/AddEventPage";
import { EditEventPage } from "./pages/EditEventPage";
import { AppProvider } from "./context";
import { fetchData } from "./utils/fetchData";

// Error boundary component to display errors in the app
const ErrorBoundary = () => {
  const error = useRouteError();
  return (
    <div>
      <h2>Application Error!</h2>
      <p>{error.message || error.statusText}</p>
    </div>
  );
};

// Loader function to fetch events data
const eventsLoader = async () => {
  try {
    const events = await fetchData("http://localhost:3000/events");
    return { events };
  } catch (error) {
    console.error("Error loading events:", error);
    throw error;
  }
};

// Loader function to fetch a single event and users data
const eventLoader = async ({ params }) => {
  try {
    const event = await fetchData(
      `http://localhost:3000/events/${params.eventId}`
    );
    const users = await fetchData("http://localhost:3000/users");
    return { event, users };
  } catch (error) {
    console.error("Error loading event:", error);
    throw error;
  }
};

// Action function to add a new event
const addEventAction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const newEvent = Object.fromEntries(formData);
    newEvent.categoryIds = formData.getAll("categoryIds").map(Number);
    newEvent.createdBy = Number(formData.get("createdBy"));

    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });
    if (!response.ok) {
      throw new Error("Failed to add event");
    }
    return newEvent;
  } catch (error) {
    console.error("Error adding event:", error);
    throw error;
  }
};

// Action function to update an existing event
const editEventAction = async ({ request, params }) => {
  try {
    const formData = await request.formData();
    const updatedEvent = Object.fromEntries(formData);
    updatedEvent.categoryIds = formData.getAll("categoryIds").map(Number);
    updatedEvent.createdBy = Number(formData.get("createdBy"));

    const response = await fetch(
      `http://localhost:3000/events/${params.eventId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEvent),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update event");
    }
    return updatedEvent;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

// Create the router with routes and their corresponding components, loaders, and actions
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, // Root layout component
    errorElement: <ErrorBoundary />, // Error boundary component
    children: [
      {
        path: "/",
        element: <EventsPage />, // EventsPage component
        loader: eventsLoader, // Loader for events data
      },
      {
        path: "/event/:eventId",
        element: <EventPage />, // EventPage component
        loader: eventLoader, // Loader for single event and users data
      },
      {
        path: "/add-event",
        element: <AddEventPage />, // AddEventPage component
        action: addEventAction, // Action to add a new event
      },
      {
        path: "/edit-event/:eventId",
        element: <EditEventPage />, // EditEventPage component
        loader: eventLoader, // Loader for single event and users data
        action: editEventAction, // Action to edit an existing event
      },
    ],
  },
]);

// Render the application with ChakraProvider and AppProvider
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ChakraProvider>
  </React.StrictMode>
);
