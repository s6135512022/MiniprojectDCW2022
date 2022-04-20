
import { useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import withAuth from '../components/withAuth'
import config from '../config/config'
import axios from 'axios';
import Layout from '../components/layout'
const URL = `http://localhost/api/Portfolios`


const admin = ({ token }) => {
  
    const [Portfolios, setPortfolios] = useState({})
    const [portfolio, setPortfolio] = useState({});
    const [name, setName] = useState('');
    const [sdate, setSdate] = useState('');
    const [doff, setDoff] = useState('');
    const [detail, setDetail] = useState(0);
    useEffect(() => {
      getPortfolios();
      profileUser();
    }, []);
    const profileUser = async () => {
        try {
          
          const users = await axios.get(`${config.URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
         
          setUser(users.data);
        } catch (e) {
          console.log(e);
        }
      };
    

const getPortfolios = async () => {
        let portfolio = await axios.get(URL)
        setPortfolios(portfolio.data)
    
}
const getportfolio = async (id) => {
        let portfolio = await axios.get(`${URL}/${id}`);
        setPortfolio(portfolio.data)
}
      const addportfolio = async (name, sdate, doff ,detail) => {
        let portfolio = await axios.post(URL, { name, sdate, doff ,detail})
        console.log(portfolio.data);
        getPortfolios();
       
      }
      const updateportfolio = async (id) => {
        let portfolio = await axios.put(`${URL}/${id}`, { name, sdate, doff ,detail })
        setPortfolios(portfolio.data)
        getPortfolios();
      }
    
      const deleteportfolio = async (id) => {
        let portfolio = await axios.delete(`${URL}/${id}`, { name, sdate, doff ,detail })
        getPortfolios();
      }
    
      const printPortfolios = () => {
        if (Portfolios.list && Portfolios.list.length) {
            return Portfolios.list.map((item, index) => {
              return (
                <div className={styles.listItem} key={index}>
                   
                  <b> {index+1}.) Title:</b>{item.name}  <br />
                  <b>StartDate:</b> {item.sdate} <br />
                  <b>DayOff:</b> {item.doff} <br />
                  <b>Detail:</b> {item.detail} <br />
                  <div >
                    <button onClick={() => getportfolio(item.id)} >
                      Get
                    </button>
                    <button onClick={() => updateportfolio(item.id)} >
                      Update
                    </button>
                    <button onClick={() => deleteportfolio(item.id)}>
                      Delete
                    </button>
                  </div>
                  <br></br>
                </div>
              );
            });
          } else {
            return <p>Loading...</p>;
          }
        };


    return (
      <Layout>
            <div className={styles.container}>
                <Navbar />
            <h1>My Portfolio</h1>
            <div>
            Title : {portfolio.name}<br/>
            StartDate : {portfolio.sdate}<br/>
            DayOff : {portfolio.doff}<br/>
            Detail : {portfolio.detail}
            </div>
            <h2>Add Work or Training</h2>
            Name:<input type="text" onChange={(e) => setName(e.target.value)}/>
            StartDate:<input type="text" onChange={(e) => setSdate(e.target.value)}/>
            DatOff:<input type="text" onChange={(e) => setDoff(e.target.value)}/>
            Detail:<input type="number" onChange={(e) => setDetail(e.target.value)}/>
            <br></br>
             
            <button className={styles.buttoncolor} onClick={() => addportfolio(name, sdate, doff, detail)}>Add</button>
            
            <h3>My portfolio</h3>
            <div className={styles.list}>{printPortfolios()}</div>
            </div>
            </Layout>
        )
        
};
      
    
export default withAuth(admin)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}


