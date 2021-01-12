import React, {useEffect, useState} from 'react';
import {connect} from "frontity";
import {Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Typography} from "@material-ui/core";
import StarsRoundedIcon from '@material-ui/icons/StarsRounded';
import translations from "../../translations";
import Loading from "../loading";

const AllTheNews = ({state, actions, libraries}) => {
    const isFeatured = (post) => post.categories.includes(state.theme.lang === 'it' ? '27' : '29')
    const [allNews, setAllNews] = useState(null)

    useEffect(() => {
        async function fetchAllNews() {
            const response = await libraries.source.api.get({
                endpoint: "posts",
                params: { _embed: true, categories: state.theme.lang === 'it' ? "1" : "7", per_page: 20 },
            });
            const res = await libraries.source.populate({ response, state })

            console.log(res)

            return res.map(({id}) => state.source.post[id])
        }
        fetchAllNews().then(cNews => setAllNews(cNews))
    }, [state.theme.lang]);

    return (
        <div style={{padding: '32px 0'}}>
            <Typography align="center" variant="h1" style={{fontWeight: 'bold', marginBottom: '32px'}}>{translations(state.theme.lang, 'tutteLeNotizie')}</Typography>
            <Grid container spacing={4}>
                {allNews && allNews.length > 0 ? allNews.map(article => (
                    <Grid key={article.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card elevation={0}>
                            <CardActionArea onClick={() => actions.router.set(article.link)}>
                                <CardMedia
                                    image={state.source.attachment[article["featured_media"]]['media_details']['sizes']['thumbnail']['source_url']}
                                    style={{height: '300px'}}
                                />
                                <CardContent>
                                    <Typography variant="h4" style={{fontWeight: 'bold'}}>
                                        {isFeatured(article) && <StarsRoundedIcon style={{marginBottom: '-4px', marginRight: '4px', fontSize: '22px', lineHeight: '22px'}} />}
                                        {article.title.rendered}
                                    </Typography>
                                    <Typography style={{margin: '16px 0'}}>{article.acf.excerpt}</Typography>
                                    <div style={{marginLeft: '-4px', width: 'calc(100% + 4px)'}}>
                                        {article.categories.filter(catId => ![1, 63, 65, 7].includes(catId)).map(catId => state.source.category[catId]).map(category => (
                                            <Chip
                                                key={category.id}
                                                label={category.name}
                                                style={{
                                                    margin: '2px',
                                                    backgroundColor: 'rgba(31, 64, 125, 0.05)'
                                                }}
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )) : <Loading />}
            </Grid>
        </div>
    )
}

export default connect(AllTheNews)