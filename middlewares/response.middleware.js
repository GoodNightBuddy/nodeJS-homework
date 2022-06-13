const responseMiddleware = (req, res, next) => {
    // TODO: Implement middleware that returns result of the query
    if (res.data && !res.err) {
        res.status(200).send(JSON.stringify(res.data))
    } else {
        if(res.err.message.match(/not found/)) {
            res.status(404).send(JSON.stringify({error: true, message: res.err.message}))
        }else {
            res.status(400).send(JSON.stringify({error: true, message: res.err.message})) 
        }
        console.log(res.err)
    }

}

exports.responseMiddleware = responseMiddleware;