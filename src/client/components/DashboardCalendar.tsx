import React, { useState } from "react";
import moment from "moment"

import { Card, CardContent } from "@material-ui/core";
import { Calendar, momentLocalizer, View, DateLocalizer } from "react-big-calendar"

import { EventsModal } from "./Modals"

import * as dates from "../../../node_modules/react-big-calendar/lib/utils/dates"

import "!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css"

{/* 
====================================
            READ ME
Modules required for implementation:
====================================            

react-big-calendar
moment

*/}

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
let localizer = momentLocalizer(moment) // or globalizeLocalizer moment

// instantiating the default view options to select
const allViews: View[] = ['agenda', 'day', 'week', 'month'];

// Relative date of the state properites
interface Props {
    localizer: DateLocalizer;
}

// Typescript implemenmtation of Calendar Events
class CalendarEvent {
    title: string;
    allDay: boolean;
    start: Date;
    end: Date;
    desc: string;
    resourceId?: string;
    tooltip?: string;

    constructor(_title: string, _start: Date, _endDate: Date, _allDay?: boolean, _desc?: string, _resourceId?: string) {
        this.title = _title;
        this.allDay = _allDay || false;
        this.start = _start;
        this.end = _endDate;
        this.desc = _desc || '';
        this.resourceId = _resourceId;
    }
}


const SelectableCalendar: React.FC<Props> = ( {localizer} ) => {

    const [events, setEvents] = useState([{allDay:true, title: "Today"}] as CalendarEvent[]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalInputs, setModalInputs] = useState([]);

    // prompting user for new event
    const handleSelect = ({ start, end }) => {

        setModalOpen(true);
        setModalInputs([ 
            moment(start).format("yyyy-MM-DD"), 
            moment(start).format("HH:mm"), 
            moment(end).format("yyyy-MM-DD"),
            moment(end).format("HH:mm")
        ]);

    }

    // Returning calendar state and events
    return (
        <>
            <Calendar
            selectable
            localizer={localizer}
            events={events}
            defaultView='month'
            views={allViews}
            max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
            onSelectEvent={event => alert(event.title)}
            onSelectSlot={handleSelect}
            startAccessor='start'
            endAccessor='end'
            titleAccessor='title'
            />
            <EventsModal
            open={modalOpen}
            setOpen={setModalOpen}
            inputValues={modalInputs}
            />
        </>
    )
}


interface DashboardCalendarProps{ }


export const DashboardCalendar: React.FC<DashboardCalendarProps> = () => {

    return(
        <div>
            <h3>DashboardCalendar</h3>
            <Card>
                <CardContent> 
                    {/* initializing the viewable calandar in the card */}
                    <div style={{ height: "100vh" }}>
                        <SelectableCalendar localizer={localizer} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );

}

