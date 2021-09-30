import ReactLoading from 'react-loading';

/**
 *
 * @param isLoading
 * @param children
 * @constructor
 */
const Loading = ({isLoading, children}) =>{
    if(isLoading) {
        return <ReactLoading type="spinningBubbles" color="#ffefd5" height={'20%'} width={'20%'} className="mt-32 mx-auto"/>
    } else {
        return children
    }
}

export default Loading