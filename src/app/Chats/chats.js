import React, { useEffect, useState } from 'react'
import { auth, db } from '../../features/firebase';
import Chat_item from './chat_item';
import './chats.css';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch,useSelector} from 'react-redux';
import { logout,selectUser } from '../../features/appSlice';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

function Chats() {
    const [item, setitem] = useState([]);
     const dispatch = useDispatch(); 
    const history = useHistory();
    const user = useSelector(selectUser);
    const notify = () => toast.dark('Sign out Successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    useEffect(() => {
        db.collection("posts").orderBy('timestamp', 'desc').onSnapshot((querySnapshot) => {
            // querySnapshot.forEach((doc) => {
            //     // doc.data() is never undefined for query doc snapshots
            //     console.log(doc.data());
            //     temp.push(doc.data());
            //     console.log(querySnapshot.docs.length)
            //     console.log(temp.length)
            //     if(querySnapshot.docs.length == temp.length){
            //         console.log("reached");
            setitem(querySnapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            })));
            // }
            // })

        });
        // if(!auth.currentUser){
        //     console.log("auth from chat---",auth.currentUser)
        //   history.push('/signin')
        // }

    }, [])
    const signout = () => {

        auth.signOut().then(() => {
            // Sign-out successful.
            notify();
            // history.replace('/signin')
            dispatch(logout());
        }).catch((error) => {
            // An error happened.

        });
    }
    const webcam=()=>{
        history.push('/');
    }
    return (
        <div className="main_chat">
            <div className="chat_header">
                <img src={user?.userImage} onClick={signout} className="sign__out" />
                <h3>Friend</h3></div>
            <div className="chat_items">
                {item.map((item, index) => <Chat_item item={item.data} key={index} />)}
            </div>
            <RadioButtonUncheckedIcon 
             className="webcamCapture__chat"
             fontSize="large"
        
             onClick={webcam}
           />
        </div>
    )
}

export default Chats
