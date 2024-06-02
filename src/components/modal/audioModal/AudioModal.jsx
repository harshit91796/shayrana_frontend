import React from 'react';
import './audioModal.css';
import { Close } from '@mui/icons-material';

function AudioModal({ audioBlob, onClose ,imageUrl }) {
    const audioUrl = URL.createObjectURL(audioBlob);
    console.log('bkbbjhbj',imageUrl)
    return (
        <div className="audioModal">
            <div className="audioModal-content">
                <img src={imageUrl} alt=""/>
                <audio controls src={audioUrl} />
                <Close className='closeButtonAudioModal' onClick={onClose} />
            </div>
        </div>
    );
}

export default AudioModal;
