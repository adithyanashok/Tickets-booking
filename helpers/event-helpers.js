var db=require('../config/connection')
var collection=require('../config/collections')
var objectId = require ('mongodb').ObjectID
module.exports={

    addEvents:function(events,callback){
        console.log(events);

        db.get().collection('events').insertOne(events).then((data)=>{

            callback(data.ops[0]._id)

        })
    },
    getAllEvents:()=>{
        return new Promise(async(resolve,reject)=>{
            let events=await db.get().collection(collection.EVENTS_COLLECTION).find().toArray()
            resolve(events)
        })
    },
    deleteEvents:(eventId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.EVENTS_COLLECTION).removeOne({_id:objectId(eventId)}).then((response)=>{
                resolve(response)
            })
        })
    },
    getEventsDetails:(eventId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.EVENTS_COLLECTION).findOne({_id:objectId(eventId)}).then((events)=>{
                resolve(events)
            })

            
        })
    },
    getEventsTicketDetails:(eventId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.EVENTS_COLLECTION).findOne({_id:objectId(eventId)}).then((eventsbook)=>{
                resolve(eventsbook)
            })

            
        })
    }
}
