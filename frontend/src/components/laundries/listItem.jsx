import React from "react";
import washingMachine from "../../images/laundries/washing-machine.svg"
import {laundryImage} from "../../lib/common";

const ListItem = ({id, name, image, weekly}) => {


    return (
        <tr className="h-16">
            <td className="h-full border-2 border-dotted border-gray-100 relative">
                <div className="absolute inset-0 h-4/5 w-4/5 t-shirts m-auto flex items-center w-full">
                    <img src={laundryImage(image)} alt={`${name}の画像`} className="w-1/6 h-auto m-auto"/>
                    <p className="w-3/5 break-all mx-auto">{name}</p>
                </div>
            </td>

            {weekly?.map((day,index) => {
                if (day === 2) {
                    return (<td key={index} className="border-2 border-dotted border-gray-100 bg-pink-200 w-1/12">
                        <img src={washingMachine} alt="洗濯する日" className="w-3/5 m-auto"/>
                    </td>)
                } else if (day === 1) {
                    return (<td key={index} className="border-2 border-dotted border-gray-100 bg-pink-100"></td>)
                } else {
                    return (<td key={index} className="border-2 border-dotted border-gray-100"></td>)
                }
            })}
        </tr>
    );
}


export default ListItem