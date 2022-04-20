import Head from 'next/head'
import Layout from '../components/layout'
import { useState, useEffect } from 'react'
import Header from '../components/header'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import config from '../config/config'

export default function Login({ token }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('')

    const login = async (req, res) => {
        try {
            let result = await axios.post(`${config.URL}/login`,
                { username, password },
                { withCredentials: true })
            console.log('result: ', result)
            console.log('result.data:  ', result.data)
            console.log('token:  ', token)
            localStorage.setItem('accessToken', result.data.token)
            setStatus(result.status)
        }
        catch (e) {
            console.log('error: ', JSON.stringify(e.response))
            setStatus(JSON.stringify(e.response).substring(0, 80) + "...")
        }
    }

    const loginForm = () => (
        <div class="login-box">
            <h1>Login</h1><br></br>
            <form>
                <div class="user-box">
                    <input type="text"
                        name="" required=""
                        onChange={(e) => setUsername(e.target.value)}></input>
                    <label>Username</label>
                </div>
                <div class="user-box">
                    <input type="password"
                        name="" required="" onChange={(e) => setPassword(e.target.value)}></input>
                    <label>Password</label>
                        Status:  {status}
                </div >
                <a onClick={login}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                         Login
                    </a>


            </form>
        </div>
    )

    const copyText = () => {
        navigator.clipboard.writeText(token)
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <Header />
            <br></br>
            {loginForm()}
        </Layout>
    )
}

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}
