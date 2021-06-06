var db=require('../config/connection')
var collection=require('../config/collections');
const { ObjectId } = require('bson');
var objectId = require('mongodb').ObjectID
module.exports={
    addThumbnailMovies:function(movthumb,callback){
        console.log(movthumb);
        db.get().collection('movthumb').insertOne(movthumb).then((data)=>{
            callback(data.ops[0]._id)
        })
    },
    getAllThumbnailMovies:()=>{
        return new Promise(async(resolve,reject)=>{
            let movthumb=await db.get().collection(collection.THUMB_MOVIES).find().toArray()
            resolve(movthumb)
        })
    },
    deleteTmovies:(tmoviesId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.THUMB_MOVIES).removeOne({_id:ObjectId(tmoviesId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getTMoviesDetails:(tmoviesId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.THUMB_MOVIES).findOne({_id:objectId(tmoviesId)}).then((tmovies)=>{
                resolve(tmovies)
            })
        })
    },
    getTMoviesTicketDetails:(tmoviesId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.THUMB_MOVIES).findOne({_id:objectId(tmoviesId)}).then((tmoviesbook)=>{
                resolve(tmoviesbook)
            })
        })
    },
    updateTMovies:(tmoviesId,tmoviesDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.THUMB_MOVIES)
            .updateOne({_id:objectId(tmoviesId)},{
                $set:{
                    Name:tmoviesDetails.Name,
                    price:tmoviesDetails.price,
                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}
