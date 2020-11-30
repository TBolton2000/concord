import React from "react"
import { Grid, Card, CardMedia, CardContent, Typography, makeStyles, Accordion, AccordionDetails, AccordionSummary, IconButton } from "@material-ui/core"
import { Email, ExpandMore, GitHub, LinkedIn } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
    accordion: {
        flexGrow: 1,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '90%'
    },
    cardContent: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    textContainer: {
        textAlign: 'center',
        AlignItems: 'center'
    },
}));

interface Props {
    title: string,
    greeting: string,
    image: string,
    description: string,
    github: string,
    linkedin: string,
    email: string
}

export const Cards: React.FC<Props> = ({ title, greeting, image, description, github, linkedin, email }) => {

    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={6}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={image}
                    title={title}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {greeting}
                    </Typography>
                    <div>
                        <IconButton href={github} target="_blank">
                            <GitHub />
                        </IconButton>
                        <IconButton href={linkedin} target="_blank">
                            <LinkedIn />
                        </IconButton>
                        <IconButton href={email}>
                            <Email />
                        </IconButton>
                    </div>
                </CardContent>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            expandIcon={<ExpandMore/>}
                            aria-controls="panel2a-content"
                            
                        >
                            <Typography className={classes.textContainer}>My name is {title}</Typography>
                                                        
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography paragraph className={classes.textContainer}>
                                {description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
            </Card>
        </Grid>
    )

}
            