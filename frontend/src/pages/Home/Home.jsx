import React from 'react'
import Hero from '../../components/Hero/Hero'
import Gallery from '../../components/Gallery/Gallery'
import SearchBand from '../../components/Home/SearchBand'
import NewsBoard from '../../components/Home/NewsBoard'
import ResourceGrid from '../../components/Home/ResourceGrid'
import ResearchBand from '../../components/Home/ResearchBand'

// Institutional homepage (docs/SECTION-MAPPING.md): the photo slider, then light "paper" panels with
// search, announcements and resources; the libraries photo band (Gallery) stays dark in between.
const Paper = ({ children }) => (
    <div className="px-2">
        <div className="kun-paper rounded-[2.5rem] px-6 md:px-10 lg:px-14 py-12 md:py-16 flex flex-col gap-16 md:gap-20">
            {children}
        </div>
    </div>
)

const Home = () => {
    return (
        <div>
            <Hero />
            <Paper>
                <SearchBand />
                <NewsBoard />
                <ResourceGrid />
            </Paper>
            <Gallery />
            <Paper>
                <ResearchBand />
            </Paper>
        </div >
    )
}

export default Home
