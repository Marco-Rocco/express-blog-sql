const connection = require('../data/db')

//mostra tutti gli elementi
function index(req, res) {

    const sql = 'SELECT * FROM posts'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Post non tovato' });
        res.json(results);
    })
};

//mstra solo elemento desiderato
function show(req, res) {
    console.log('showing details for post ' + req.params.id);

    const id = parseInt(req.params.id);

    const result = connection.find((post) => {
        return post.id === id;
    });

    if (!result) {
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

    connection.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        res.sendStatus(204)
    });
}

//crea nuovo elemento
function store(req, res) {

    const newId = connection[connection.length - 1].id + 1

    const newPost = {
        id: newId,
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags
    }

    connection.push(newPost);

    console.log(connection);

    res.status(201);
    res.json(newPost);
}

function update(req, res) {
    console.log('modifying post ' + req.params.id);

    const id = parseInt(req.params.id);

    const result = connection.find((post) => {
        return post.id === id;
    });

    if (!result) {
        res.status(404);

        return res.json({
            status: 404,
            error: 'not found',
            message: 'elemento non trovato'
        })
    }

    result.title = req.body.title;
    result.content = req.body.content;
    result.tags = req.body.tags;

    console.log(connection)

    res.json(result)
};


module.exports = {
    index,
    show,
    destroy,
    store,
    update
}