import React from 'react'
import './bottom.css'
import { Link } from 'react-router-dom'


function BottomBar() {
  return (
    
    <div className="profileBottomBar">
    <Link className='l' to="/profile/:username/myPost">My Post</Link>
    <Link className='l' to="/profile/:username/saved">Saved</Link>
    <Link className='l' to="/profile/:username/tagged">Tagged</Link>

    </div>
  )
}

export default BottomBar
