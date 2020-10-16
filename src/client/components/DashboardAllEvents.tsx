import React from "react";
import { Card, TextField, Button, CardContent } from "@material-ui/core";

interface CalendarEvent{
    date: Date;
    eventName: string;
    eventDescription: string;
};

const data: CalendarEvent[] = [
    {
        date: new Date(),
        eventName: "Event 1",
        eventDescription: "My first event"
    },
    {
        date: new Date(),
        eventName: "Event 2",
        eventDescription: "My second event"
    },
    {
        date: new Date(),
        eventName: "Event 3",
        eventDescription: "My third event"
    },
    {
        date: new Date(),
        eventName: "Event 4",
        eventDescription: "My fourth event"
    },
];

interface DashboardAllEventsProps{

}

export const DashboardAllEvents: React.FC<DashboardAllEventsProps> = () => {

    return(
        <div>
            <h3>DashboardAllEvents</h3>
            <Card>
                {/* 
                    Create a material ui table here: https://material-ui.com/components/tables/ 
                    and then display all of the data in the "data" variable. Include headers on the table too
                    Possibly add the create new event "+" button, using Material UI IconButton
                */}
                <CardContent>
                    
                </CardContent>
            </Card>
        </div>
    );
}