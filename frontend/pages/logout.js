import Head from 'next/head'
import Layout from '../components/layout'

import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Header from '../components/header'
import axios from 'axios'
import config from '../config/config'

export default function Logout({ token }) {

    const [status, setStatus] = useState('')

    useEffect(() => {
        logout()
    }, [])

    const logout = async () => {
        console.log('remove token: ', token)
        localStorage.removeItem('accessToken')
        let result = await axios.get(`${config.URL}/logout`, { withCredentials: true })
        setStatus("Logout successful")
    }

    return (
        <Layout>
            <Head>
                <title>User profile</title>
            </Head>
            <div className={styles.charecter}>
                <Header />
                <h1>Logout</h1>
                {status}
            </div>
        </Layout>
    )
}
