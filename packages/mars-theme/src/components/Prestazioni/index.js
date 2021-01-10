import React, {useState, useEffect} from 'react'
import {Button, Container, Typography, TextField, Grid} from "@material-ui/core";
import {connect} from "frontity";
import {getServicesGroupedByCategory} from "../../helpers";
import PrestazioniTabs from "./PrestazioniTabs";
import translations from "../../translations";
import {pagesMap} from "../../config";

const Prestazioni = ({state, actions, libraries}) => {
    let currentPage;
    const isMainpage = state.router.link === pagesMap[1][state.theme.lang][1] || state.router.link === pagesMap[2][state.theme.lang][1]
    const data = () => {
        if (isMainpage)
            return state.source.get(state.router.link)
        const currentData = state.source.get(state.router.link)
        currentPage = state.source[currentData.type][currentData.id]
        return state.source.get(
            pagesMap[currentPage.categories.includes(33) || currentPage.categories.includes(39) ? 1 : 2][state.theme.lang][1]
        )
    }
    const post = state.source.page[data().id];
    const alphabet = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    const Html2React = libraries.html2react.Component;

    const currentCat = data().route === "/prestazioni-ambulatoriali/" || data().route === "/en/outpatient-services/" ? [33, 39] : [35, 37]
    const currentType = data().route === "/prestazioni-ambulatoriali/" || data().route === "/en/outpatient-services/" ? 'ambulatoriali' : 'ricoveri'


    const servicesPerCategory = getServicesGroupedByCategory(state.source, state.theme.lang)
    const {services} = servicesPerCategory.filter(item => currentCat.includes(item.category.id))[0]
    const [searchWord, setSearchWord] = useState('')
    const [servicesChunks, setServiceChunks] = useState([])
    const [expanded, setExpanded] = React.useState(currentPage && currentPage.id);

    useEffect(() => setServiceChunks(alphabet.map(letter => {
        return {
            letter,
            services: services.filter(service => service.title.rendered.startsWith(letter))
        }
    }).filter(letterChunk => letterChunk.services.length > 0)), [state.router.link])

    const handleChange = (event) => {
        setSearchWord(event.target.value)
        if (event.target.value.length > 0)
            setServiceChunks(alphabet.map(letter => {
                return {
                    letter,
                    services: services.filter(service => service.title.rendered.startsWith(letter) && service.title.rendered.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1)
                }
            }).filter(letterChunk => letterChunk.services.length > 0))
        else
            setServiceChunks(alphabet.map(letter => {
                return {
                    letter,
                    services: services.filter(service => service.title.rendered.startsWith(letter))
                }
            }).filter(letterChunk => letterChunk.services.length > 0))
    }

    return (
        <Container>
            <Typography style={{fontWeight: 'bold', textAlign: 'center', margin: '64px 0 32px'}} variant="h1">{post.title.rendered}</Typography>
            <Html2React html={post.content.rendered}/>
            <Grid container justify="center" style={{marginTop: '16px'}}>
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <TextField
                        placeholder={translations(state.theme.lang, 'cercaUnaPrestazione')}
                        type="search"
                        value={searchWord}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        style={{margin: '16px 0'}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography align="center">{translations(state.theme.lang, 'oppureClicca' +
                        '')}</Typography>
                    <div style={{margin: '16px 0', textAlign: 'center'}}>
                        {servicesChunks.map(chunk => (
                            <Button key={chunk.letter} component="a" href={`${state.router.link}#${chunk.letter}`}>{chunk.letter}</Button>
                        ))}
                    </div>
                </Grid>
            </Grid>
            <div style={{margin: '32px'}}>
                {servicesChunks.map((chunk, index) => (
                    <div key={chunk.letter} style={{position: 'relative'}}>
                        <div style={{position: 'absolute', top: '-90px', width: '1px', height: '1px'}} id={chunk.letter} />
                        <Typography color="primary" variant="h5" style={{fontWeight: 'bold', paddingLeft: '16px'}}>{chunk.letter}</Typography>
                        <PrestazioniTabs actions={actions} lang={state.theme.lang} type={currentType} services={chunk.services} expanded={expanded} setExpanded={setExpanded} Html2React={Html2React}/>
                        <br/>
                    </div>
                ))}
            </div>
        </Container>
    )
}

export default connect(Prestazioni)