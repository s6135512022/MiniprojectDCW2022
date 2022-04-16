
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

let students = {
    list: [
        { id: 1, fname: "sittisak", surname: "Kummee", major: "CoE", gpa: 2.5 }
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

/* GET user foo. */
router.get('/foo',
    passport.authenticate('jwt', { session: false }),
    (req, res, next) => {
        return res.json({ message: 'foo' })
    });


    router.route('/students')
    .get((req, res) => res.json(students))


router.post('/students',
    // passport.authenticate('jwt', { session: false }),
    (req, res) => {
        try {

            let newStudent = {}
            newStudent.id = (students.list.length) ? students.list[students.list.length - 1].id + 1 : 1
            newStudent.fname = req.body.fname;
            newStudent.surname = req.body.surname;
            newStudent.major = req.body.major;
            newStudent.gpa = req.body.gpa;

            students = { "list": [...students.list, newStudent] }
            res.json(students)
        }
        catch
        {
            res.json({ status: "Add Fail" })
        }



    })
    router.route('/students/:std_id')
    .get((req, res) => {

        let ID = students.list.findIndex( item => (item.id === +req.params.std_id))
        if(ID >= 0)
        {
            res.json(students.list[ID])
        }
        else
        {
            res.json({status: "Student Error can't find!"})
        }

    })

    .put( (req,res) => { 

        let ID = students.list.findIndex( item => ( item.id === +req.params.std_id))
        
        if( ID >= 0)
        {
            students.list[ID].fname = req.body.fname
            students.list[ID].surname = req.body.surname
            students.list[ID].major = req.body.major
            students.list[ID].gpa = req.body.gpa
            
            res.json(students)


        }
        else
        {
            res.json({status: "Student Error can't find!"})
        }
            
    })

    .delete((req, res) => {

        let ID = students.list.findIndex( item => ( item.id === +req.params.std_id))

        if(ID>=0)
        {
            students.list = students.list.filter( item => item.id !== +req.params.std_id)
            res.json(students)
        }
        else
        {
            res.json({status: "Student Error can't find!"})
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

