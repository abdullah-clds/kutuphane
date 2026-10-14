import { Link } from 'react-router-dom'
import { media } from '../../lib/content'

const Logo = () => {
    return (
        <div className='relative z-40'>
            <Link to="/" className="absolute top-[max(1.25rem,2vw)] left-6 md:left-7 block w-40 md:w-48" aria-label="Kapadokya Üniversitesi Kütüphanesi, anasayfa">
                <img src={media("media/site/kapadokya-logo-beyaz.png")} alt="Kapadokya Üniversitesi" className="w-full h-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.45)]" width="560" height="123" />
            </Link>
        </div>
    )
}

export default Logo
