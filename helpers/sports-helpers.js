var db=require('../config/connection')
var collection=require('../config/collections');
var objectId = require ('mongodb').ObjectID
const { ObjectId } = require('bson');
module.exports={

    addSports:function(sports,callback){
        console.log(sports);

        db.get().collection('sports').insertOne(sports).then((data)=>{

            callback(data.ops[0]._id)

        })
    },
    getAllSports:()=>{
        return new Promise(async(resolve,reject)=>{
            let sports=await db.get().collection(collection.SPORTS_COLLECTION).find().toArray()
            resolve(sports)
        })
    },
    deleteSports:(sportsId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SPORTS_COLLECTION).removeOne({_id:ObjectId(sportsId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getSportsDetails:(sportsId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SPORTS_COLLECTION).findOne({_id:objectId(sportsId)}).then((sports)=>{
                resolve(sports)
            })

            
        })
    },
    getSportsTicketDetails:(sportsId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.SPORTS_COLLECTION).findOne({_id:objectId(sportsId)}).then((sportsbook)=>{
                resolve(sportsbook)
            })

            
        })
    }
}