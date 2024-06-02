import React from 'react'

function Audio() {
  return (
    <div style={{width:'100%'}}>
        <audio controls style={{width:'100%'}}>
            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
        </audio>
    </div>
  )
}

export default Audio
