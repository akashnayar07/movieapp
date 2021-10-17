import React from 'react'
import './header.css'

const Header = () => {
    return (
        <div className="container-fluid headerbox sticky-top">
            <h2 onClick={()=>window.scroll(0,0)}>MoviesHUB</h2>
        </div>
    )
}

export default Header
