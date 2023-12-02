import React from 'react'
import "../styles.css"
import instagramImage from '../images/instagram.png';
import facebookImage from '../images/facebook.png'
import twitchImage from '../images/twitch.png'


const Footer = () => {
    return (
        <footer className='footer'>
            <a href='https://www.instagram.com/lsacbucuresti/?hl=en' target='_blank' rel='noopener noreferrer'>
                <img src={instagramImage} alt='Instagram' className='image'/>
            </a>
            <a href='https://www.facebook.com/LsacBucuresti/'>
                <img src={facebookImage} alt='Facebook' className='image'/>
            </a>
            <a href='https://www.twitch.tv/lsac_bucuresti'>
                <img src={twitchImage} alt='Twitch' className='image'/>
            </a>
        </footer>
    )
}

export default Footer