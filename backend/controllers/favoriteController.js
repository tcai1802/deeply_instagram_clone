const { CommentModel } = require("../models")
const { addDoc, collection, getDocs, query, where, deleteDoc, and, updateDoc} = require('firebase/firestore')
const db = require('../config/firebase.config')

const handleFavoriteOrNot = async (req, res, next) => {
    //let inputComment = CommentModel(req.body)
    //console.log("====", typeof inputComment)
    try {
        const qr = query(collection(db, "favorites"),and(where("target_id", "==", req.params.id), where('user_id', "==", req.body.user_id)))
        const favoriteSnapshot = await getDocs(qr)
        if(!favoriteSnapshot.empty) {
            favoriteSnapshot.docs.forEach((doc) => {
                //console.log("Doc", doc.ref)
                 deleteDoc(doc.ref);
            })
        }
        else {
            //console.log("Data", favoriteSnapshot.empty)
            await updateDoc(collection(db, "favorites"), req.body)
        }
        res.json({ 
            "code": "successfully",
        })
    } catch (error) {
        res.json({ 
            "code": "failed",
        })
    }

}

const handleShowFavorite = async (req, res, next) => {
    //console.log(req.params.id)
    try {
        //let citySnapshot =  await getDocs(collection(db, "comments").where("target_id", "==", "644aa389236ad19fb8a222b2").get())
        const qr = query(collection(db, "favorites"), where("target_id", "==", req.params.id))
        const favoriteSnapshot = await getDocs(qr)
        const dataList = favoriteSnapshot.docs.map(doc => doc.data());
        res.json({ 
            "code": "successfully",
            "data": dataList, 
        })
    } catch (error) {
        res.json({ 
            "code": "failed",
            "data": null 
        })
    }
}


module.exports = {
    handleFavoriteOrNot,
    handleShowFavorite
}