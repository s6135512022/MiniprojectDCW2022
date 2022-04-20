const bcrypt = require('bcrypt')

let users = {
    users: [
        { id: 1, username: 'warodom', password: '$2b$10$0AsMSQaUB0AlLnKzgeUOfOE.hWUodtuR4NOU954XLVy2gy3lBWsdO', email: 'wwarodom@gmail.com' },
        { id: 2, username: 'john', password: '$2b$10$1Bu4tImM/Ms9rtU.8/n/COWpzUAGFB6YlsO5xZqFih1JUxafyFFXa', email: 'john@gmail.com' },
    ]
}
let Portfolios = {
    list : [
        {id:1,name:"จิตสาอาช่วยเก็บขยะ",sdate:"18 December 2021",doff :"19 December 2021",detail :"ทำจิตอาสาช่วยเก็บขยะริมหาด"},
        {id:2,name:"อบรม Comptia cloud essentials",sdate:"20 April 2019",doff :"27 April 2019",detail :"อบรม Comptia cloud essentials พร้อมรับ Certificate"},
        {id:3,name:"อบรม Microsoft",sdate:"5 February 2022",doff :"25 February 2022",detail :"อบรม Microsoft Azure"}
    
    ]
    
}
const SECRET = 'your_jwt_secret'
const NOT_FOUND = -1

exports.Portfolios = Portfolios
exports.users = users 
exports.SECRET = SECRET
exports.NOT_FOUND = NOT_FOUND

exports.setUsers = function(_users) { 
  users = _users;
}

// === validate username/password ===
exports.isValidUser = async (username, password) => { 
    const index = users.users.findIndex(item => item.username === username) 
    return await bcrypt.compare(password, users.users[index].password)
}

// return -1 if user is not existing
exports.checkExistingUser = (username) => {
    return users.users.findIndex(item => item.username === username)
}