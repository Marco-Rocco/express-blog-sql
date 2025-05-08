const posts = require('../data/postsArray')

//mostra tutti gli elementi
function index(req, res) {
    
    console.log('response was sent for /routers');
    console.log(req.query);

    erroreFittizio()

    let filteredPosts = posts;

    // console.log(req.query.tags)

    if(req.query.tags) {
        filteredPosts = posts.filter(post => post.tags.includes(req.query.tags))
    
    }

    res.json(filteredPosts)
};

//mstra solo elemento desiderato
function show(req, res) {
    console.log('showing details for post ' + req.params.id);

    const id =  parseInt(req.params.id);

    const result = posts.find((post) => {
        return post.id === id;
    });

    if(!result) {
        res.status(404);

        return res.json({
            status: 404,
            error: 'not found',
            message: 'elemento non trovato'
        })
    }

    res.json(result)
};

//elimina elemento
function destroy(req, res) {
    const id = parseInt(req.params.id);

    const result = posts.find((post) => {
        return post.id === id;
    });

    if(!result) {
        res.status(404);

        return res.json({
            status: 404,
            error: 'not found',
            message: 'elemento non trovato'
        })
    }

    posts.splice(posts.indexOf(result), 1);

    console.log(posts)
    //res.sendStatus è quello ch3e fornisce il messaggio, se scrivi solo status carica all'infinito
    //status 204 indica che l'operazione è andata a buon fine
    res.sendStatus(204)
}

//crea nuovo elemento
function store(req, res) {

    const newId = posts[posts.length -1].id +1

    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags
        }

    posts.push(newPost);
    
    console.log(posts);

    res.status(201);
    res.json(newPost);
}

function update(req, res) {
    console.log('modifying post ' + req.params.id);

    const id =  parseInt(req.params.id);

    const result = posts.find((post) => {
        return post.id === id;
    });

    if(!result) {
        res.status(404);

        return res.json({
            status: 404,
            error: 'not found',
            message: 'elemento non trovato'
        })
    }

    result.title = req.body.title;
    result.content= req.body.content;
    result.tags = req.body.tags;

    console.log(posts)

    res.json(result)
};


module.exports = {
    index,
    show,
    destroy,
    store,
    update
}