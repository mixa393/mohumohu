import React, {useState} from "react";
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

const ListItem = ({id, name, image}) => {
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
            <li className="flex h-14 w-full mx-auto border-dashed border-b-2 border-gray-200">
                <img src={laundryImage(image)} alt={`${name}の画像`} className="h-3/5 w-auto m-auto"/>
                <button className="w-3/5 break-all mx-auto" onClick={openModal}>
                    {name}
                </button>
            </li>


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
                        description={laundry.description}
                    />

                    <ModalButtons id={laundry.id}/>

                </Loading>
            </Modal>
        </>
    )
}


export default ListItem