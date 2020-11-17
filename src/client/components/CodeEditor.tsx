import { Typography, Button, Avatar, Container } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import React from 'react';
import styled from 'styled-components';
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-dark-theme.css';
import GoldenLayout, { Row, Stack, createGoldenLayoutComponent } from 'react-golden-layout';


export const CodeEditor: React.FunctionComponent = () => {
    return(
        <GoldenLayout>
            <Row>
                <Stack>
                    {
                        // To apply properties to a React component, use createGoldenLayoutComponent
                    }
                    {createGoldenLayoutComponent(<Button/>, { isClosable: false, title: "Foo's Title" })}
                </Stack>
                <Stack>
                    {
                        // If you don't want any special settings you can just pass
                        // React components directly.
                    }
                    {<Button/>}
                </Stack>
            </Row>
        </GoldenLayout>
    );
    
};