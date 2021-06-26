import React from 'react'
import './preview.css'
import { useSelector } from 'react-redux';
import { selectCameraImage } from '../../features/cameraSlice';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close'
import TextFieldsIcon from '@material-ui/icons/TextFields';
import { resetCameraImage } from '../../features/cameraSlice';
import { useDispatch } from 'react-redux';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import EditIcon from '@material-ui/icons/Edit';
import TimerIcon from '@material-ui/icons/Timer';
import CropIcon from '@material-ui/icons/Crop';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuid } from "uuid";
import { db, storage } from '../../features/firebase';
import firebase from 'firebase';
import { selectUser } from '../../features/appSlice';

function Preview() {
    const history = useHistory();
    const cameraImage = useSelector(selectCameraImage);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    let images = [];
    useEffect(() => {
        if (!cameraImage) {
            history.replace('/');
        }
    }, [cameraImage, history]);

    const handleClosePreview = () => {
        dispatch(resetCameraImage())
    }
    const sendPost = () => {
        const id = uuid();
        let metadata = {
            contentType: 'image/jpeg',
        };
        if (cameraImage) {
            const storageRef = storage.ref().child(`posts/${id}`).putString(cameraImage, "data_url");
            storageRef.on('state_changed',
                null,
                (error) => {
                    console.log("error while uploading", error);
                },
                () => {
                    console.log("imaege uploaded successfully");
                    storage.ref('posts/')
                    .child(id)
                    .getDownloadURL()
                    .then((url) => {
                        console.log(url);
                        db.collection('/posts').add({
                             imageURL:url,
                             username:user.userName,
                             read:false,
                             //profile Pic
                             profileImage:user.userImage,
                             timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                        })
                        history.replace('/chats');
                    });
                })
        }
        else {
            history.replace('/');
        }
    }
    return (
        <div className='preview'>
            <CloseIcon className="close_preview" onClick={handleClosePreview} />
            <div className="edit_icon">
                <TextFieldsIcon />
                <EditIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt="failed to Load" />
            <div className="preview__footer" onClick={sendPost}>
                <h2>Send Now</h2>
                <SendIcon className="preview_sendIcon" />
            </div>

            {images.length > 0 && <img src={images[0]} alt="No image to show" />}
        </div>

    )
}

export default Preview

