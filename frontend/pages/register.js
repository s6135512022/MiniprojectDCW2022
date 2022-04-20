
import { useState } from 'react'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import axios from 'axios'
import config from '../config/config'


export default function Register({ token }) {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const profileUser = async () => {
        console.log('token: ', token)
        const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log('user: ', users.data)
    }

    const register = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/register`,
                { username, email, password })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            setStatus(result.data.message)
        }
        catch (e) {
            console.log(e)
        }

    }

    const registerForm = () => (
        <div class="login-box">
            <form>
                <h1>Register</h1>
                <div class="user-box">
                    <input type="text"
                        name="username"
                        required=""
                        onChange={(e) => setUsername(e.target.value)} />
                    <label>Username</label>
                </div>
                <div class="user-box">
                    <input type="text"
                        name="email"
                        required=""
                        onChange={(e) => setEmail(e.target.value)} />
                    <label>Email</label>
                </div>
                <div class="user-box">
                    <input type="password"
                        name="password" required="" onChange={(e) => setPassword(e.target.value)}></input>
                    <label>Password</label> 
                    <br />
                        Status:  {status}
                </div> 
                <a onClick={register} href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                         Submit
                    </a>

            </form>
        </div>
    )


    return (
        <Layout>
            <Head>
                <title>Register</title>
            </Head>
            <Header /> 
              <br></br>                       
            {registerForm()}                    
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
