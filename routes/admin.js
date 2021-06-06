var express = require('express');
var router = express.Router();
var moviesHelpers = require('../helpers/movie-helpers')
var eventsHelpers = require('../helpers/event-helpers')
var sportsHelpers = require('../helpers/sports-helpers');
const thumbmoviesHelpers = require('../helpers/thumbmovies-helpers');
var eventThumbnailsHelpers = require('../helpers/event-thumbnails')
let sportsThumbnail= require('../helpers/sports-thumbnail')
/* GET users listing. */
router.get('/', function(req, res, next) {
  moviesHelpers.getAllMovies().then((movies)=>{
    console.log(movies);
    eventsHelpers.getAllEvents().then((events)=>{
      console.log(events);
      sportsHelpers.getAllSports().then((sports)=>{
        console.log(sports);
        thumbmoviesHelpers.getAllThumbnailMovies().then((movthumb)=>{
          console.log(movthumb);
          eventThumbnailsHelpers.getAllThumbnailEvents().then((thumbevent)=>{
            sportsThumbnail.getAllThumbnailSports().then((thumbsports)=>{
              res.render('admin/view-program',{movies,events,sports,movthumb,thumbsports,thumbevent,admin:true})
            })
            
          })
         
        })
   
      })
  })
})

 
  
  
});

// Add Movies Details
router.get('/add-movies',(req,res)=>{
  res.render('admin/add-movies',{admin:true})

})
router.post('/add-movies',(req,res)=>{
  console.log(req.body);
  console.log(req.files.image)
  moviesHelpers.addMovies(req.body,(id)=>{
    let image=req.files.image
    image.mv('./public/images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-movies',{admin:true})
      }
    })
    
  })

})
router.get('/thumbmovies',(req,res)=>{
   res.render('admin/thumbmovies',{admin:true})
})
router.post('/thumbmovies',(req,res)=>{
  console.log(req.body);
  console.log(req.files.image);
  thumbmoviesHelpers.addThumbnailMovies(req.body,(id)=>{
    let image=req.files.image
    image.mv('./public/images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/thumbmovies',{admin:true})
      }
    })
  })
})
// Add Events Details

router.get('/add-events',(req,res)=>{
  
    res.render('admin/add-events',{admin:true})
  })
  


router.post('/add-events',(req,res)=>{
  console.log(req.body);
  console.log(req.files.image)
  eventsHelpers.addEvents(req.body,(id)=>{
    let image=req.files.image
    image.mv('./public/images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-events',{admin:true})
      }
    })
    
  })

})
router.get('/thumbevent',(req,res)=>{
  res.render('admin/thumbevent',{admin:true})
})
router.post('/thumbevent',(req,res)=>{
 console.log(req.body);
 console.log(req.files.image);
 eventThumbnailsHelpers.addThumbnailsEvents(req.body,(id)=>{
   let image=req.files.image
   image.mv('./public/images/'+id+'.jpg',(err,done)=>{
     if(!err){
       res.render('admin/thumbevent',{admin:true})
     }
   })
 })
})

// Add Events Details
router.get('/add-sports',(req,res)=>{
  res.render('admin/add-sports',{admin:true})

})
router.post('/add-sports',(req,res)=>{
  console.log(req.body);
  console.log(req.files.image)
  sportsHelpers.addSports(req.body,(id)=>{
    let image=req.files.image
    image.mv('./public/images/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.render('admin/add-sports',{admin:true})
      }
    })
    
  })

})
router.get('/thumbsports',(req,res)=>{
  res.render('admin/thumbsports',{admin:true})
})
router.post('/thumbsports',(req,res)=>{
 console.log(req.body);
 console.log(req.files.image);
 sportsThumbnail.addThumbnailSports(req.body,(id)=>{
   let image=req.files.image
   image.mv('./public/images/'+id+'.jpg',(err,done)=>{
     if(!err){
       res.render('admin/thumbsports',{admin:true})
     }
   })
 })
})
router.get('/delete-event/:id',(req,res)=>{
  let eventId=req.params.id
  console.log(eventId);
  eventsHelpers.deleteEvents(eventId).then((response)=>{
    res.redirect('/admin/')
  })
})
router.get('/delete-movies/:id',(req,res)=>{
  var moviesId=req.params.id
  moviesHelpers.deleteMovies(moviesId).then((response)=>{
    res.redirect('/admin/')
  })
})
router.get('/delete-sports/:id',(req,res)=>{
  var sportsId=req.params.id
  sportsHelpers.deleteSports(sportsId).then((response)=>{
    res.redirect('/admin/')
  })
})
router.get('/delete-tmovies/:id',(req,res)=>{
  var  tmoviesId=req.params.id
  thumbmoviesHelpers.deleteTmovies(tmoviesId).then((response)=>{
    res.redirect('/admin/')
  })
})
router.get('/delete-tevents/:id',(req,res)=>{
  var teventsId=req.params.id
  eventThumbnailsHelpers.deleteTevents(teventsId).then((response)=>{
   res.redirect('/admin/')
  })
})
router.get('/delete-tsports/:id',(req,res)=>{
  var tsportsId=req.params.id
  sportsThumbnail.deleteTsports(tsportsId).then((response)=>{
    res.redirect('/admin/')
  })
})
router.get('/edit-movies/:id',async (req,res)=>{
  let movies=await moviesHelpers.getMoviesDetails(req.params.id)
  console.log(movies);
  res.render('admin/edit-movies',{movies})
})
router.post('/edit-movies/:id',(req,res)=>{
  let id=req.params.id
  moviesHelpers.updateMovies(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.image){
      var image=req.files.image
      image.mv('./public/images/'+id+'.jpg') 
    }
  })
})
router.get('/edit-tmovies/:id',async (req,res)=>{
  let tmovies=await thumbmoviesHelpers.getTMoviesDetails(req.params.id)
  console.log(tmovies);
  res.render('admin/edit-thumbnail-movies',{tmovies})
})
router.post('/edit-tmovies/:id',(req,res)=>{
  let id=req.params.id
  thumbmoviesHelpers.updateTMovies(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.image){
      var image=req.files.image
      image.mv('./public/images/'+id+'.jpg') 
    }
  })
})

module.exports = router;
