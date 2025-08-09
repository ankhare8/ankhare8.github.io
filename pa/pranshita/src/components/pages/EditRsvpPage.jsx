import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchRSVPByEditToken, submitRSVP } from "../../api";
import EditRsvpForm from "../EditRsvpForm";

function EditRsvpPage() {
  const { editToken } = useParams();
  const [rsvp, setRsvp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRsvp() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRSVPByEditToken(editToken);
        setRsvp(data);
      } catch (err) {
        setError("Failed to load RSVP details. Please check your link.");
      } finally {
        setLoading(false);
      }
    }
    loadRsvp();
  }, [editToken]);

  const handleSubmit = async (updatedData) => {
    // Attach email and eventId from fetched RSVP to submission data
    await submitRSVP({
      ...updatedData,
      email: rsvp.email,
      eventId: rsvp.event._id,
    });
    // Optionally, update RSVP state with new data or show success message
    setRsvp((prev) => ({ ...prev, ...updatedData }));
  };

  if (loading) return <p>Loading your RSVP...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!rsvp) return <p>No RSVP found for this link.</p>;

  return (
    <div>
      <h2>Edit Your RSVP for</h2>
      <h2 className="alice text-2xl mb-2">{rsvp.event.name}</h2>
      <EditRsvpForm initialData={rsvp} onSubmit={handleSubmit} />
      <br/>
      <Link to={`/events/${rsvp.event.slug}`}> ← Back to Event </Link>
    </div>
  );
}

export default EditRsvpPage;
