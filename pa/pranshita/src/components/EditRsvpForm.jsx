import { useState } from "react";

function EditRsvpForm({ initialData, onSubmit }) {
  const [firstName, setFirstName] = useState(initialData.name.split(" ")[0] || "");
  const [lastName, setLastName] = useState(initialData.name.split(" ")[1] || "");
  const [attending, setAttending] = useState(initialData.attending);
  const [guests, setGuests] = useState(initialData.guests || 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const name = firstName + " " + lastName
      await onSubmit({ name, attending, guests: attending ? guests : 1 });
      setSuccessMsg("Your RSVP has been updated!");
    } catch (err) {
      setError("Failed to save RSVP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
      <label className="block">
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading || successMsg}
          required
          className="mt-1 block w-full rounded border px-3 py-2 disabled:bg-gray-200 disabled:text-gray-400"
        />
      </label>

            <label className="block">
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading || successMsg}
          required
          className="mt-1 block w-full rounded border px-3 py-2 disabled:bg-gray-200 disabled:text-gray-400"
        />
      </label>

      <fieldset className="space-x-4">
        <legend>Will you attend?</legend>
        <label>
          <input
            type="radio"
            name="attending"
            value="yes"
            checked={attending === true}
            onChange={() => setAttending(true)}
            required
            disabled={loading || successMsg}
            className="mr-1 disabled:bg-gray-200 disabled:text-gray-400"
          />
          Yes
        </label>
        <label>
          <input
            type="radio"
            name="attending"
            value="no"
            checked={attending === false}
            onChange={() => setAttending(false)}
            required
            disabled={loading || successMsg}
            className="mr-1 disabled:bg-gray-200 disabled:text-gray-400"
          />
          No
        </label>
      </fieldset>

      {attending && (
        <label className="block">
          Number of guests:
          <input
            type="number"
            min="1"
            placeholder="1"
            value={guests}
            required
            onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            disabled={loading || successMsg}
            className="mt-1 block w-full rounded border px-3 py-2 disabled:bg-gray-200 disabled:text-gray-400"
          />
        </label>
      )}

      <button
        type="submit"
        disabled={loading || attending === null || successMsg}
        className="mt-4 rounded bg-gray-600 px-4 py-2 text-white disabled:opacity-50 w-100 hover:bg-teal-900 transition"
      >
        {loading ? "Saving..." : "Submit RSVP"}
      </button>

      {error && <p className="text-red-600">{error}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
    </form>
  );
}

export default EditRsvpForm;
