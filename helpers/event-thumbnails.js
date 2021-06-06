var db=require('../config/connection')
var collection=require('../config/collections');
const { ObjectId } = require('bson');
var objectId= require('mongodb').ObjectID
module.exports={

    addThumbnailsEvents:function(thumbevent,callback){
        console.log(thumbevent);

        db.get().collection('thumbevent').insertOne(thumbevent).then((data)=>{

            callback(data.ops[0]._id)

        })
    },
    getAllThumbnailEvents:()=>{
        return new Promise(async(resolve,reject)=>{
            let thumbevent=await db.get().collection(collection.THUMB_EVENTS).find().toArray()
            resolve(thumbevent)
        })
    },
    getTEventsDetails:(teventsId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.THUMB_EVENTS).findOne({_id:objectId(teventsId)}).then((tevents)=>{
                resolve(tevents)
            })
        })
    },
    getTEventsTicketDetails:(teventsId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.THUMB_EVENTS).findOne({_id:objectId(teventsId)}).then((teventsbook)=>{
                resolve(teventsbook)
            })
        })
    },
    deleteTevents:(teventsId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.THUMB_EVENTS).removeOne({_id:ObjectId(teventsId)}).then((response)=>{
                resolve(response)
            })
        })
    }
}
