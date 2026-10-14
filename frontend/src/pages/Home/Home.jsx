import React, { useRef } from 'react'
import Hero from '../../components/Hero/Hero'
import { IntroSearch, TodayHours, Explore, Newsroom, ResourceStats, LibrariesRail, OpenScience, AskLibrarian, useBandReveal } from '../../components/Home/Sections'

// Homepage: the Capsule intro (preloader + photo slider) stays; everything below follows the
// Harvard Library structure in an Apple-like visual language (docs/SECTION-MAPPING.md).
const Home = () => {
    const scope = useRef(null)
    useBandReveal(scope)
    return (
        <div ref={scope}>
            <Hero />
            <IntroSearch />
            <TodayHours />
            <Newsroom />
            <ResourceStats />
            <LibrariesRail />
            <Explore />
            <OpenScience />
            <AskLibrarian />
        </div >
    )
}

export default Home
