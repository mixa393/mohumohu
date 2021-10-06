import '../../css/tooltip.css';
import {useState} from "react";

const Tooltip = ({ children,content }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="container">
            <div
                onClick={() => setShow(!show)}
                // onMouseLeave={() => setShow(false)}
            >
                {children}
            </div>
            {show && <p className="top">{content}</p>}
        </div>
    );
};

export default Tooltip;