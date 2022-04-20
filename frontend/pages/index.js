import Head from 'next/head'
import Layout from '../components/layout'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
//import withAuth from '../components/withAuth'
//import config from '../config/config'
import useSWR, { mutate } from 'swr';

const URL  = `http://localhost/api/Portfolios`;
const fetcher = url => axios.get(url).then(res => res.data);

export default function Home({ token }) {
  
 const {data} = useSWR(URL,fetcher);
 const [max, setMax] = useState(10000);
 const [min, setMin] = useState(0);
 const [name, setName] = useState('');
if (!data) {
      console.log(data);
      return <div><h1>Please wait...</h1></div>
 }
 const searchWork = (str) => {
    if(str == '')
      setName('')
    else
   {for(let i = 0 ;i <data.list.length;i++)
    {let strtest = data.list[i].name
    let n = strtest.includes(str)
    if(n){
      setName(data.list[i].name)
    }
    }}
 }
 const printPortfolios = (data) => {
  if(max == 0 || max == '')
    setMax(10000)
  if (data && data.length) {
    if(name != ''){
      let   Name = data.filter((item)=>item.name == name);
            Name = Name.filter((item)=>+item.detail>=min);
            Name = Name.filter((item)=>+item.detail<=max);
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
    else
    { 
      let Data = data.filter((item)=>+item.detail>=min);
          Data = Data.filter((item)=>+item.detail<=max);
      return Data.map((item, index) => {
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
    });}
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
        <h1>Portfolios</h1>
        <div>
       ช่วงเวลา : <input type="number" placeholder="startdate" onChange={(e) => setMin(e.target.value)}></input>
      <input type="number" placeholder="dayoff" onChange={(e) => setMax(e.target.value)}></input> ค้นหาผลงาน : 
      <input type="text" placeholder="ชื่อผลงาน" onChange={(e) => searchWork(e.target.value)}></input>    
      </div>
      <div className={styles.list}>
            
      {printPortfolios(data.list)} 
                   
      
                   
        
      </div>
    </div>
</Layout>
  )
}