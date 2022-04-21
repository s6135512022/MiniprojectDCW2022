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
  const [sdate, setSdate] = useState(new Date());
  const [doff, setDoff] = useState(new Date());
  const [detail, setDetail] = useState('');
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
  const getPortfolio = async (id) => {
    let portfolio = await axios.get(`${URL}/${id}`);
    setPortfolio(portfolio.data)
  }
  const addPortfolio = async (name, sdate, doff, detail) => {
    let portfolio = await axios.post(URL, { name, sdate, doff, detail })
    console.log(portfolio.data);
    getPortfolios();

  }
  const updatePortfolio = async (id) => {
    let portfolio = await axios.put(`${URL}/${id}`, { name, sdate, doff, detail })
    setPortfolios(portfolio.data)
    getPortfolios();
  }

  const deletePortfolio = async (id) => {
    let portfolio = await axios.delete(`${URL}/${id}`, { name, sdate, doff, detail })
    getPortfolios();
  }

  const printPortfolios = () => {
    if (Portfolios.list && Portfolios.list.length) {
      return Portfolios.list.map((item, index) => {
        return (
          <div className={styles.listItem} key={index}>

            <b> {index + 1}.) Title:</b>{item.name}  <br />
            <b>StartDate:</b> {item.sdate} <br />
            <b>DayOff:</b> {item.doff} <br />
            <b>Detail:</b> {item.detail} <br />
            <div >
              {/* <button className="mr-4 p-2 bg-red-400 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold font-display transition transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none" onClick={() => getPortfolio(item.id)} >
                Get
              </button> */}
              <button className="p-2 bg-green-500 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold font-display transition transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none" onClick={() => updatePortfolio(item.id)} >
                Update
              </button>
              <button className="p-2 bg-green-500 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold font-display transition transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none" onClick={() => deletePortfolio(item.id)}>
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
        <h1>Add your work or training</h1>
        Title:<input type="text" onChange={(e) => setName(e.target.value)} />
        StartDate:<input type="date" onChange={(e) => setSdate(e.target.value)} />
        DayOff:<input type="date" onChange={(e) => setDoff(e.target.value)} />
        Detail:<input type="text" onChange={(e) => setDetail(e.target.value)} />
        <br></br>

        <button className="p-2 bg-green-500 hover:text-[#EEEEEE] rounded-lg drop-shadow-lg font-bold font-display transition transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:transform-none" onClick={() => addPortfolio(name, sdate, doff, detail)}>ADD</button>

        <div className={styles.list}>{printPortfolios()}</div>
      </div>
    </Layout>
  )

};
export default withAuth(admin)

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}


