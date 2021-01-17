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
                <Button style={{padding: 0, color: '#FFFFFF', marginBottom: '16px 0 8px'}} onClick={() => actions.router.set(pagesMap[11][state.theme.lang][1])}>{pagesMap[11][state.theme.lang][0]}</Button>
                <Typography variant="body2">Hesperia Hospital S.r.l   |   P.IVA e C.F. 01049620360   |   REA MO 210368   |   Cap.Soc. € 120.000,00   |   Società soggetta all'attività di direzione e coordinamento di Garofalo Health Care S.p.A</Typography>
            </Container>
        </div>
    )
}

export default connect(Footer)