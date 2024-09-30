import express from 'express';
import auth from './auth.js'; 
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;

dotenv.config({
  path: "./.env",
});

const app = express();
// allowing json data
app.use(express.json({ limit: "16kb" }));

//for url consistency
app.use(express.urlencoded({ extended: true }));

app.use(session({secret:process.env.SESSION_SECRET,resave: false,saveUninitialized: true,}));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req,res,next){
  req.user ? next() : res.sendStatus(401);
}

app.get('/',(req,res)=>{
  res.send('<a href="/auth/google">Login by Google</a>');
})

app.get('/auth/google',
  passport.authenticate('google',{scope:['email','profile']})
)

app.get('/auth/google/callback',passport.authenticate('google',{
   successRedirect: '/protected',
   failureRedirect: '/auth/google/failure'
}))


app.get('/protected',isLoggedIn,(req,res)=>{
  console.log(req.user);
  res.send(`Welcome ${req.user.displayName}`)
  
})

app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy();
    res.send('User Logout sucessfully!');
  });
});



app.get('/auth/google/failure',(req,res)=>{
  res.send("Something went wrong")
})
app.listen(PORT,()=>{
  console.log("listening on port 3000");
})
