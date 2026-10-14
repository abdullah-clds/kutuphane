import React from 'react'
import Hero from '../../components/Hero/Hero'
import Welcome from '../../components/Welcome/Welcome'
import Choose from '../../components/Choose/Choose'
import StickyCols from '../../components/StickyCols/StickyCols'
import Gallery from '../../components/Gallery/Gallery'
import MarqueeSticky from '../../components/Layouts/MarqueeSticky'
import AnnouncementsSection from '../../components/Announcements/AnnouncementsSection'
import ServicesStrip from '../../components/Services/ServicesStrip'

// Compact homepage (see docs/SECTION-MAPPING.md). Activities, Showcase, Feedback, MapLink and
// FooterBanner are no longer on the homepage; their content lives on the inner pages.
const Home = () => {
    return (
        <div>
            <Hero />
            <Welcome />
            <AnnouncementsSection />
            <Choose />
            <Gallery />
            <MarqueeSticky />
            <StickyCols />
            <ServicesStrip />
        </div >
    )
}

export default Home
