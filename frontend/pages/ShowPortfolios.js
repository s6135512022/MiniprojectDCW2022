import Layout from "../components/layout"
import AuthStudents from "../components/AuthStudent"
import Header from '../components/header'
import axios from 'axios'
import { useState, useEffect } from "react"

import config from '../config/config'

const URL = `${config.URL}/portfolios`
const ShowPortfolios = ({ token }) => {

    const [portfolios, setPortfolios] = useState({
        list: [
            { id: 1, title: "Clean the Park", sdate: "18 December 2021", doff: "20 December 2021", detail: "I sweep the leaves in the park" }
        ]
    })

    useEffect(() => {

        getPortfolios()
    }, [])

    const getPortfolios = async () => {

        let portfolio = await axios.get(`${config.URL}/portfolios`)
        setPortfolios(portfolio.data)

    }

    const printPortfolios = () => {
        if (portfolios.list && portfolios.list.length)

            return portfolios.list.map((item, index) =>
            (<li key={index}>
                หัวข้อ: {item.title}<br></br>
                วันที่เริ่ม: {item.sdate}<br></br>
                วันสิ้นสุด: {item.doff}<br></br>
                รายละเอียด: {item.detail}<br></br>
            </li>)
            )
    }

    return (
        <Layout>
            <div >
                <Header />
                <br></br>

                {JSON.stringify(portfolios.portfolios)}
                <ul>
                    <h1>
                        Please Log in
                    </h1>

                </ul>
            </div>
        </Layout>
    )
}

export default AuthStudents(ShowPortfolios)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}