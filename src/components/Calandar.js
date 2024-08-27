import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const MyCalandar = ({events}) => {
    const localizer = momentLocalizer(moment);
    const handleSelectEvent = (event) => {
        alert(event.title);
    };
    console.log(events);
    return (
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="date"
            endAccessor="date"
            style={{ height: 500 }}
            onSelectEvent={handleSelectEvent}
        />
    );
};

export default MyCalandar;