
import { useState } from "react";
import { useParams } from "react-router-dom";

import EmailEntry from "../EmailEntry";
import OtpEntry from "../OtpEntry";
import RsvpForm from "../RsvpForm";
import RsvpDetails from "../RsvpDetails";

function RsvpPage() {
  const { slug } = useParams();
  const [email, setEmail] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [existingRsvp, setExistingRsvp] = useState(null);

  return (
    <div>
      {!email && <EmailEntry eventSlug={slug} onEmailSubmit={setEmail} />}

      {email && !otpVerified && (
        <OtpEntry
          email={email}
          eventSlug={slug}
          onVerified={(rsvp) => {
            setOtpVerified(true);
            setExistingRsvp(rsvp);
          }}
        />
      )}

      {otpVerified && (
        <>
          {!existingRsvp && (
            <RsvpForm email={email} eventSlug={slug} onSubmitted={setExistingRsvp} />
          )}

          {existingRsvp && <RsvpDetails rsvp={existingRsvp} />}
        </>
      )}
    </div>
  );
}

export default RsvpPage;
