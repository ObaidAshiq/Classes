exports.getFeeds = (req,res,next)=>{
    console.log(req)
    res.status(200).json({
        posts:[
            {title:' My first Feed',description:'My first Feed from 2024'}
        ]
    })
}

exports.postFeeds = (req,res,next)=>{
    const title= req.body.title
    const description= req.body.description

    // DB 
    res.status(201).json({message:`POst was created successfully with tilte ${title} and Descripion ${description}`,})
}


// const postFD = (req, res, next)=>{

// }
// module.exports.postFeeds = postFD`