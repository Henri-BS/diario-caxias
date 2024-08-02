import { Link } from "react-router-dom";
import { EventProps } from "types/event";

export function EventCard({event}: EventProps) {

    return (
        <>
            <Link to={`/event/${event.id}`} className="text-decoration-none">
                <div className="card">
                    <div className="row">
                    <img className="img-fluid col-4 col-md-2"  src={event.image} alt="event-image" />
                    <div className="card-body col-8 col-md-10">
                        <h5 className="card-title">{event.title}</h5>
                        <p className="card-text">{event.description}</p>
                    </div>
                    </div>
                </div>
            </Link>
        </>
    );
}