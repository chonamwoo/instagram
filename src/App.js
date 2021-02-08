import React, {useState, useEffect} from 'react';
import './App.css';
import Posts from './Posts';
import {db, auth} from './firebase'
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';


function getModalStyle() {
  const top = 50; 
  const left = 50; 

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function App() {

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);


  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((authUser) =>{
      if (authUser){
        //user logs in...
        console.log(authUser);
        setUser(authUser);

        // if (authUser.displayName){
        //     //dont update username
        // } else {
        //   //if we created someone
        //   return authUser.updateProfile({
        //     displayName: username,
        //   });
        // }

      } else{
        //user logs out...
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }

  }, [user, username]);



  //runs a piece of code based on a specific condition
  useEffect(()=>{
    // this is where the code runs
    db.collection('posts').orderBy('timesamp','desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc =>({
          id: doc.id,
          post:doc.data()
       })));
      //everytime a new post is added, this code 
    })
  }, [])

  const signup = (event) =>{
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email,password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))

  }

  const signIn = (event) => {
    event.preventDefault();
    
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <div className="app">

      {user?.displayName ? (
        <ImageUpload username ={user.displayName} />
      ): (
        <h3>sorry you need to login to upload</h3>
      )}

    <Modal
      open={open}
      onClose={() => setOpen(false)}
    >
     <div style={modalStyle} className={classes.paper}>
      <form className = 'app__signup'>
           <center>
            <img
              className = 'app__headerImage'
              src= 'https://cdn.pixabay.com/photo/2016/08/15/01/29/instagram-1594387_960_720.png'
              alt =""
              width = '100'
              />
            </center>

            <Input
            placeholder ='username'
            type ='text'
            value ={username}
            onChange ={(e) => setUsername(e.target.value)}
            />
            <Input
            placeholder ='email'
            type ='text'
            value ={email}
            onChange ={(e) => setEmail(e.target.value)}
            />
            <Input
            placeholder ='password'
            type ='password'
            value ={password}
            onChange ={(e) => setPassword(e.target.value)}
            />
            <Button type ='submit' onClick ={signup}>Sign Up</Button>
      </form>


      </div>
      
    </Modal>

    <Modal
      open={openSignIn}
      onClose={() => setOpen(false)}
    >
     <div style={modalStyle} className={classes.paper}>
      <form className = 'app__signup'>
           <center>
            <img
              className = 'app_headerImage'
              src= 'https://cdn.pixabay.com/photo/2016/08/15/01/29/instagram-1594387_960_720.png'
              alt =""
              width = '100'
              />
            </center>

            <Input
            placeholder ='email'
            type ='text'
            value ={email}
            onChange ={(e) => setEmail(e.target.value)}
            />
            <Input
            placeholder ='password'
            type ='password'
            value ={password}
            onChange ={(e) => setPassword(e.target.value)}
            />
            <Button type ='submit' onClick ={signIn}>Sign In</Button>
      </form>


      </div>
      
    </Modal>


      <div className ='app__header'>
        <img 
        className = "app_headerImage"
        src = 'https://cdn.pixabay.com/photo/2016/08/15/01/29/instagram-1594387_960_720.png'
        width = '100'
        alt=""
        />

      {user? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ): (
        <div className ='app__loginContainer'>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      </div>

      <h1>ㅋ</h1>
        <div className='app__posts'>
      {
        posts.map(({id, post}) => (

          <Posts username ={post.username} caption={post.caption} imageURL = {post.imageURL} />
        ))
      }
      </div>
      <InstagramEmbed
        url='https://instagr.am/p/Zw9o4/'
        clientAccessToken='123|456'
        maxWidth={320}
        hideCaption={false}
        containerTagName='div'
        protocol=''
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />

      {/* header */}
      {/* posts */}
      <Posts username='daniel' caption= 'heh' imageURL ="http://k-ang.co.kr/landing/img/store_btn.png"/>
      <Posts username= 'thomas' caption= 'hoh' imageURL = "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"/>
      <Posts/>
      <Posts/>

      {/* posts */}


    </div>
  );
}

export default App;
