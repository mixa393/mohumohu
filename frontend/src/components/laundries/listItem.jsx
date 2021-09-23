import React from "react";
import washingMachine from "../../images/laundries/washing-machine.svg"

const ListItem = ({name,schedule}) => {


    return (
        <tr className="h-32">
            <td className="h-full border-2 border-dotted border-gray-100 relative">
                <div className="absolute inset-0 h-4/5 w-4/5 t-shirts m-auto flex items-center">
                    <div className="m-auto">{name ?? 'Tシャツ'}</div>
                </div>
            </td>
            {schedule?.map((day)=>{
            return (<td className={`border-2 border-dotted border-gray-100`}>
                <img src={washingMachine} alt=""/>
            </td>)
            }) ?? [<td></td>,<td></td>,<td></td>,<td></td>,<td></td>,<td></td>,<td></td>]}
        </tr>
    );
}


export default ListItem