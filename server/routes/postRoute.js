const express = require('express')
const router = express.Router()
const verifyToken = require('../middlewares/authMiddleware')

const Post = require('../models/postModel')


//@route GET api/posts
//@desc GET posts
//@access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        const posts = await Post.find({user: req.userId}).populate('user', ['username']) //.populate('user', ['username']) là chỉ lấy ra username trong trường user của post
        res.json({success: true, posts})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


//@route POST api/posts
//@desc Create post
//@access Private
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body

    //Simple valication
    if (!title)
        return res.status(400).json({ success: false, message: 'Title is required' })

    try {
        const newPost = new Post({
            title,
            description,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        })

        await newPost.save()

        res.json({ success: true, message: 'Happy learning!', post: newPost })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


//@route PUT api/posts/:id
//@desc Update post
//@access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { title, description, url, status } = req.body

    //Simple valication
    if (!title)
        return res.status(400).json({ success: false, message: 'Title is required' })

    try {
        let updatedPost = {
            title,
            description: description || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'TO LEARN'
        }

        const postUpdateCondition = {_id: req.params.id, user: req.userId} //điều kiện để update là phải đúng postId và đúng userId đang login. Lưu ý: req.params.id = '/:id', req.userId=userId được decode trong token

        updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, {new: true}) //{new: true} nghĩa là sau khi update xong nó sẽ gán lại mới nhất cho updatedPost, nếu không sẽ trả lại post cũ

        //User not authorised to update post or post not found
        if (!updatedPost)
            return res.status(401).json({success: false, message: 'Post not found or user not authorised'}) //401 Unauthorized

        //Success
        return res.json({success: true, message: 'Excellent progress!', post: updatedPost})

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


//@route DELETE api/posts/:id
//@desc Update post
//@access Private
router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const postDeleteCondition = {_id: req.params.id, user: req.userId}
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition)

        //User not authorised to update post or post not found
        if (!deletedPost)
            return res.status(401).json({success: false, message: 'Post not found or user not authorised'}) //401 Unauthorized

        //Success
        return res.json({success: true, message: 'Deleted successfully!', post: deletedPost})

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router