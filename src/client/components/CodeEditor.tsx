import React, { useState, useEffect, Component } from "react";
import CustomTabsHook from "./editor_comps/AddAndDeleteTab";
import Editor from '@monaco-editor/react';
import { ClockLoader as Loader } from "react-spinners";
import examples from "./editor_comps/examples";
import BasicLayout from "./editor_comps/BasicLayout"
import { Grid, Tab, Tabs, Typography, Box, Button, TextField } from "@material-ui/core";
import { ControlledEditor } from "@monaco-editor/react";
import { Result } from './editor_comps/Result';
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
import {io as socketIOClient, Socket} from "socket.io-client";

export const CodeEditor: React.FunctionComponent<RouteComponentProps|{name:string}> = ({name}) => {
    const [isEditorReady, setIsEditorReady] = useState(false);
    const numOfParticipants = 3;
    const roomId = "myRoom";
    const [selectedTab, setSelectedTab] = useState(0);
    const [data, setData] = useState<string[]>(Array(numOfParticipants+1).fill(""));
    const [participantNo, setParticipantNo] = useState(0);
    const [terminal, setTerminal] = useState("");
    const [socket, setSocket] = useState<Socket|null>(null);

    useEffect(() => {
        const socket = socketIOClient();
        setSocket(socket);
        socket.emit("joinRoom", {roomId, name});
        socket.on("init", (room) => {
            console.log("initializing");
            console.log(room.users.find(user => user.id === socket.id).participantNo);
            setParticipantNo(room.users.find(user => user.id === socket.id).participantNo);
            setData(room.data);
        });
        socket.on("changeOne", ({newCode, idx}) => {
            setData(data =>
                data.map(
                    (datum, index) => index === idx ? newCode : datum
                )
            );
        });
        return () => socket.close();
    }, []);
    
    
    // useEffect(() => {
    //     if (socket) {
            
    //     }
    // },[socket, data]);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    function handleEditorDidMount() {
        setIsEditorReady(true);
    }

    const handleEditorChange = (ev, value) => {
        if (socket && participantNo !== 0) {
            console.log("sent update");
            socket.emit("update", {roomId, idx: selectedTab, newCode: value});
        }
        setData(
            data.map(
                (datum, index) => index === selectedTab ? value : datum
            )
        );
    }

    const runIndividual = () => {
        if (selectedTab == 0) {
            runMain();
        } else {
            let config = { headers: {  
                'Content-Type': 'application/json'}
            }
            axios.post("https://concord-compiler.herokuapp.com/run-individual/", {
                code: data[selectedTab],
                input: ""
                },
                config
            ).then((response) => {
                if (response.data["RESULT"]) {
                    console.log("returned result");
                    setTerminal(response.data["RESULT"]);
                }
                else {
                    console.log("returned error", response.data);
                    setTerminal(response.data["ERROR"]);
                }
            }).catch((e) => {
                console.log("Caught error");
                setTerminal("Error: "+e);
            })
        }
    }

    const runMain = () => {
        let config = { headers: {  
            'Content-Type': 'application/json'}
        }
        axios.post("https://concord-compiler.herokuapp.com/run-main/", {
            codes: data,
            input: ""
            },
            config
        ).then((response) => {
            if (response.data["RESULT"]) {
                console.log("returned result");
                setTerminal(response.data["RESULT"]);
            }
            else {
                console.log("returned error", response.data);
                setTerminal(response.data["ERROR"]);
            }
        }).catch((e) => {
            console.log("Caught error");
            setTerminal("Error: "+e);
        })
    }

    return (
        <Grid container direction="row">
            <Grid item xs={12}>
                <Tabs indicatorColor="primary" textColor="primary" variant="fullWidth" value={selectedTab} onChange={handleChange}>
                    <Tab label="main.py"/>
                    {(Array.from({ length: numOfParticipants }, (_, i) => i + 1)).map(element =>
                        <Tab key={element} label={`Participant ${element}`+ (element === participantNo ? " (You)" : "")}/>
                    )}
                </Tabs>
                <Button onClick={runIndividual}>
                    Run Current
                </Button>
                <Button onClick={runMain}>
                    Run Main
                </Button>
            </Grid>
            <Grid container direction="row">
                <Grid item xs={12} md={4}>
                    <Result>
                    </Result>
                </Grid>
                <Grid item xs={12} md={8}>
                    <ControlledEditor
                        height="55vh"
                        width="100%" 
                        theme="light"
                        language="python"
                        loading={<Loader />}
                        value={data[selectedTab]}
                        onChange={(ev, value) => handleEditorChange(ev, value)}
                        editorDidMount={handleEditorDidMount} />
                    <TextField multiline rows={5} variant="filled" value={terminal} fullWidth/>
                </Grid>
            </Grid>
        </Grid>
    );
}
