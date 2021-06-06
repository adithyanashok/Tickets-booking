var db=require('../config/connection')
var collection=require('../config/collections')
var bcrypt=require('bcrypt')
var objectId = require ('mongodb').ObjectID
const { response } = require('express')

module.exports={
    doSignup:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data.ops[0])
            })

        })
    },
    doLogin:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log("login success");
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("login failed");
                        resolve({status:false})
                    }
                })
            }else{
                console.log("login failed");
                resolve({status:false})
            }
        })
    },
    bookMovieTicket:(moviesId,userId)=>{
        return new Promise(async (resolve,reject)=>{
            let movieTicket=await db.get().collection(collection.MOVIE_TICKETS).findOne({user:objectId(userId)})
            if(movieTicket){
                db.get().collection(collection.MOVIE_TICKETS)
                .updateOne({user:objectId(userId)},
                {
                    
                        $push:{movies:objectId(moviesId)}
                    
                }
                
                
                ).then((response)=>{
                    resolve()
                })
            }else{
                let ticketObj={
                    user:objectId(userId),
                    movies:[objectId(moviesId)]
                }
                db.get().collection(collection.MOVIE_TICKETS).insertOne(ticketObj).then((response)=>{
                    resolve()
                })

            }
        })
    },
    getCartTickets:(userId)=>{
        return new Promise(async (resolve,reject)=>{
            let cartTicket=await db.get().collection(collection.MOVIE_TICKETS).aggregate([
                
                {
                    $match:{user:objectId(userId)}
                },
                {
                    $lookup:{
                        from:collection.MOVIES_COLLECTION,
                        let:{moviesList:'$movies'},
                        pipeline: [{
                            $match:{
                                $expr:{
                                    $in:['$_id',"$$moviesList"]
                                }
                            }
                        }],
                        as:'cartTicket'
                    }
                }
            ]).toArray()
            resolve(cartTicket)
        })
    }
}