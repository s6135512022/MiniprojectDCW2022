import Layout from "../components/layout"
import Header from "../components/header"
import AuthStudents from "../components/AuthStudent"
import styles from "../styles/Home.module.css"
import { Col, Row, Card, Space, Divider } from 'antd'
import axios from 'axios'
import { useState, useEffect } from "react"
import config from '../config/config'
import { Form, Input, Button } from 'antd'


const URL = `${config.URL}/portfolios`
const Portfolios = ({ token }) => {

    const [portfolios, setPortfolios] = useState({
        list: [
            { id: 1, title: "Clean the Park", sdate: "18 December 2021", doff: "20 December 2021", detail: "I sweep the leaves in the park" }
        ]
    })
    const [title, setTitle] = useState('')
    const [sdate, setSdate] = useState('')
    const [doff, setDoff] = useState(0)
    const [detail, setDetail] = useState('')

    useEffect(() => {
        getPortfolios()
    }, [])

    const getPortfolios = async () => {

        let portfolio = await axios.get(`${config.URL}/portfolios`)
        setPortfolios(portfolio.data)

    }

    const updatePortfolio = async (id) => {

        let portfolio = await axios.put(`${URL}/${id}`, { title, sdate, doff, detail })
        setPortfolios(portfolio.data)
    }

    const deletePortfolio = async (id) => {

        let portfolio = await axios.delete(`${URL}/${id}`)
        setPortfolios(portfolio.data)
    }

    const addPortfolio = async (title, sdate, doff, detail) => {

        let portfolio = await axios.post(`${config.URL}/portfolios`,

            { fname, surname, room, pb })
        setPortfolios(portfolio.data)




    }

    const printPortfolios = () => {

        if (portfolios.list && portfolios.list.length)
            return portfolios.list.map((item, index) =>
            (
                <Card title={item.title} className={styles.reporterCard}>
                    <p> วันที่เริ่ม : {item.sdate}</p>
                    <p> วันสิ้นสุด : {item.doff}</p>
                    <p> รายละเอียด : {item.detail}</p>
                    <Button style={{ width: 100, marginRight: 10 }} onClick={() => updatePortfolio(item.id)} type="primary">Update</Button>
                    <Button style={{ width: 100 }} onClick={() => deletePortfolio(item.id)} >Remove</Button>
                </Card>
            )
            )
    }

    return (
        <Layout>

            <Header />
            <div>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                    <Card className={styles.cardform}>
                        <div style={{ fontSize: 24, padding: 10, textAlign: "center" }}>แฟ้มสะสมงาน</div>
                        <Form>
                            <div className={styles.formCrossAxis}>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <Input type="text " style={{ width: 200, marginRight: 5 }} placeholder="ชื่อ" onChange={(e) => setTitle(e.target.value)}></Input>

                                    <Input style={{ width: 200, }} placeholder="สกุล" onChange={(e) => setSdate(e.target.value)}></Input>
                                </div>
                                <Input style={{ marginTop: 5, }} placeholder="ห้อง" onChange={(e) => setDoff(e.target.value)}></Input>
                                <Input style={{ marginTop: 5, marginBottom: 5 }} placeholder="ปัญหา" onChange={(e) => setDetail(e.target.value)}></Input>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", }}>

                                    <Button style={{ width: 80, margin: 5 }} type="primary" onClick={() => addPortfolio(title, sdate, doff, detail)}>เก็บ</Button>

                                    <Button style={{ width: 80, margin: 5 }} type="">ล้าง</Button>

                                </div>
                            </div>
                        </Form>

                    </Card>
                </div>
                <div>
                    <Divider></Divider>
                    <div style={{ textAlign: "center", fontSize: 18, padding: 10 }}>Reporter</div>
                    <div className={styles.cardArea}>
                        {
                            printPortfolios()
                        }
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default AuthStudents(Portfolios)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}