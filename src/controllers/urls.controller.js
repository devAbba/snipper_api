const db = require('../database/models');

const Url = db.Url

exports.newUrl = async(req, res) => {
    try {
        const { user } = req.session.passport
        const { full } = req.body

        const short = await Url.create({full, userId: user})
        await db.Analytics.create({urlId: short.id})
        if (short){
            res.status(201).json({
                status: true,
                short
            })
        }
    } 
    catch (error){
        console.log(error)
    }
}

exports.getUrl = async(req, res) => {
    try {
        const { short } = req.params;
        
        const url = await Url.findOne({where: {short: short}, 
            include: [
                {   
                    model: db.Analytics,
                    as: 'analytics'
                },
            ]
        })
        if (url){
            const analyticsId = url.analytics.id
            const { clicks } = url.analytics

            await db.Analytics.update({clicks: clicks + 1}, { 
                where: { id: analyticsId}
            })

            res.redirect(url.full)
        }
        else {
            res.status(404).json({
                status: false,
                message: "resource not found"
            })
        }
        
    }
    catch(error){
        console.log(error)
    }
    
}


exports.allUrl = async (req, res) => {
    try { 
        const allUrls = await Url.findAll({
            include: [
                {
                    model: db.User,
                    as: 'author'
                },
                {
                    model: db.Analytics,
                    as: 'analytics'
                }
            ]
        })
        res.json({status: true, allUrls})
    }
    catch (error){
        console.log(error)
    }
    
}

exports.userUrls = async (req, res) => {
    try {
        const { user } = req.session.passport
        const urls = await Url.findAll({where : {userId: user}, 
            include: [
                {
                    model: db.Analytics,
                    as: 'analytics'
                }
            ]
        })
        if (urls){
            res.json({
                status: true,
                urls
            })
        }
    }
    catch(error){
        console.log(error)
    }
}