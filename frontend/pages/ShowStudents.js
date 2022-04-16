import Layout from "../components/layout"
import Navbar from "../components/navbar"
import AuthStudents from "../components/AuthStudent"
import Styles from "../styles/Home.module.css"
import axios from 'axios'
import { useState, useEffect } from "react"

import config from '../config/config'

 const URL = `${config.URL}/students`
const ShowStudents = ({token}) => {

    const [students, setStudents] = useState({
        list: [
            { id: 1, fname: "Pai", surname: "Thanida", major: "CoE", gpa: 2.64 }
        ]
    })

    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = async () => {

        let student = await axios.get(`${config.URL}/students`)
        setStudents(student.data)

    }

    const printStudents = () => {
        if (students.list && students.list.length)

            return students.list.map((item, index) =>
            (<li key={index}>
                name: {item.fname},
                surname: {item.surname},
                major: {item.major},
                gpa: {item.gpa}
            </li>)
            )
    }

    return (
        <Layout>
            <div className={Styles.container}>
                <Navbar />
                <br></br>
                {JSON.stringify(students.students)}
                <ul>
                    {printStudents()}
                </ul>
            </div>
        </Layout>
    )
}

export default AuthStudents(ShowStudents)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}