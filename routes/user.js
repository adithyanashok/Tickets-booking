var express = require('express');
var router = express.Router();
var moviesHelpers = require('../helpers/movie-helpers')
var eventsHelpers = require('../helpers/event-helpers')
var sportsHelpers = require('../helpers/sports-helpers')
var userHelpers = require('../helpers/user-helpers')
var thumbMovies = require('../helpers/thumbmovies-helpers')
var eventThumbnailsHelpers = require('../helpers/event-thumbnails')
let sportsThumbnail= require('../helpers/sports-thumbnail');
const thumbmoviesHelpers = require('../helpers/thumbmovies-helpers');
const eventThumbnails = require('../helpers/event-thumbnails');
const verifylogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/login')
  }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  thumbMovies.getAllThumbnailMovies().then((movthumb)=>{
    eventThumbnailsHelpers.getAllThumbnailEvents().then((thumbevent)=>{
      sportsThumbnail.getAllThumbnailSports().then((thumbsports)=>{
        moviesHelpers.getAllMovies().then((movies)=>{
          res.render('user/view-program',{movies,movthumb,thumbsports,thumbevent,user,admin:false})
        })
       
      })
   
    })
  })

 
   
      })
  
router.get('/movies',verifylogin,(req,res)=>{
  thumbMovies.getAllThumbnailMovies().then((movthumb)=>{
  moviesHelpers.getAllMovies().then((movies)=>{
    let user=req.session.user
    console.log(movies);
  res.render('user/movies',{movthumb,movies,user})
})
  })
})
router.get('/events',verifylogin,(req,res)=>{
  eventsHelpers.getAllEvents().then((events)=>{
    let user=req.session.user
    console.log(events);
  res.render('user/events',{events,user})
})
})
router.get('/sports',verifylogin,(req,res)=>{
  sportsHelpers.getAllSports().then((sports)=>{
    let user=req.session.user
    console.log(sports);
    res.render('user/sports',{sports,user})
})
})
router.get('/signup',(req,res)=>{
  res.render('user/signup')
})
router.post('/signup',(req,res)=>{
  userHelpers.doSignup(req.body).then((response)=>{
    console.log(response);
    req.session.loggedIn=true
    req.session.user=response
    res.redirect('/')
  })
  })
  router.get('/login',(req,res)=>{
    if(req.session.loggedIn){
      res.redirect('/')
    }else{
      
    res.render('user/login',{"loginErr":req.session.loginErr})
    req.session.loginErr=false
   }
  
  })
  router.post('/login',(req,res)=>{
    userHelpers.doLogin(req.body).then((response)=>{
      if(response.status){
        req.session.loggedIn=true
        req.session.user=response.user
      res.redirect('/')
      }else{
        req.session.loginErr=true
        res.redirect('/login')
      } 
    })
  })
  router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/')
  })
  router.get('/cart',verifylogin,async (req,res)=>{
    let user=req.session.user
    let movies=await userHelpers.getCartTickets(req.session.user._id)
    console.log(movies)
    res.render('user/cart')
  })
  router.get('/tickets/:id',verifylogin,(req,res)=>{
    let user=req.session.user
    userHelpers.bookMovieTicket(req.params.id,req.session.user._id).then(()=>{
      res.redirect('/')
    })
    
    
  })
  router.get('/book/:id',verifylogin,async (req,res)=>{
    let movie=await moviesHelpers.getMoviesDetails(req.params.id)
    console.log(movie);
    res.render('user/book',{movie})

    router.get('/movieboked/:id',async  (req,res)=>{
      let moviebook=await moviesHelpers.getMoviesDetails(req.params.id)
      res.render('user/movieboked',{moviebook})
    })
  })
  router.get('/book2/:id',verifylogin,async (req,res)=>{
    let events=await eventsHelpers.getEventsDetails(req.params.id)
    console.log(events);
    res.render('user/book2',{events})

    router.get('/eventsbook/:id',async  (req,res)=>{
      let eventsbook=await eventsHelpers.getEventsTicketDetails(req.params.id)
      console.log(eventsbook);
      res.render('user/movieboked',{eventsbook})
    })
  })
  router.get('/book3/:id',verifylogin,async (req,res)=>{
    let sports=await sportsHelpers.getSportsDetails(req.params.id)
    console.log(sports);
    res.render('user/book3',{sports})

    router.get('/sportsbook/:id',async  (req,res)=>{
      let sportsbook=await sportsHelpers.getSportsTicketDetails(req.params.id)
      
      console.log(sportsbook);
      res.render('user/movieboked',{sportsbook})
    })
  })
  router.get('/book4/:id',verifylogin,async (req,res)=>{
    let tmovies=await thumbmoviesHelpers.getTMoviesDetails(req.params.id)
    console.log(tmovies);
    res.render('user/book4',{tmovies})
  })
  router.get('/tmoviesbook/:id',verifylogin,async (req,res)=>{
    let tmoviesbook=await thumbmoviesHelpers.getTMoviesTicketDetails(req.params.id)
    console.log(tmoviesbook);
    res.render('user/movieboked',{tmoviesbook})
  })
  router.get('/book5/:id',verifylogin,async (req,res)=>{
    let tevents=await eventThumbnails.getTEventsDetails(req.params.id)
    console.log(tevents);
    res.render('user/book5',{tevents})
  })
  router.get('/teventsbook/:id',verifylogin,async (req,res)=>{
    let teventsbook=await eventThumbnails.getTEventsTicketDetails(req.params.id)
    console.log(teventsbook);
    res.render('user/movieboked',{teventsbook})
  })
  router.get('/book6/:id',verifylogin,async (req,res)=>{
    let tsports=await sportsThumbnail.getTSportsDetails(req.params.id)
    console.log(tsports);
    res.render('user/book6',{tsports})
  })
  router.get('/tsportsbook/:id',verifylogin,async (req,res)=>{
    let tsportsbook=await sportsThumbnail.getTSportsTicketDetails(req.params.id)
    console.log(tsportsbook);
    res.render('user/movieboked',{tsportsbook})
  })
module.exports = router;
