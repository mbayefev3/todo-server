const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')
const bcrypt = require('bcrypt');
const knex = require('knex');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const app = express()

app.use(bodyParser.json())
app.use(cors())


const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: 'test',
        database: 'smart-brain'
    }
});




app.get('/', (req, res) => {

    res.send('working')
})


app.post('/register', (req, res) => {

    const { email, name, password } = req.body

    const hash = bcrypt.hashSync(password, saltRounds)
    console.log(hash)



    // Using trx as a query builder:
    // knex.transaction(function(trx) {

    //     const books = [
    //       {title: 'Canterbury Tales'},
    //       {title: 'Moby Dick'},
    //       {title: 'Hamlet'}
    //     ];

    //     return trx
    //       .insert({name: 'Old Books'}, 'id')
    //       .into('catalogues')
    //       .then(function(ids) {
    //         books.forEach((book) => book.catalogue_id = ids[0]);
    //         return trx('books').insert(books);
    //       });
    //   })


    // db.transaction(trx => {

    //     trx.insert({
    //         email,
    //         hash: hash
    //     }).into('login')
    // }).then(trx => {
    //     trx.commit
    // })



    res.json({
        email, name, password
    })
})

app.listen(5000, () => {

    console.log('listening on port 5000')
})

