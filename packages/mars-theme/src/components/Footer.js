import React from 'react'
import {styled, connect} from "frontity"
import {Container, Grid, Typography, makeStyles, Button} from "@material-ui/core"
import logoGHCW from "../../assets/logo-GHC-W.png";
import logoHH from "../../assets/logoHHfooter.png";
import {pagesMap} from "../config";
import translations from "../translations";

const useStyles = makeStyles((theme) => ({
    containerWrapper: {
        padding: '32px 0',
        marginTop: '32px',
        backgroundColor: theme.palette.primary.main,
        color: '#FFFFFF'
    },
    button: {
        display: 'block',
        color: '#FFFFFF',
        marginBottom: '16px'
    },
    nimbleCredits: {
        marginTop: '16px',
        textAlign: 'center',
    }
}));

const LogoGHC = styled.img`
  padding: 16px 0;
  height: 24px;
  margin-right: 32px;
 `;

const LogoHH = styled.img`
  padding: 16px 0;
  height: 24px;
`;

const footerLinks = [
    [10, 12, 15, 16],
    [13, 19, 18, 21],
    [5, 17, 14, 20]
]

const HeartIcon = () => (
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="red" stroke="red" style={{transform: 'scale(0.5) translate(0px, 17px)'}}>
        <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181"/>
    </svg>
)

const Footer = ({ state, actions }) => {
    const classes = useStyles();
    return (
        <div className={classes.containerWrapper}>
            <Container>
                <a href="https://garofalohealthcare.com" target="_blank">
                    <LogoGHC src={logoGHCW} alt="Logo Garofalo Health Care"/>
                </a>
                <LogoHH src={logoHH} alt="Logo Hesperia Hospital"/>
                <Grid container style={{margin: '16px 0'}}>
                    {footerLinks.map(chunk => (
                        <Grid item xs={12} md={3}>
                            {chunk.map(linkId => (
                                <Button classes={{root: classes.button}} onClick={() => actions.router.set(pagesMap[linkId][state.theme.lang][1])}>
                                    {pagesMap[linkId][state.theme.lang][0]}
                                </Button>
                            ))}
                        </Grid>
                    ))}
                    <Grid item xs={12} md={3} style={{borderLeft: '1px solid #FFFFFF'}}>
                        <Typography variant="body2" style={{paddingLeft: '16px'}}>
                            Via Arquà 80 - 41125 Modena<br />
                            {translations(state.theme.lang, 'centralino')}: <b>059-449.111</b><br />
                            {translations(state.theme.lang, 'fax')}: <b>059-394.840</b><br />
                            {translations(state.theme.lang, 'prenotazioneVisite')}: <b>centralinovisite@hesperia.it</b><br />
                            {translations(state.theme.lang, 'richiesta')}: <b>fatturazione@hesperia.it</b><br />
                            PEC: <b>direzionegenerale@pec.hesperia.it</b>
                        </Typography>
                    </Grid>
                </Grid>
                <Button style={{padding: 0, color: '#FFFFFF', marginBottom: '16px'}} onClick={() => actions.router.set(pagesMap[11][state.theme.lang][1])}>{pagesMap[11][state.theme.lang][0]}</Button>
                <Typography style={{textAlign: 'center'}} variant="body2">Hesperia Hospital S.r.l   |   P.IVA e C.F. 01049620360   |   REA MO 210368   |   Cap.Soc. € 120.000,00   |   Società soggetta all'attività di direzione e coordinamento di Garofalo Health Care S.p.A</Typography>
                <Typography className={classes.nimbleCredits} variant="body2">
                    Made with <HeartIcon /> by <a href="https://www.nimble-solutions.com" target="_blank">Nimble Solutions</a></Typography>
            </Container>
        </div>
    )
}

export default connect(Footer)