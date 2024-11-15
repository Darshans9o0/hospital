import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div>
        {/* left side */}
        <div>
            <p>
                Book appointment <br /> with teusted doctor
            </p>
            <div>
                <img src={assets.group_profiles} alt="" />
                <p>
                Simply browse through our extensive list of trusted doctors, <br />
                schedule your appointment hassle-free. 
                </p>
            </div>
            <a href="">
                Book Appointment <img src={assets.arrow_icon} alt="" />
            </a>

        </div>
        {/* right  side */}

    </div>
  )
}

export default Header