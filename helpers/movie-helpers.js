var db=require('../config/connection')
var collection=require('../config/collections')
var objectId = require ('mongodb').ObjectID
module.exports={
    addMovies:function(movies,callback){
        console.log(movies);
        db.get().collection('movies').insertOne(movies).then((data)=>{
            callback(data.ops[0]._id)
        })
    },
    getAllMovies:()=>{
        return new Promise(async(resolve,reject)=>{
            let movies=await db.get().collection(collection.MOVIES_COLLECTION).find().toArray()
            resolve(movies)
        })
    },
    deleteMovies:(moviesId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.MOVIES_COLLECTION).removeOne({_id:objectId(moviesId)}).then((response)=>{
                resolve(response)
            })
        })
       
    },
    getMoviesDetails:(moviesId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.MOVIES_COLLECTION).findOne({_id:objectId(moviesId)}).then((movie)=>{
                resolve(movie)
            })
        })
    },
    getMoviesTicketDetails:(moviesId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.MOVIES_COLLECTION).findOne({_id:objectId(moviesId)}).then((moviebook)=>{
                resolve(moviebook)
            })
        })
    },
    updateMovies:(moviesId,moviesDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.MOVIES_COLLECTION)
            .updateOne({_id:objectId(moviesId)},{
                $set:{
                    Name:moviesDetails.Name,
                    price:moviesDetails.price,
                }
            }).then((response)=>{
                resolve()
            })
        })
    },
    
}