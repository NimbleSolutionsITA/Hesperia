import React from 'react'
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Grid,
    makeStyles,
    Button,
    Hidden
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PhoneIcon from "../icons/Phone";
import {pagesMap} from "../../config";
import translations from "../../translations";
import PrenotaOra from "../PrenotaOra";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '16px 0',
    },
    heading: {
        fontWeight: 'bold',
    },
    accordion: {
        margin: '16px 0',
        '&.Mui-expanded': {
            margin: '16px 0',
        }
    },
    accordionSummary: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        '&.Mui-expanded': {
            minHeight: 0,
        }
    },
    accordionSummaryContent: {
        '&.Mui-expanded': {
            margin: '12px 0',
        }
    }
}));

const PrestazioniTabs = ({actions, lang, type, services, expanded, setExpanded, Html2React}) => {
    const classes = useStyles();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleClick = (state) => {
        actions.router.set(pagesMap[6][lang][1], {state})
    }

    return (
        <div className={classes.root}>
            {services.map(service => (
                <Accordion key={service.id} square classes={{root: classes.accordion}} expanded={expanded === service.id} onChange={handleChange(service.id)}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon color="secondary" />}
                        classes={{root: classes.accordionSummary, content: classes.accordionSummaryContent}}
                    >
                        <Typography variant="h4" className={classes.heading}><Html2React html={service.title.rendered} /></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container>
                            <Grid item xs={12} md={type === 'ambulatoriali' || service.acf.servicesInfo ? 8 : 12}>
                                <div style={{margin: '32px 0'}}>
                                    <Html2React html={service.content.rendered} />
                                    {type === 'ricoveri' && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleClick(service.id)}
                                            style={{fontWeight: 'normal', fontSize: '14px', width: '100%', margin: '32px 0 16px'}}
                                        >
                                            {translations(lang, 'vaiAiMedici')}
                                        </Button>
                                    )}
                                </div>
                            </Grid>
                            <Hidden mdDown>
                                <Grid item lg={1}>
                                    <div />
                                </Grid>
                            </Hidden>
                            {type === 'ambulatoriali' || service.acf.servicesInfo && (
                                <Grid item xs={12} md={4} lg={3}>
                                    {type === 'ambulatoriali' && service.acf.servicesPhone && (
                                        <div style={{borderRadius: '8px', backgroundColor: '#F6F9FC', padding: '32px', textAlign: 'center', margin: '32px auto'}}>
                                            <Typography variant="h3" style={{fontWeight: 'bold'}}>
                                    <span style={{backgroundColor: 'black', color: 'white', padding: '2px 3px', borderRadius: '50%', marginRight: '16px'}}>
                                        <PhoneIcon style={{height: '18px'}} />
                                    </span>
                                                {service.acf.servicesPhone}
                                            </Typography>
                                            <PrenotaOra style={{fontWeight: 'normal', fontSize: '14px', width: '100%', margin: '32px 0 16px'}} />
                                            {service.acf.servicesTime && (
                                                <div style={{margin: '0 8px'}}>
                                                    <Html2React html={service.acf.servicesTime} />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {service.acf.servicesInfo && (
                                        <div style={{margin: type === 'ricoveri' && '32px auto'}}>
                                            <Typography style={{fontWeight: 'bold'}}>
                                                {type === 'ambulatoriali' ?
                                                    translations(lang, 'daSapere') :
                                                    translations(lang, 'infoPraticheRicovero')
                                                }
                                            </Typography>
                                            <Html2React html={service.acf.servicesInfo} />
                                        </div>
                                    )}
                                </Grid>
                            )}

                        </Grid>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}

export default PrestazioniTabs