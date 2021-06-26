import { History, HistorySharp } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import './story.css'
import { auth } from '../../features/firebase';
import { selectedImage, selectImage,resetImage } from '../../features/appSlice';

function Story() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const  imageSelect= useSelector(selectedImage);
    let clear = null;
    const img=imageSelect
    console.log("story_history", history)
    // const [count, setcount] = useState(3)
    // const location = useLocation();

    // useEffect(() => {
    //     timer();
    //     return () =>{
    //         clearInterval(clear);
    //     }
    // })
    // const tick=()=>{
    //     console.log("count---",count);
    //     setcount(count-1);
    //     if(count===0){
    //         clearInterval(clear);
    //         history.replace('/chats');
    //     }
    // }
    // const timer=()=> {
    //     clear=setInterval(()=>tick(),1000)
    // };
    // useEffect(() => {
    //     clear = setTimeout(() => history.replace('/chats'), 50000)
    //     return () => {
    //         clearTimeout(clear);
    //     }
    // })
    const handleCloseStory = () => {
        // clearInterval(clear);
        // clearTimeout(clear);
        // history.replace('/chats');
        dispatch(resetImage());

    }
    useEffect(()=>{
    //  if(auth.currentUser == null){
    //      history.replace('/signin')
    //  }
       if(!imageSelect){
           history.replace('/chats')
       }
    },[imageSelect]);
    return (
        <div className="story">
            {/* {console.log("story---", location.state.image)} */}
            {/* <img src={location.state.image} /> */}
            <img src={img} alt=""/>
            <div className="timer">
            <CountdownCircleTimer
                isPlaying
                onComplete={()=>{
                    dispatch(resetImage())
                    // history.replace('/chats');
                }}
                duration={11}
                colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                ]}
                strokeWidth={6}
                size={50}
               
            >
                {({ remainingTime }) => remainingTime-1}
            </CountdownCircleTimer>
            </div>
            <CloseIcon className="close_story" onClick={handleCloseStory} />
        </div>
    )
}

export default Story
