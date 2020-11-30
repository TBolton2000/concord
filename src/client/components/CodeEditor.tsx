import React, { useState, useEffect, Component} from "react";
import CustomTabsHook from "./editor_comps/AddAndDeleteTab";
import {TabLink, TabContent} from "react-tabs-redux";
import Editor from '@monaco-editor/react';
import { ClockLoader as Loader } from "react-spinners";
import examples from "./editor_comps/examples";
import BasicLayout from "./editor_comps/BasicLayout"
import GridLayout from 'react-grid-layout';
import "../../../node_modules/react-grid-layout/css/styles.css";
import "../../../node_modules/react-resizable/css/styles.css";
import { Grid, Tab, Tabs, Typography, Box } from "@material-ui/core";
import { ControlledEditor } from "@monaco-editor/react";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
  }
  
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        >
        {value === index && (
            <Box >
            <Typography>{children}</Typography>
            </Box>
        )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

export const CodeEditor: React.FunctionComponent = () => {
    const [theme, setTheme] = useState("light");
    const [isEditorReady, setIsEditorReady] = useState(false);
    const numOfParticipants = 5;
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [user1, setUser1] = useState('');
    const [user2, setUser2]  = useState('');
    const [user3, setUser3]  = useState('');
    const [user4, setUser4]  = useState('');
    const [user5, setUser5]  = useState('');
    var userDict = {};
    userDict['user_1'] = user1;
    userDict['user_2'] = user2;
    userDict['user_3'] = user3;
    userDict['user_4'] = user4;
    userDict['user_5'] = user5;
    
    // const changeHandler = (e) => {
    //     console.log(e);
    //     console.log('@@@@@###')
    //     setAllValues({
    //       ...allValues,
    //       [e.target.value]: e.target.value
          
    //     })
    // };
    
    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    }

    function handleEditorDidMount() {
        setIsEditorReady(true);
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }
    // const layout = [
    //     {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
    //     {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
    //     {i: 'c', x: 4, y: 0, w: 1, h: 2}
    //   ];

    const handleEditorChange = (ev, value, selectedTab) => {
        console.log(selectedTab);
        if (selectedTab === 1){
            setUser1(value);
        }
        else if (selectedTab === 2){
            setUser2(value);
        }
        else if (selectedTab === 3) {
            setUser1(value);
        }
        else if (selectedTab === 4) {
            setUser1(value);
        }
        else if (selectedTab === 5) { 
            setUser1(value);
        }
    }

    return (
        <div className="CodeEditor">
            <Grid container direction="row">
                <Grid item xs={12}>
                    <Tabs indicatorColor="primary" textColor="primary" variant="fullWidth" value={selectedTab} onChange={handleChange}>
                        {(Array.from({length: numOfParticipants}, (_, i) => i + 1)).map(element => 
                            <Tab label={`Participant ${element}`} {...a11yProps(element)}/>
                        )}
                    </Tabs>
                </Grid>
                    {(Array.from({length: numOfParticipants}, (_, i) => i + 1)).map(element =>
                        <TabPanel value={selectedTab} index={element - 1}>
                            <button onClick={toggleTheme} disabled={!isEditorReady}>
                                Toggle theme
                            </button>
                        <Grid container direction="row">
                            <Grid item xs={12} md={6}>
                                {/* Change this editor to the markdown viewer */}
                                <Editor
                                    height="75vh"
                                    width = "100vh" // By default, it fully fits with its parent
                                    theme={theme}
                                    language={"python"}
                                    loading={<Loader />}
                                    value={examples["python"]}
                                    editorDidMount={handleEditorDidMount}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                {/* Here is the editor. It's contents should change depending on which participant is selected */}
                                <ControlledEditor
                                    height="75vh"
                                    width = "100vh" // By default, it fully fits with its parent
                                    theme={theme}
                                    language={"python"}
                                    loading={<Loader />}
                                    value={userDict['user_' + selectedTab]}
                                    onChange={ handleEditorChange(selectedTab) }
                                    editorDidMount={handleEditorDidMount}/>
                            </Grid>
                        </Grid>
                        </TabPanel>
                    )}
            </Grid>
            {/* <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                <div key="a" style={{backgroundColor: "grey"}}>a</div>
                <div key="b" style={{backgroundColor: "grey"}}>b</div>
                <div key="c" style={{backgroundColor: "grey"}}>c</div>
            </GridLayout> */}
            {/* <BasicLayout></BasicLayout> */}
            {/* <ReactGridLayout className="layout" layout={layout} cols={3} rowHeight={10} width={1200}>
                <div key="a">
                    a  
                    <Tabs>
                        <button onClick={toggleTheme} disabled={!isEditorReady}>
                            Toggle theme
                        </button>

                        <TabLink to="tab1">Tab1</TabLink>
                        <TabLink to="tab2">Tab2</TabLink>
                        <TabLink to="tab3">Tab3</TabLink>

                        <TabContent for="tab1">
                            <Editor 
                                height="90vh" // By default, it fully fits with its parent
                                theme={theme}
                                language={"python"}
                                loading={<Loader />}
                                value={examples["python"]}
                                editorDidMount={handleEditorDidMount}/>
                        </TabContent>

                        <TabContent for="tab2">
                            <Editor 
                                height="90vh" // By default, it fully fits with its parent
                                theme={theme}
                                language={"python"}
                                loading={<Loader />}
                                value={examples["python"]}
                                editorDidMount={handleEditorDidMount}/>
                        </TabContent>

                        <TabContent for="tab3">/* content for tab #3 </TabContent>
                    </Tabs>
                </div>
                <div key="b" style={{backgroundColor: 'grey'}}>b</div>
                <div key="c" style={{backgroundColor: 'grey'}}>c</div>
            </ReactGridLayout> */}
    </div>
  );
}










































































// import React, { useState } from "react";
// import styled from "styled-components";
// import { MarkedInput } from "./editor_comps/MarkedInput";
// import { Result } from "./editor_comps/Result";
// import EditorContext from "./editor_comps/EditorContext";

// const AppContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const Title = styled.div`
//   font-size: 25px;
//   font-weight: 700;
//   font-family: "Lato", sans-serif;
//   margin-bottom: 1em;
// `;

// const EditorContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
// `;

// export const CodeEditor: React.FunctionComponent = () =>{
//   const [markdownText, setMarkdownText] = useState("");

//   const contextValue = {
//     markdownText,
//     setMarkdownText
//   };

//   return (
//     <EditorContext.Provider value={contextValue}>
//       <AppContainer>
//         <Title>Markdown Editor</Title>
//         <EditorContainer>
//           <Result />
//         </EditorContainer>
//       </AppContainer>
//     </EditorContext.Provider>
//   );
// }
