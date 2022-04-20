import Head from 'next/head'
import Layout from '../components/layout'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import withAuth from '../components/withAuth'
import config from '../config/config'
import Header from '../components/header'


const Profile1 = ({ token }) => {

    const [user, setUser] = useState({})

    useEffect(() => {
        profileUser()
    }, [])

    const profileUser = async () => {
        try {          
            const users = await axios.get(`${config.URL}/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            })          
            setUser(users.data)
        }
        catch (e) {
            console.log(e)
        }

    }
 
    return (
        <Layout>
            <Head>
                <title>Profile</title>
            </Head>
            <div >
                <Header />
                <div className={styles.profile}>
                <h1>Profile</h1>
                <div>
                <h2>    Username is <br></br>
                    {JSON.stringify(user.username)}</h2>
                </div>
                </div>
            </div>
        </Layout>
    )
}

export default withAuth(Profile1)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}