import React, {useState} from "react";
import washingMachine from "../../images/laundries/washing-machine.svg"
import {laundryImage} from "../../lib/common";
import Loading from '../common/loading.jsx'
import Modal from "react-modal"
import Button from "../common/button";
import {Link} from "react-router-dom";
import {deleteLaundry, getLaundry} from "../../lib/api/laundries";
import {useHistory} from "react-router";

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
    const [isShownDeleteMode, setIsShownDeleteMode] = useState(false)
    const history = useHistory()

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

    const deleteLaundryInfo = async (e, id) => {
        e.preventDefault()

        try {
            const res = await deleteLaundry(id)
            setIsShownDeleteMode(false)
            console.log(res)
            history.push("/laundries")
        } catch (err) {
            console.error(err)
        }
    }

    let buttons
    if (isShownDeleteMode) {
        buttons = () => {
            return (
                <>
                    <p className="text-center text-red-500">本当に削除しますか？</p>

                    <div className="mt-8 w-2/3 mx-auto flex justify-between space-x-2">
                        <Button color="yellow" func={(e) => {
                            deleteLaundryInfo(e, laundry.id)
                        }} value="はい"/>
                        <Button color="gray" func={() => {
                            setIsShownDeleteMode(false)
                        }} value="いいえ"/>
                    </div>
                </>
            )
        }
    } else {
        buttons = () => {
            return (
                <div className="mt-8 w-2/3 mx-auto flex justify-between space-x-1">
                    <Link to={`/laundries/${laundry.id}`}
                          className="bg-yellow-200 hover:bg-yellow-100 py-2 px-3 rounded-xl border-b-4 border-yellow-500">
                        変更する</Link>
                    <Button color="gray" func={() => {
                        setIsShownDeleteMode(true)
                    }} value="削除する"/>
                </div>
            )
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
                        return (<td key={index} className="border-2 border-dotted border-gray-100 bg-yellow-500 w-1/12">
                            <img src={washingMachine} alt="洗濯する日" className="w-3/5 m-auto"/>
                        </td>)
                    } else if (day === 1) {
                        return (<td key={index} className="border-2 border-dotted border-gray-100 bg-yellow-400"></td>)
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

                    <h2 className="text-center p-1 bg-yellow-100">{laundry.name}</h2>

                    <div className="grid grid-cols-5 my-8 text-sm">
                        <div className="col-span-2 flex items-center justify-center">
                            <img src={laundryImage(laundry.image)} alt={`${laundry.name}の画像`}
                                 className="w-3/5 h-auto"/>
                        </div>
                        <div className="col-span-3">
                            {laundry.days &&
                            <div className="flex justify-between items-center border-b-2 border-dashed">
                                <p className="p-1 bg-gray-100">頻度</p>
                                <p className="border-b border-dashed">{laundry.days ?? ""}日に1回</p>
                            </div>}

                            <div className="flex justify-between items-center mt-5 border-b-2 border-dashed">
                                <p className="p-1 bg-gray-100">次回の洗濯</p>
                                <p>{laundry.washAt}</p>
                            </div>

                            {laundry.description &&
                            <p className="mt-5 border-b-2 border-dashed">{laundry.description ?? ""}</p>}
                        </div>
                    </div>

                    {buttons()}

                </Loading>
            </Modal>
        </>
    )
        ;
}


export default WeeklyItem