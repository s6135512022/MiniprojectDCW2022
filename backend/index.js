
const express = require('express'),
app = express(),
passport = require('passport'),
port = process.env.PORT || 80,
cors = require('cors'),
cookie = require('cookie')
const bcrypt = require('bcrypt')
const { json } = require('express')
const db = require('./database.js')
let users = db.users

let portfolio = {
    list: [
        { id: 1, list: "Clean the Park", sdate: "18 December 2021", doff: "20 December 2021", detail: "I sweep the leaves in the park" }
    ]
}

require('./passport.js')
const router = require('express').Router(),
jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.post('/login', (req, res, next) => {
passport.authenticate('local', { session: false }, (err, user, info) => {
    console.log('Login: ', req.body, user, err, info)
    if (err) return next(err)
    if (user) {
        const token = jwt.sign(user, db.SECRET, {
            expiresIn: '1d'
        })
        // req.cookie.token = token
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60,
                sameSite: "strict",
                path: "/",
            })
        );
        res.statusCode = 200
        return res.json({ user, token })
    } else
        return res.status(422).json(info)
})(req, res, next)
})

router.get('/logout', (req, res) => {
res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: -1,
        sameSite: "strict",
        path: "/",
    })
);
res.statusCode = 200
return res.json({ message: 'Logout successful' })
})

/* GET user profile. */
router.get('/profile',
passport.authenticate('jwt', { session: false }),
(req, res, next) => {
    res.send(req.user)
});

router.route('/problems')
.get((req, res) => res.json(problems))


router.post('/problems',
// passport.authenticate('jwt', { session: false }),
(req, res) => {
    try {

        let newProblem = {}
        newProblem.id = (problems.list.length) ? problems.list[problems.list.length - 1].id + 1 : 1
        newProblem.fname = req.body.fname;
        newProblem.surname = req.body.surname;
        newProblem.room = req.body.room;
        newProblem.pb = req.body.pb;

        problems = { "list": [...problems.list, newProblem] }
        res.json(problems)
    }
    catch
    {
        res.json({ status: "Add Fail" })
    }



})
router.route('/problems/:std_id')
.get((req, res) => {

    let ID = problems.list.findIndex( item => (item.id === +req.params.std_id))
    if(ID >= 0)
    {
        res.json(problems.list[ID])
    }
    else
    {
        res.json({status: "Error can't find!"})
    }

})

.put( (req,res) => { 

    let ID = problems.list.findIndex( item => ( item.id === +req.params.std_id))
    
    if( ID >= 0)
    {
        problems.list[ID].fname = req.body.fname
        problems.list[ID].surname = req.body.surname
        problems.list[ID].room = req.body.room
        problems.list[ID].pb = req.body.pb
        
        res.json(problems)


    }
    else
    {
        res.json({status: "Error can't find!"})
    }
        
})

.delete((req, res) => {

    let ID = problems.list.findIndex( item => ( item.id === +req.params.std_id))

    if(ID>=0)
    {
        problems.list = problems.list.filter( item => item.id !== +req.params.std_id)
        res.json(problems)
    }
    else
    {
        res.json({status: "Error can't find!"})
    }

})


router.post('/register',
async (req, res) => {
    try {
        const SALT_ROUND = 10
        const { username, email, password } = req.body
        if (!username || !email || !password)
            return res.json({ message: "Cannot register with empty string" })
        if (db.checkExistingUser(username) !== db.NOT_FOUND)
            return res.json({ message: "Duplicated user" })

        let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
        hash = await bcrypt.hash(password, SALT_ROUND)
        users.users.push({ id, username, password: hash, email })
        res.status(200).json({ message: "Register success" })
    } catch {
        res.status(422).json({ message: "Cannot register" })
    }
})

router.get('/alluser', (req, res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
res.send('Respond without authentication');
});

// Error Handler
app.use((err, req, res, next) => {
let statusCode = err.status || 500
res.status(statusCode);
res.json({
    error: {
        status: statusCode,
        message: err.message,
    }
});
});

// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))

