import React, { useState, useEffect, Component } from "react";
import CustomTabsHook from "./editor_comps/AddAndDeleteTab";
import Editor from '@monaco-editor/react';
import { ClockLoader as Loader } from "react-spinners";
import examples from "./editor_comps/examples";
import BasicLayout from "./editor_comps/BasicLayout"
import { Grid, Tab, Tabs, Typography, Box } from "@material-ui/core";
import { ControlledEditor } from "@monaco-editor/react";
import { Result } from './editor_comps/Result';

export const CodeEditor: React.FunctionComponent = () => {
    const [isEditorReady, setIsEditorReady] = useState(false);
    const numOfParticipants = 5;
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [data,setData] = useState(Array(numOfParticipants).fill(""));

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    function handleEditorDidMount() {
        setIsEditorReady(true);
    }

    const handleEditorChange = (ev, value, selectedTab) => {
        console.log(data);
        setData(
            data.map((datum, index) => 
              index === selectedTab ? value : datum
            )
        )    
    }

    return (
        <Grid container direction="row">
            <Grid item xs={12}>
                <Tabs indicatorColor="primary" textColor="primary" variant="fullWidth" value={selectedTab} onChange={handleChange}>
                    {(Array.from({ length: numOfParticipants }, (_, i) => i + 1)).map(element =>
                        <Tab label={`Participant ${element}`}/>
                    )}
                </Tabs>
            </Grid>
            <Grid container direction="row">
                <Grid item xs={12} md={4}>
                    <Result>
                    </Result>
                </Grid>
                <Grid item xs={12} md={8}>
                    <ControlledEditor
                        height="75vh"
                        width="100%" 
                        theme="light"
                        language="python"
                        loading={<Loader />}
                        value={data[selectedTab]}
                        onChange={(ev, value) => handleEditorChange(ev, value, selectedTab)}
                        editorDidMount={handleEditorDidMount} />
                </Grid>
            </Grid>
        </Grid>
    );
}
