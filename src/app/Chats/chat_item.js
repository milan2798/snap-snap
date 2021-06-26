import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import ReactTimeago from 'react-timeago'
import './chat_item.css'
import '../Story/story.js'
import { useDispatch } from 'react-redux';
import { selectImage } from '../../features/appSlice';
import { Avatar } from '@material-ui/core';

function Chat_item({item}) {
    const history=useHistory();
    const dispatch = useDispatch();
    const openImage =()=>{
        dispatch(selectImage(item.imageURL));
    //    history.push('/story',{image:item.imageURL});
         history.push('/story')
    }
    return (
        <div className="chat_item" onClick={openImage}>
              <Avatar variant="circular" src={item?.profileImage} alt=""/>
              {/* {console.log(item)} */}
              <div>
              <p>{item.username}</p>
              {/* {console.log(new Date(item?.timestamp?.toDate()).toUTCString())} */}
              <p>Tap to view - <ReactTimeago date={new Date(item?.timestamp?.toDate()).toUTCString()} /></p>
              </div>
        </div>

    )
}

export default Chat_item;