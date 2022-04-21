import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import useSWR, { mutate } from 'swr';

const URL = `http://localhost/api/Portfolios`;
const fetcher = url => axios.get(url).then(res => res.data);

export default function Home({ token }) {

  const { data } = useSWR(URL, fetcher);
  const [max, setMax] = useState(10000);
  const [name, setName] = useState('');
  if (!data) {
    console.log(data);
    return <div><h1>Please wait...</h1></div>
  }

  const printPortfolios = (data) => {
    if (max == 0 || max == '')
      setMax(10000)
    if (data && data.length) {
      if (name != '') {
        let Name = data.filter((item) => item.name.includes(name));
   
        return Name.map((item, index) => {
          return (
            <div className={styles.listItem} key={index}>
              <div><b>Title:</b> {item.name}</div>
              <div><b>StartDate:</b> {item.sdate} </div>
              <div><b>DayOff:</b> {item.doff}</div>
              <div><b>Detail:</b> {item.detail}</div>
              <div>
              </div>
              <br></br>
            </div>
          );
        });
      }
      else {

        return data.map((item, index) => {
          return (
            <div className={styles.listItem} key={index}>
              <div><b>Title:</b> {item.name}</div>
              <div><b>StartDate:</b> {item.sdate} </div>
              <div><b>DayOff:</b> {item.doff}</div>
              <div><b>Detail:</b> {item.detail}</div>
              <div>
              </div>
              <br></br>
            </div>
          );
        });
      }
    }
    else {
      return <p>Please wait...</p>;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Home Page</title>
      </Head>
      <div className={styles.container}>
        <Navbar />
        <br></br>
        <h1>PORTFOLIO</h1>
        <div>ค้นหาผลงาน :
        <input type="text" placeholder="ชื่อผลงาน" onChange={(e) => setName(e.target.value)}></input>
        </div>
        <div className={styles.list}>
          {printPortfolios(data.list)}
        </div>
      </div>
    </Layout>
  )
}


