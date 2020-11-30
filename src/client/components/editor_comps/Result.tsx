import React, { useContext } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import editorContext from "./EditorContext";

const Container = styled.div`
  width: 100%;
  height: 100%;
  font-family: "Lato", sans-serif;
`;

const ResultArea = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 17px;
`;

export function Result(props) {
  const markdownText = "> #### The quarterly results look great!\n" +
                        ">\n" +
                        "> - Revenue was off the chart.\n" +
                        "> - Profits were higher than ever.\n" +
                        ">\n" + 
                        ">  Everything is going according to plan.";
  return (
    <Container>
      <ResultArea>
        <ReactMarkdown source={markdownText} />
      </ResultArea>
    </Container>
  );
}
