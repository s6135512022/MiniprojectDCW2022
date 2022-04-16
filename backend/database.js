const bcrypt = require('bcrypt')

let users = {
    users: [
        { id: 1, username: 'warodom', password: '$2b$10$0AsMSQaUB0AlLnKzgeUOfOE.hWUodtuR4NOU954XLVy2gy3lBWsdO', email: 'wwarodom@gmail.com' },
        { id: 2, username: 'john', password: '$2b$10$1Bu4tImM/Ms9rtU.8/n/COWpzUAGFB6YlsO5xZqFih1JUxafyFFXa', email: 'john@gmail.com' },
    ]
}

let students = {
    students: [
        { id: 1, fname: "Sittisak", surname: "Kummee", major: "CoE", gpa: 2.5 }
    ]
}

const SECRET = 'your_jwt_secret'
const NOT_FOUND = -1

exports.users = users 
exports.students = students
exports.SECRET = SECRET
exports.NOT_FOUND = NOT_FOUND

exports.setStudents = function(_students) {
    students = _students;
}

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