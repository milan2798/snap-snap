import React,{useRef,useCallback,useEffect} from 'react'
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { setCameraImage } from '../../features/cameraSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './WebCamCapture.css'
import { auth } from '../../features/firebase';
const videoConstrains={
    width:250,
    height:400,
    facingMode:'user'
}


function WebCamCapture() {
    const webcamRef = useRef(null);
    const dispatch = useDispatch() ;
    const history=useHistory();
    const capture = useCallback(() => {
            const imgSrc=webcamRef.current.getScreenshot();
            dispatch(setCameraImage(imgSrc));
            history.push('/preview');
        },
        [webcamRef],
    )
    useEffect(() => {
        console.log("auth---",auth)
        // if(auth.currentUser===null){
        //      history.replace('/signin'); 
        // }
        
    })
    return (
        <div className="webcamCapture">
           <Webcam
               audio={false}
               height={videoConstrains.height}
               ref={webcamRef}
               screenshotFormat="image/jpeg"
               width={videoConstrains.width}
               videoConstraints={videoConstrains}
               mirrored='true'
            
           />
           <RadioButtonUncheckedIcon 
             className="webcamCapture__button"
             fontSize="large"
        
             onClick={capture}
           />
        
        </div>
    )
}

export default WebCamCapture
