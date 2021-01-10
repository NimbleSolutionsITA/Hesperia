import React, {useState} from 'react'
import {Grid, Container, Card, Typography, CardContent, CardMedia, CardActionArea, TextField, Chip} from "@material-ui/core";
import {connect} from "frontity";
import translations from "../../translations";
import {departments} from "../../config";
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';

const Doctors = ({ state, actions, libraries }) => {
    const [onlyHead, setOnlyHead] = useState(false)
    const data = state.source.get(state.router.link);
    const post = state.source[data.type][data.id];
    const serviceId = state.router.state;
    const Html2React = libraries.html2react.Component;
    const allDepartments = departments(state.theme.lang).map(dep => dep[0])
    const doctors = Object.keys(state.source.doctors).map(postId => state.source.doctors[postId])
    const filterDoctors = (departments) => (
            typeof serviceId === 'number' ?
            doctors.filter(doc => doc.acf.prestazioni.filter(p => p.ID === serviceId).length > 0) :
            doctors
        )
        .filter(({categories}) => categories.filter(cat => departments.includes(cat)).length > 0)
        .filter(({acf}) => !onlyHead || acf.doctorsHead)
    const [currentDepartments, setCurrentDepartments] = useState(allDepartments)
    const [searchWord, setSearchWord] = useState('')

    const handleClick = (value) => currentDepartments.includes(value) ?
        setCurrentDepartments(currentDepartments.filter(dep => dep !== value)) :
        setCurrentDepartments([...currentDepartments, value])

    return (
        <Container>
            <Typography style={{fontWeight: 'bold', textAlign: 'center', margin: '64px 0 32px'}} variant="h1"><Html2React html={post.title.rendered} /></Typography>
            <Html2React html={post.content.rendered} />
            <Grid container justify="center" style={{marginTop: '16px'}}>
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <TextField
                        placeholder={translations(state.theme.lang, 'cercaUnDottore')}
                        type="search"
                        value={searchWord}
                        onChange={(event) => setSearchWord(event.target.value)}
                        variant="outlined"
                        fullWidth
                        style={{margin: '16px 0'}}
                    />
                </Grid>
            </Grid>
            <div style={{margin: '16px 0', textAlign: 'center'}}>
                {typeof serviceId === 'number' ? (
                        <Typography color="primary" style={{fontWeight: 'bold', textAlign: 'center', margin: '8px 0 32px', textTransform: 'uppercase'}} variant="h4">
                            <Html2React html={state.source.services[serviceId].title.rendered} />
                        </Typography>
                    ) :
                    (
                        <>
                            <Chip
                                avatar={<SupervisedUserCircleRoundedIcon />}
                                label={translations(state.theme.lang, 'soloResponsabili')}
                                onClick={() => setOnlyHead(!onlyHead)}
                                style={{
                                    margin: '8px',
                                    backgroundColor: onlyHead ? 'rgba(31, 64, 125, 0.2)' : 'rgba(31, 64, 125, 0.05)'
                                }}
                            />
                            {allDepartments.map((value) => (
                                <Chip
                                    key={value}
                                    label={departments(state.theme.lang).filter(dep => dep[0] === value)[0][1]}
                                    onClick={() => handleClick(value)}
                                    style={{
                                        margin: '8px',
                                        backgroundColor: currentDepartments.includes(value) ? 'rgba(31, 64, 125, 0.2)' : 'rgba(31, 64, 125, 0.05)'
                                    }}
                                />
                            ))}
                        </>
                    )
                }
            </div>
            {filterDoctors(currentDepartments) && (
                <Grid container>
                    {filterDoctors(currentDepartments)
                        .filter(doctor => searchWord ? doctor.title.rendered.toLowerCase().indexOf(searchWord.toLowerCase()) > -1 : true)
                        .map(doctor => (
                        <Grid key={doctor.id} item xs={12} sm={6} md={4} lg={3}>
                            <Card elevation={0}>
                                <CardActionArea>
                                    <CardMedia
                                        onClick={() => actions.router.set(doctor.link)}
                                        image={state.source.attachment[doctor["featured_media"]]['source_url']}
                                        style={{height: '300px'}}
                                    />
                                    <CardContent>
                                        <div onClick={() => actions.router.set(doctor.link)}>
                                            <Typography variant="h4" style={{fontWeight: 'bold'}}>{doctor.acf.doctorsHead && <SupervisedUserCircleRoundedIcon style={{marginBottom: '-4px', marginRight: '4px', fontSize: '22px', lineHeight: '22px'}} />}{doctor.title.rendered}</Typography>
                                            <Typography style={{margin: '16px 0'}}>{doctor.acf.doctorActivity}</Typography>
                                        </div>
                                        <div style={{marginLeft: '-4px', width: 'calc(100% + 4px)'}}>
                                            {doctor.acf.prestazioni.map(prestazione => (
                                                <Chip
                                                    key={prestazione.ID}
                                                    label={prestazione['post_title']}
                                                    onClick={() => actions.router.set(state.source.services[prestazione.ID].link)}
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
                    ))}
                </Grid>
            )}
        </Container>
    )
}

export default connect(Doctors)