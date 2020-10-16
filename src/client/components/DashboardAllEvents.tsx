import React from "react";
import { Card, TextField, Button, CardContent } from "@material-ui/core";
import { Columns, RowsProp, DataGrid, SortDirection, ValueGetterParams } from "@material-ui/data-grid";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";


interface CalendarEvent{
    date: Date;
    Event: string;
    EventDescription: string;
};

const columns: Columns = [
  { field: "Event", type: "string", width: 150 },
  { field: "Date", type: "date", width: 180 },
  { field: "EventDescription", type: "string", width: 180 }
]

const rows: RowsProp = [
    { id: 1,  Event: "Google",    Date: new Date(2015, 3, 12, 0, 0, 0),  EventDescription: "Interview" },
    { id: 2,  Event: "Microsoft", Date: new Date(2019, 10, 21, 0, 0, 0), EventDescription: "Interview" },
    { id: 3,  Event: "Hackathon", Date: new Date(2020, 7, 7, 0, 0, 0),   EventDescription: "Competition" },
    { id: 4,  Event: "Hackathon", Date: new Date(2020, 8, 19, 0, 0, 0),  EventDescription: "Proctor" },
    { id: 5,  Event: "Amazon",    Date: new Date(2020, 9, 29, 0, 0, 0),  EventDescription: "GroupHiring" },
    { id: 6,  Event: "IBM",       Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" },
    { id: 7,  Event: "Ubisoft",   Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 8,  Event: "Facebook",  Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 9,  Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" },
    { id: 10, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" },
    { id: 11, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" },
    { id: 12, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 13, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 14, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" },     
    { id: 15, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 16, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 17, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 18, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 19, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 20, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 21, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 22, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 23, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 24, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 25, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    { id: 26, Event: "Apple",     Date: new Date(2020, 4, 6, 0, 0, 0),   EventDescription: "Interview" }, 
    
];

interface ComparatorSortingGrid{

}

export const DashboardAllEvents: React.FC<ComparatorSortingGrid> = () => {
//export default function ComparatorSortingGrid() {    

    return(
        <div>
            <h3>DashboardAllEvents <IconButton aria-label="add an event"> <AddIcon /> </IconButton>{" "} </h3>
            <Card>
                {/* 
                    Create a material ui table here: https://material-ui.com/components/tables/ 
                    and then display all of the data in the "data" variable. Include headers on the table too
                    Possibly add the create new event "+" button, using Material UI IconButton
                    
                */
               <div style={{ height: 400, width: "100%" }}>
                   <DataGrid rows={rows} columns={columns} />
               </div> 
                }
                <CardContent>
                    
                </CardContent>
            </Card>
        </div>
    );
}