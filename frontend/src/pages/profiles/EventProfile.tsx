import { EventLgCard } from "components/cards/EventCard";
import { useParams } from "react-router-dom";

export function EventProfile() {

    const params = useParams();

    return (
        <>
            <EventLgCard id={`${params.eventId}`} />
            <hr />
        </>
    );
}