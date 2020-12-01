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
  const markdownText = "> #### Fibonacci Primes!\n" +
                        ">\n" +
                        "> - Create a function that generates the fibonacci series.\n" +
                        "> - Create a function that checks if a number is prime.\n" +
                        ">\n" + 
                        ">  Find all fibonacci primes less than 1 million.";
  return (
    <Container>
      <ResultArea>
        <ReactMarkdown source={markdownText} />
      </ResultArea>
    </Container>
  );
}
