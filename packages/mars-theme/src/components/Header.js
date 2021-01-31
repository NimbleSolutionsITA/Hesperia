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
        padding: '10px 0'
    },
    homeBannerWrapper: {
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.main,
        color: '#FFFFFF',
    },
    logoHH: {
        textAlign: 'center',
        marginTop: '-32px',
        paddingBottom: '16px',
        '& img': {
            height: '98px',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '-8px',
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
        top: '20px',
        right: '20px',
    },
    hhLogo: {
        float: 'left',
        padding: 0,
        margin: '16px 0',
        width: '32px',
        height: '32px',
        minWidth: '32px',
        [theme.breakpoints.down('sm')]: {
            float: 'right',
        }
    },
    homeBannerDescription: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: '20px',
        lineHeight: '32px',
        padding: '36px 0 16px'
    },
    homeBannerPhone: {
        backgroundColor: '#FFF',
        color: theme.palette.primary.main,
        padding: '2px 3px',
        borderRadius: '50%',
        marginRight: '16px'
    },
    homeBannerBox: {
        zIndex: 1,
        textAlign: 'center',
        padding: '28px 0 48px',
    },
    homeBannerPhoneText: {
        fontWeight: 'bold',
        margin: '16px 0',
    }
}));

const Header = ({ state, actions, libraries }) => {
    const classes = useStyles()
    const isHomepage= ['/', '/en/start/'].includes(state.router.link)
    const language = state.theme.lang;
    const [isNavBarTop, setIsNavBarTop] = useState(false)
    const [openMobileMenu, setOpenMobileMenu] = useState(false)
    const appBarRef = useRef()
    const Html2React = libraries.html2react.Component;

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
                              <Hidden xsDown><a href="https://garofalohealthcare.com" target="_blank"><img className={classes.logoGhcTop} src={logoGHC} style={{height: isHomepage ? '60px' : '30px'}} alt="Logo Garofalo Health Care"/></a></Hidden>
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
                                  <Grid item xs={5} className={classes.homeBannerBox}>
                                      <Typography color="secondary" className={classes.homeBannerDescription}>
                                          {translations(state.theme.lang, 'descrizione')}
                                      </Typography>
                                      <Button onClick={actions.theme.toggleTuoTempo} variant={"contained"} color="secondary" disableElevation>
                                          {translations(state.theme.lang, 'prenotareUnaVisita')}
                                      </Button>
                                      <Typography variant="h3"  className={classes.homeBannerPhoneText}>
                                        <span className={classes.homeBannerPhone}>
                                            <PhoneIcon style={{height: '18px'}} />
                                        </span>
                                        059-449.111
                                      </Typography>
                                      <Typography color="secondary">
                                          <Html2React html={translations(state.theme.lang, 'orari')} />
                                      </Typography>
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
                  {(!isHomepage || isNavBarTop) &&  <Button className={classes.hhLogo} onClick={() => actions.router.set(pagesMap[0][state.theme.lang][1])}><img className={classes.appBarLogo} src={logoHHsmall} alt="Logo Hesperia Hospital"/></Button>}
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
                          {!isHomepage && (
                              <Hidden mdDown>
                                  <Button onClick={actions.theme.toggleTuoTempo} variant={"contained"} color="primary" disableElevation>
                                      {translations(state.theme.lang, 'prenotareUnaVisita')}
                                  </Button>
                              </Hidden>
                          )}
                      </Toolbar>
                  </Hidden>
              </Container>
          </AppBar>
      </>
    );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);