import React from "react";
import washingMachine from "../../images/laundries/washing-machine.svg"

const ListItem = ({id, name, image, weekly}) => {


    return (
        <tr className="h-20">
            <td className="h-full border-2 border-dotted border-gray-100 relative">
                <div className="absolute inset-0 h-4/5 w-4/5 t-shirts m-auto flex items-center">
                    <div className="m-auto">{name}</div>
                </div>
            </td>

            {weekly?.map((day) => {
                if (day === 2) {
                    return (<td className={`border-2 border-dotted border-gray-100 bg-pink-200`}>
                        <img src={washingMachine} alt="洗濯する日" className="w-3/5 m-auto"/>
                    </td>)
                } else if (day === 1) {
                    return (<td className={`border-2 border-dotted border-gray-100 bg-pink-100`}></td>)
                } else {
                    return (<td className={`border-2 border-dotted border-gray-100`}></td>)
                }
            })}
        </tr>
    );
}


export default ListItem