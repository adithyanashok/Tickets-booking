var db=require('../config/connection')
var collection=require('../config/collections')
var objectId = require('mongodb').ObjectID
module.exports={

    addThumbnailSports:function(thumbsports,callback){
        console.log(thumbsports);

        db.get().collection('thumbsports').insertOne(thumbsports).then((data)=>{

            callback(data.ops[0]._id)

        })
    },
    getAllThumbnailSports:()=>{
        return new Promise(async(resolve,reject)=>{
            let thumbsports=await db.get().collection(collection.THUMB_SPORTS).find().toArray()
            resolve(thumbsports)
        })
    },
    deleteTsports:(tsportsId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.THUMB_SPORTS).removeOne({_id:objectId(tsportsId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getTSportsDetails:(tsportsId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.THUMB_SPORTS).findOne({_id:objectId(tsportsId)}).then((tsports)=>{
                resolve(tsports)
            })
        })
    },
    getTSportsTicketDetails:(tsportsId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.THUMB_SPORTS).findOne({_id:objectId(tsportsId)}).then((tsportsbook)=>{
                resolve(tsportsbook)
            })
        })
    },
}