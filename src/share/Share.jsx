import React, { useContext, useRef, useState } from 'react'
import './share.css'
import { EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material'
import { AuthContext } from '../context/authContext'
import axiosInstance from '../api'

function Share() {
    const{user} = useContext(AuthContext)
    const desc = useRef()
    console.log(desc)
    const [file,setFile] = useState(null)
  
    const submitHandler = async (e) =>{
        e.preventDefault();
        const newPost = {
            userId : user.data._id,
            desc : desc.current.value
        }
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
              await axiosInstance.post("/upload", data);
            } catch (err) {}
          }
        try {
            await axiosInstance.post("/createpost",newPost)
            window.location.reload();
        } catch (error) {
            
        }

    }

  return (
    <div className='share'>
        <div className="shareWrapper">
        <div className="shareTop">
            <img src={'../../public/assets/person/nate.jpg'} className='feedImg'/>
                <input
                placeholder={"what's inn your mind " + user.data.username}
                className='shareInput'
                ref = {desc}
                />
        </div>
        </div>
        <hr className='shareHr'/>
        <form className="shareBottom" onSubmit={submitHandler} encType="multipart/form-data">
                <div className="shareOptions">
                    <label htmlFor='file' className="shareOption">
                    <PermMedia htmlColor='blue' className='shareIcon'/>
                        <span>photos or video</span>
                       <input name="file" style={{display : "none"}} type='file' id='file' accept='.png,.jpeg,.jpg' onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                    <Label htmlColor='pink' className='shareIcon'/>
                        <span>Tag</span>

                    </div>
                    <div className="shareOption">
                    <Room htmlColor='green' className='shareIcon'/>
                        <span>Location</span>

                    </div>
                    <div className="shareOption">
                    <EmojiEmotions htmlColor='yellow' className='shareIcon'/>
                        <span>Feelings</span>

                    </div>
                    <button className='shareButton' type='submit'>Share</button>
                </div>
        </form>
    </div>
  )
}

export default Share