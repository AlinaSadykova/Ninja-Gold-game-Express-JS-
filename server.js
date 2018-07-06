const xp = require("express")
const path = require("path")
const bp = require("body-parser")
const app = xp();
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
app.use(xp.static(path.join(__dirname, "./static")))

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(bp.urlencoded({extended: true}))

app.get("/", function(req, res){
    if(!req.session.score){
        req.session.score = 0;
    }
    if(!req.session.activity){
        req.session.activity = [];
    }
    
     res.render("index", {session: req.session.score,
    activity: req.session.activity});
})
app.post('/cave', function (req, res){
    // set the name property of session. 
    let nmn = Math.floor(Math.random() * (10 - 5 + 1) ) + 5; 
    req.session.activity.push('Earned ' + nmn.toString() + ' golds from the Cave');
    console.log(req.session.activity)
    req.session.score  =  req.session.score + nmn;
    res.redirect('/');
});
app.post('/farm', function (req, res){
    // set the name property of session. 
    let nmn = Math.floor(Math.random() * (20 - 10 + 1) ) + 10; 
    req.session.activity.push('Earned ' + nmn.toString() +  ' golds from the Farm');
    console.log(req.session.activity)
    req.session.score  =  req.session.score + nmn;
    res.redirect('/');
});
app.post('/house', function (req, res){
    // set the name property of session. 
    let nmn = Math.floor(Math.random() * (5 - 2 + 1) ) + 2; 
    req.session.activity.push('Earned ' + nmn.toString() + ' golds from the House');
    console.log(req.session.activity)
    req.session.score  =  req.session.score + nmn;
    res.redirect('/');
});
app.post('/casino', function (req, res){
    // set the name property of session. 
    let nmn = Math.floor(Math.random() * (50 -(-50) + 1) ) - 50; 
    if(nmn>=0){req.session.activity.push('Earned ' + nmn.toString() + ' golds from the Casino',);
    console.log(req.session.activity)}
    else{
        req.session.activity.push('Entered a Casino and lost ' +nmn.toString() + ' golds Ouch...',);
    }
    console.log(req.session.activity)
    req.session.score  =  req.session.score + nmn;
    res.redirect('/');
});
app.get('/reset', function (req, res){
    // set the name property of session. 
    req.session.activity = [];
    req.session.score  = 0
    res.redirect('/');
});

 app.listen(8000, function(){
     console.log("listen 8000");
 })