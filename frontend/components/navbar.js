import Link from 'next/link'
import styles from '../styles/Home.module.css'


const Navbar = () => (
    <div className={styles.nav}>
        <Link href="/"><a> Home </a></Link> |
        <Link href="/portfolio"><a> Add work </a></Link> |
        <Link href="/register"><a> Register </a></Link>  |
        <Link href="/login"><a> Login </a></Link> |
        <Link href="/profile"><a> Profile </a></Link> |
        <Link href="/logout"><a> Logout </a></Link> 
    </div>
)

export default Navbar
