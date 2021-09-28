import {useState} from 'react'
import ReactLoading from 'react-loading';

const Loading = (props, children) =>{
    const [isLoading, setIsLoading] = useState(false)

    if(isLoading) {
        return <ReactLoading type="spin" color="#ffffff" height={'20%'} width={'20%'} />
    } else {
        return children
    }
}

export default Loading