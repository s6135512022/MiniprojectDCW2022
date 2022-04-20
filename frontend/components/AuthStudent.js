import {
    useRouter
} from 'next/router'
import {
    useEffect
} from 'react'

const AuthStudents = WrappedComponent => {
    const Wrapper = props => {
        const {
            token
        } = props
        const router = useRouter()
        useEffect(() => {
            if (!token && !localStorage.getItem('accessToken'))
                router.push('/ShowProblems')
        }, [token])
        return (< WrappedComponent {
            ...props
        }
        />)
    }
    return Wrapper
}

export default AuthStudents