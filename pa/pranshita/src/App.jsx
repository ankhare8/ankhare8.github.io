// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import EventListPage from "./components/pages/EventsListPage";
import EventDetailsPage from "./components/pages/EventDetailsPage";
import RsvpPage from "./components/pages/RSVPPage";
import EditRsvpPage from "./components/pages/EditRsvpPage"

function App() {
  return (
    <Router>
      <Routes>
         {/* Edit RSVP from email link */}
        <Route path="events/edit/:editToken" element={<EditRsvpPage />} />

        {/* List all events */}
        <Route path="/events" element={<EventListPage />} />

        {/* Show event details and unlock screen */}
        <Route path="/events/:slug" element={<EventDetailsPage />} />

        {/* RSVP form after OTP verification */}
        <Route path="/events/:slug/rsvp" element={<RsvpPage />} />

        {/* Redirect root to events list */}
        <Route path="/" element={<Navigate to="/events" replace />} />

        {/* Optional: 404 page can be added */}
      </Routes>
    </Router>
  );
}

export default App;
