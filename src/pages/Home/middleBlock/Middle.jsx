import React from 'react'
import Saved from '../saved/Saved'
import Tagged from '../tagged/Tagged'
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import MyPost from '../myPost/MyPost';

function Middle({value}) {
  return (
   <>
   <div className="box">
    
    {value}

 
   </div>
   </>
  )
}

export default Middle
