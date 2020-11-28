import React, { useState, Component} from "react";
import CustomTabsHook from "./editor_comps/AddAndDeleteTab";
import {Tabs, TabLink, TabContent} from "react-tabs-redux";
import Editor from '@monaco-editor/react';
import { ClockLoader as Loader } from "react-spinners";
import examples from "./editor_comps/examples";
import BasicLayout from "./editor_comps/BasicLayout"

export const CodeEditor: React.FunctionComponent = () => {
    const [theme, setTheme] = useState("light");
    const [isEditorReady, setIsEditorReady] = useState(false);

    function handleEditorDidMount() {
        setIsEditorReady(true);
    }

    function toggleTheme() {
        setTheme(theme === "light" ? "dark" : "light");
    }

    return (
        <div className="CodeEditor">
            <BasicLayout></BasicLayout>
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
//           <MarkedInput />
//           <Result />
//         </EditorContainer>
//       </AppContainer>
//     </EditorContext.Provider>
//   );
// }