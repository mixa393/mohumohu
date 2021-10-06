import '../../css/tooltip.css';
import {useEffect, useRef, useState} from "react";
import toolTipImage from "../../images/common/tooltip.svg";

const Tooltip = ({ content }) => {
    const tooltipEl = useRef();
    const [show, setShow] = useState(false);

    const clickOutside = (e) => {
        e.preventDefault()
        if (!tooltipEl?.current?.contains(e.target)) setShow(false);
    };

    useEffect(() => {
        document.addEventListener('click', clickOutside);
        return () => {
            document.removeEventListener('click', clickOutside);
        };
    }, []);

    return (
        <div className="container inline ml-2" ref={tooltipEl}>
            <div onClick={() => setShow(!show)} className="inline-block">
                <img src={toolTipImage} alt="詳細" className="inline-block h-4 w-auto p-0 m-0"/>
            </div>
            {show && <p className="top">{content}</p>}
        </div>
    );
};

export default Tooltip;