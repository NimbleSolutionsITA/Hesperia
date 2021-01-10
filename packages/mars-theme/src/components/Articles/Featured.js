import React, {useState} from 'react'
import { connect, decode } from "frontity"
import {getPostsGroupedByCategory} from "../../helpers";
import {useSwipeable} from "react-swipeable"
import {
    makeStyles,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    Hidden,
    Button
} from "@material-ui/core"
import ArrowIcon from "../icons/Arrow";
import translations from "../../translations";
import PrenotaOra from "../PrenotaOra";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        borderRadius: '8px',
        position: 'relative',
        height: '270px',
    },
    content: {
        width: '60%',
        padding: '32px 0 32px 40px'
    },
    cover: {
        width: '40%',
        clipPath: 'circle(60% at 70% 50%)',
        [theme.breakpoints.down('md')]: {

            clipPath: 'circle(60% at 80% 50%)',
        }
    },
    wrapper: {
        position: 'relative',
        padding: '32px 0',
        touchAction: 'pan-y'
    },
    actionButtons: {
        display: 'inline-block',
        '& button': {
            padding: '14px 24px',
            marginRight: '16px',
        },
        '&button:last-child': {
            marginRight: 0,
        }
    }
}));

const FeaturedSliderView = ({ state, libraries, actions }) => {
    const classes = useStyles();
    const [currentSlide, setCurrentSlide] = useState(0)
    const postsPerCategory = getPostsGroupedByCategory(state.source, state.theme.lang)
    const featuredPosts = postsPerCategory.filter(item => [27, 29].includes(item.category.id))[0]

    const chunkSize = 2;

    const slideChunks = featuredPosts.posts.map((e, i) => i % chunkSize === 0 ?
        featuredPosts.posts.slice(i, i + chunkSize) :
        null
    ).filter(el => el)

    const Html2React = libraries.html2react.Component;

    function handlePrevClick() {
        return currentSlide === 0 ?
            setCurrentSlide(slideChunks.length - 1) :
            setCurrentSlide(currentSlide - 1)
    }
    function handleNextClick() {
        return currentSlide === slideChunks.length - 1 ?
            setCurrentSlide(0) :
            setCurrentSlide(currentSlide + 1)
    }

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handlePrevClick,
        onSwipedRight: handleNextClick,
    });

    return (
        <div {...swipeHandlers} className={classes.wrapper}>
            <Typography align="center" variant="h1" style={{fontWeight: 'bold', marginBottom: '32px'}}>{translations(state.theme.lang, 'inPrimoPiano')}</Typography>
            <Grid container spacing={4}>
                {slideChunks[currentSlide].map(info => (
                    <Grid key={info.id} item xs={12} md={6}>
                        <Card className={classes.root}>
                            <CardContent classes={{root: classes.content}}>
                                <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
                                    <Typography component="h4" variant="h4" style={{fontWeight: 'bold'}}>
                                        {decode(info.title.rendered)}
                                    </Typography>
                                    <div style={{flexGrow: 1, padding: '16px 0'}}>
                                        <Html2React html={info.acf.excerpt} />
                                    </div>
                                    <div className={classes.actionButtons}>
                                        <Button onClick={() => actions.router.set(info.link)} size="small" variant="contained">{translations(state.theme.lang, 'scopriDiPiu')}</Button>
                                        {info.acf.prenotaOra && <PrenotaOra size="small"/>}
                                    </div>
                                </div>
                            </CardContent>
                            <CardMedia
                                className={classes.cover}
                                image={state.source.attachment[info["featured_media"]]['source_url']}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Hidden mdDown>
                <div style={{position: 'absolute', top: '50%', left: '-44px'}}>
                    <IconButton disabled={currentSlide === 0} onClick={handlePrevClick}><ArrowIcon color="#000000" back /></IconButton>
                </div>
                <div style={{position: 'absolute', top: '50%', right: '-44px'}}>
                    <IconButton disabled={currentSlide === slideChunks.length - 1} onClick={handleNextClick}><ArrowIcon color="#000000" /></IconButton>
                </div>
            </Hidden>
        </div>
    )
}

export default connect(FeaturedSliderView)