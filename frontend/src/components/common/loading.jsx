import ReactLoading from 'react-loading';

/**
 *
 * @param isLoading
 * @param children
 * @constructor
 */
const Loading = ({isLoading, children}) =>{
    if(isLoading) {
        return <ReactLoading type="spin" color="#ffffff" height={'20%'} width={'20%'} />
    } else {
        return children
    }
}

export default Loading