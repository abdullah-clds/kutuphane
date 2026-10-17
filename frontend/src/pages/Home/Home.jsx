import React, { useRef } from 'react'
import Hero from '../../components/Hero/Hero'
import Gallery from '../../components/Gallery/Gallery'
import { TodayHours, Explore, Newsroom, ResourceStats, AskLibrarian, useBandReveal } from '../../components/Home/Sections'

// Homepage: the theme's intro (preloader + photo slider) and its library area (Gallery) stay as they
// are; the other sections follow Harvard Library's structure, drawn in the theme's own dark language.
const Home = () => {
    const scope = useRef(null)
    useBandReveal(scope)
    return (
        <div ref={scope}>
            <Hero />
            <Newsroom />
            <TodayHours />
            <Gallery />
            <ResourceStats />
            <Explore />
            <AskLibrarian />
        </div >
    )
}

export default Home
