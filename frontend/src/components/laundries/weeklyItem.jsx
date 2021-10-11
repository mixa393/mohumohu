import React, {useState} from "react";
import washingMachine from "../../images/laundries/washing-machine.svg"
import {laundryImage} from "../../lib/common";
import Loading from '../common/loading.jsx'
import Modal from "react-modal"
import {getLaundry} from "../../lib/api/laundries";
import ModalContents from "./modalContents";
import ModalButtons from "./modalButtons";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

Modal.setAppElement("#root")

const WeeklyItem = ({id, name, image, weekly}) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    function openModal() {
        setIsOpen(true);
        setIsLoading(true)
        getLaundryInfo(id).then(() => {
            setIsLoading(false)
        })
    }

    function closeModal() {
        setIsOpen(false);
    }

    const [laundry, setLaundry] = useState({});

    const getLaundryInfo = async (id) => {
        try {
            const res = await getLaundry(id)
            console.log(res)
            setLaundry(res.data.data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <tr className="h-16">
                <td className="h-full border-2 border-dotted border-gray-100 relative">
                    <div className="absolute inset-0 h-4/5 w-4/5 t-shirts m-auto flex items-center w-full">
                        <img src={laundryImage(image)} alt={`${name}の画像`} className="w-1/6 h-auto m-auto"/>
                        <button className="w-3/5 break-all mx-auto" onClick={openModal}>
                            {name}
                        </button>
                    </div>
                </td>

                {weekly?.map((day, index) => {
                    if (day === 2) {
                        return (<td key={index} className="border-2 border-dotted border-gray-100 bg-pink-100 w-1/12">
                            <img src={washingMachine} alt="洗濯する日" className="w-3/5 m-auto opacity-60"/>
                        </td>)
                    } else if (day === 1) {
                        return (<td key={index} className="border-2 border-dotted border-gray-100 bg-pink-100"></td>)
                    } else {
                        return (<td key={index} className="border-2 border-dotted border-gray-100"></td>)
                    }
                })}
            </tr>

            <Modal isOpen={modalIsOpen}
                   onRequestClose={closeModal}
                   style={customStyles}
                   contentLabel="洗濯物詳細">
                <Loading isLoading={isLoading} width={'100%'} height={'100%'}>
                    <button onClick={closeModal} className="bg-gray-200">X</button>

                    <ModalContents
                        name={laundry.name}
                        image={laundry.image}
                        days={laundry.days}
                        washAt={laundry.washAt}
                        description={laundry.washAt}
                    />

                    <ModalButtons id={laundry.id}/>

                </Loading>
            </Modal>
        </>
    )
        ;
}


export default WeeklyItem