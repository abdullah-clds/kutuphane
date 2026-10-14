import React from 'react'
import Hero from '../../components/Hero/Hero'
import Welcome from '../../components/Welcome/Welcome'
import Choose from '../../components/Choose/Choose'
import StickyCols from '../../components/StickyCols/StickyCols'
import Gallery from '../../components/Gallery/Gallery'
import MarqueeSticky from '../../components/Layouts/MarqueeSticky'
import MapLink from '../../components/MapLink/MapLink'
import Activities from '../../components/Activities/Activities'
import Showcase from '../../components/Showcase/Showcase'
import Feedback from '../../components/Feedback/Feedback'
import FooterBanner from '../../components/FooterBanner/FooterBanner'
import AnnouncementsSection from '../../components/Announcements/AnnouncementsSection'

// Section order (see docs/SECTION-MAPPING.md). The hero greets with the library photographs; announcements
// have their own panel after the introduction; the theme's sections follow with library content. Background colours chain as before.
const Home = () => {
    return (
        <div>
            <Hero />
            <Welcome />
            <AnnouncementsSection />
            <Choose />
            <Gallery />
            <MapLink />
            <MarqueeSticky />
            <StickyCols />
            <Activities />
            <Showcase />
            <Feedback />
            <FooterBanner />
        </div >
    )
}

export default Home
