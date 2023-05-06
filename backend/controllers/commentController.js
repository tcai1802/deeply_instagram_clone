const { CommentModel } = require("../models")
const { addDoc, collection, getDocs, query, where } = require('firebase/firestore')
const db = require('../config/firebase.config')

const handleAddComment = async (req, res, next) => {
    //let inputComment = CommentModel(req.body)
    //console.log("====", typeof inputComment)
    try {
        await addDoc(collection(db, "comments"), req.body)
        res.json({ "message": "successfully" })
    } catch (error) {
        res.json({ "message": error })
    }

}

const handleShowComment = async (req, res, next) => {
    //console.log(req.params.id)
    try {
        //let citySnapshot =  await getDocs(collection(db, "comments").where("target_id", "==", "644aa389236ad19fb8a222b2").get())
        const qr = query(collection(db, "comments"), where("target_id", "==", req.params.id))
        const commentSnapshot = await getDocs(qr)
        const commentList = commentSnapshot.docs.map(doc => doc.data());
        res.json({ 
            "code": "successfully",
            "data": commentList, 
        })
    } catch (error) {
        res.json({ 
            "code": "failed",
            "data": null 
        })
    }
}


module.exports = {
    handleAddComment,
    handleShowComment
}