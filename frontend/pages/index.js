import Head from 'next/head'
import { useState, useEffect } from "react"
import axios from 'axios'
import config from '../config/config'
import Layout from '../components/layout'
import Header from '../components/header'
import styles from '../styles/Home.module.css'
import { Table, Card, Alert } from 'antd'
export default function Home({ token }) {
  useEffect(() => {
    getPortfolios()
  }, [])
  const [portfolios, setPortfolios] = useState({
  })
  const getPortfolios = async () => {

    let portfolio = await axios.get(`${config.URL}/portfolios`)
    setPortfolios(portfolio.data)

  }
  const dataSource = portfolios['list']
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Startdate',
      dataIndex: 'startdate',
      key: 'startdate',
    },
    {
      title: 'Dayoff',
      dataIndex: 'doff',
      key: 'doff',
    },
    {
      title: 'Detail',
      dataIndex: 'detail',
      key: 'detail',
    },

  ];

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div >
        <Header />
        <div className={styles.title}>My Portfolio<br></br>
          <div style={{ textAlign: 'left' }}>ผลงานทั้งหมด</div>
        </div>
        <Card style={{ marrgin: 10 }}>
          <Table
            style={{ fontSize: 18 }}
            dataSource={dataSource}
            columns={columns}
            pagination={false}>
          </Table>
        </Card>
      </div>
    </Layout>
  )
}
