import React, {useRef, useState} from "react";
import { connect } from "frontity";
import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Link from "./link";
import NavItem from "./NavItem";
// import MobileMenu from "./menu";
import {Hidden, AppBar, Toolbar, Grid, Button, Container, Typography, IconButton, SwipeableDrawer, makeStyles} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

import logoGHC from '../../assets/logo-GHC.png';
import logoHH from '../../assets/logoHH.png'
import logoHHsmall from '../../assets/logoHHsmall.png'
import bannerHome from '../../assets/bannerHome.jpg'
import PinIcon from "./icons/Pin";
import H24Icon from "./icons/H24";
import PhoneIcon from "./icons/Phone";
import {pagesMap} from "../config";
import {CloseIcon} from "./menu-icon";
import translations from "../translations";


const useStyles = makeStyles((theme) => ({
    rightLinks: {
        textAlign: 'right',
        padding: '14px 0',
        color: '#1F407D',
    },
    logoGhcTop: {
        height: '30px',
        padding: '10px 0'
    },
    homeBannerWrapper: {
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.main,
        color: '#FFFFFF',
    },
    logoHH: {
        textAlign: 'center',
        padding: '32px 0',
        '& img': {
            height: '98px',
        }
    },
    bannerHomeImage: {
        position: 'absolute',
        left: '-2%'
    },
    ContactsWrapper: {
        padding: '15px 0',
        '& tr': {
            '&:nth-child(even)': {
                backgroundColor: 'transparent',
            },
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
        '& td': {
          padding: 0,
          border: 'none'
        },
        '& p': {
            fontWeight: 'bold',
            fontSize: '16px',
            lineHeight: '20px',
            marginBottom: '10px',
        },
        '& svg': {
            width: '32px',
            height: '32px',
            marginRight: '10px',
            marginBottom: '6px',
        }
    },
    appBarLogo: {
        width: '32px',
        position: 'absolute',
        top: '16px',
        [theme.breakpoints.down('sm')]: {
            right: '24px',
        }
    },
    appBarLogoDrawer: {
        width: '32px',
        position: 'absolute',
        top: '24px',
        left: '36px',
    },
    drawer: {
        height: '100vh',
        padding: '64px 24px 24px'
    },
    closeIcon: {
        position: 'absolute',
        top: '24px',
        right: '24px',
    }
}));

const Header = ({ state, actions }) => {
    const classes = useStyles()
    const isHomepage= ['/', '/en/start/'].includes(state.router.link)
    const language = state.theme.lang;
    const [isNavBarTop, setIsNavBarTop] = useState(false)
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const appBarRef = useRef()

    useScrollPosition(
        ({ currPos }) => setIsNavBarTop(-currPos.y >= appBarRef.current.offsetHeight),
        [],
        appBarRef
    )

    const closeMenu = () => setOpenMobileMenu(false)
    const openMenu = () => setOpenMobileMenu(true)

    return (
      <>
          <div ref={appBarRef}>
              <div style={{background: isHomepage ? 'linear-gradient(180deg, #F6F9FC -14.41%, #E1EEFE 54.12%)' : '#FFFFFF'}}>
                  <Container>
                      <Grid container>
                          <Grid item xs={3}>
                              <Hidden xsDown><a href="https://garofalohealthcare.com" target="_blank"><img className={classes.logoGhcTop} src={logoGHC} alt="Logo Garofalo Health Care"/></a></Hidden>
                          </Grid>
                          <Grid item xs={9} className={classes.rightLinks}>
                              <Button style={{fontWeight: 'normal'}} component={Link} link={pagesMap[9][language][1]}>{pagesMap[9][language][0]}</Button>
                              <Hidden smDown>
                                  <Button style={{fontWeight: 'normal'}} color="primary" onClick={actions.theme.toggleLanguage}>{state.theme.lang === 'it' ? 'English version' : 'Versione in Italiano'}</Button>
                              </Hidden>
                              <Hidden mdUp>
                                  <Button style={{fontWeight: 'normal'}} color="primary" onClick={actions.theme.toggleLanguage}>{state.theme.lang === 'it' ? 'ENG' : 'ITA'}</Button>
                              </Hidden>
                          </Grid>
                      </Grid>
                  </Container>
                  {isHomepage && <div className={classes.logoHH}><img src={logoHH} alt="Logo Hesperia Hospital"/></div>}
              </div>
              {isHomepage && (
                  <Hidden smDown>
                      <div className={classes.homeBannerWrapper}>
                          <Container>
                              <Grid container>
                                  <Grid item xs={5} style={{zIndex: 1}}>
                                      <Typography color="secondary" style={{fontWeight: 'bold', fontSize: '20px', lineHeight: '32px', padding: '36px 0 16px'}}>
                                          {translations(state.theme.lang, 'descrizione')}
                                      </Typography>
                                      <table className={classes.ContactsWrapper}>
                                          <tbody>
                                              <tr>
                                                  <td><PinIcon color="secondary" /></td>
                                                  <td><Typography>
                                                      Via Arquà 80/A - 41125 Modena<br />
                                                      <span style={{fontWeight: 'normal', fontSize: '.8em'}}>HESPERIA CAPRI: Via Tre Febbraio 1/A - 41012 Modena</span>
                                                  </Typography></td>
                                              </tr>
                                              <tr>
                                                  <td><H24Icon color="secondary" /></td>
                                                  <td><Typography>{translations(state.theme.lang, 'aperto24')}</Typography></td>
                                              </tr>
                                              <tr>
                                                  <td><PhoneIcon color="secondary" /></td>
                                                  <td><Typography>
                                                      059.449111<br />
                                                      <span style={{fontWeight: 'normal', fontSize: '.8em'}}>HESPERIA CAPRI: 059.680330</span>
                                                  </Typography></td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </Grid>
                                  <Grid item xs={7} style={{position: 'relative'}}>
                                      <div className={classes.bannerHomeImage}>
                                          <img src={bannerHome} alt="Ingresso Hesperia Hospital" />
                                      </div>
                                  </Grid>
                              </Grid>
                          </Container>
                      </div>
                  </Hidden>
              )}
          </div>
          <AppBar color="default" position="sticky" elevation={0}>
              <Container>
                  {(!isHomepage || isNavBarTop) && <img className={classes.appBarLogo} src={logoHHsmall} alt="Logo Hesperia Hospital"/>}
                  <Hidden mdUp>
                      <Toolbar disableGutters>
                          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
                              <MenuIcon />
                          </IconButton>
                          <SwipeableDrawer classes={{paper: classes.drawer}} anchor="top" open={openMobileMenu} onOpen={openMenu} onClose={closeMenu} >
                              <img className={classes.appBarLogoDrawer} src={logoHHsmall} alt="Logo Hesperia Hospital"/>
                              <IconButton color="inherit" onClick={closeMenu} className={classes.closeIcon}><CloseIcon size="16px" /></IconButton>
                              {state.theme.menu.map(menuItem => <NavItem closeMenu={closeMenu} key={menuItem[1]} link={menuItem} />)}
                          </SwipeableDrawer>
                      </Toolbar>
                  </Hidden>
                  <Hidden smDown>
                      <Toolbar style={{justifyContent: 'flex-end'}} disableGutters>
                          {state.theme.menu.map(menuItem => <NavItem key={menuItem[1]} link={menuItem} />)}
                          <Hidden mdDown>
                              <Button onClick={actions.theme.toggleTuoTempo} variant={"contained"} color="primary" disableElevation>
                                  {translations(state.theme.lang, 'prenotareUnaVisita')}
                              </Button>
                          </Hidden>
                      </Toolbar>
                  </Hidden>
              </Container>
          </AppBar>
      </>
    );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);