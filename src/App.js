import React,{useEffect} from 'react';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import WebCamCapture from './app/webCamCapture/WebCamCapture';
import { useHistory } from 'react-router-dom';
import Preview from './app/preview/preview.js';
import Chats from './app/Chats/chats.js';
import Story from './app/Story/story.js';
import Signin from './app/siginin/signin.js';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { auth } from './features/firebase';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectUser,login ,logout} from './features/appSlice';
import { sign } from 'cookie-signature';


const App=()=> {
  const history=useHistory();
  const dispatch = useDispatch();
  const  userdata= useSelector(selectUser);
  // useEffect(() => {
  //   console.log("auth from App",auth);
  //   console.log("history---",history)
  //   if(auth.currentUser==null){
  //    history.push("/signin");
  //  }
  // })

  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
       if(authUser){
         console.log("authUser",authUser);
        dispatch(login({
          userName:authUser.displayName,
          userImage:authUser.photoURL ,
          id:authUser.uid}))
       }
       else{
        dispatch(logout());
       }
    })
  }, [])
  return (
    <div className="App">
       <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
      <Router>
        <div className='app__body'>
        <div className='app__background'>
        {!userdata?<Signin/>:(
          <Switch>
            <Route exact path="/">
              <WebCamCapture />
            </Route>
            <Route exact path="/preview">
              <Preview />
            </Route>
            <Route exact path="/chats">
              <Chats />
            </Route>
            <Route exact path="/story">
              <Story />
            </Route>
            <Route path="/">
              <WebCamCapture />
            </Route>
          </Switch>
          )}
        </div>
        </div>
      </Router>

    </div>
  );
}

export default App;
