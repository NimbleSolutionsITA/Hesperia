import React from 'react'
import {connect} from "frontity"
import {Button, Container} from "@material-ui/core"
import PracticalInfoSliderView from "../PracticalInfo/SliderView";
import AlertBox from "./AlertBox";
import FeaturedSliderView from "../Articles/Featured";
import NewsList from "../Articles/News";
import HowToBox from "./HowToBox";
import BottomBoxes from "./BottomBoxes";
import {pagesMap} from "../../config";

const Home = ({ state, actions, libraries }) => {
    const data = state.source.get(state.router.link);
    const post = state.source[data.type][data.id];
    const {
        hpAlertIsActive,
        hpAlertTitle,
        hpAlertBody,
        howToTitle,
        howToBody,
        howToPhone,
        howToTime,
        isBox1,
        titleBox1,
        bodyBox1,
        imageBox1,
        ctaBox1,
        isBox2,
        titleBox2,
        bodyBox2,
        imageBox2,
        ctaBox2
    } = post.acf
    // Component exposed by html2react.
    const Html2React = libraries.html2react.Component;
    return  data.isReady ? (
        <>
            <Container>
                {hpAlertIsActive && (
                    <AlertBox
                        hpAlertIsActive={hpAlertIsActive}
                        hpAlertTitle={hpAlertTitle}
                        hpAlertBody={hpAlertBody}
                        Html2React={Html2React}
                    />
                )}
                <HowToBox
                    title={howToTitle}
                    body={howToBody}
                    phone={howToPhone}
                    time={howToTime}
                    Html2React={Html2React}
                />
            </Container>
            <PracticalInfoSliderView style={{marginTop: '32px'}} />
            <Container>
                <FeaturedSliderView />
                <NewsList />
                <div style={{margin: '32px', textAlign: 'center'}}>
                    <Button
                        onClick={() => actions.router.set(pagesMap[5][state.theme.lang][1])}
                        color="primary"
                    >
                        {pagesMap[5][state.theme.lang][0]}
                    </Button>
                </div>
                <BottomBoxes
                    isBox1={isBox1}
                    titleBox1={titleBox1}
                    bodyBox1={bodyBox1}
                    imageBox1={imageBox1}
                    ctaBox1={ctaBox1}
                    isBox2={isBox2}
                    titleBox2={titleBox2}
                    bodyBox2={bodyBox2}
                    imageBox2={imageBox2}
                    ctaBox2={ctaBox2}
                />
            </Container>
        </>
    ) : null
}

export default connect(Home)