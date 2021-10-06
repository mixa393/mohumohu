import React, {useEffect, useState} from "react";
import {createLaundry, getLaundry, updateLaundry} from "../../lib/api/laundries";
import Button from "../../components/common/button";
import "../../css/laundries.css"
import what from "../../images/common/what.svg"

import curtains from "../../images/laundries/curtains.svg";
import duvet from "../../images/laundries/duvet.svg";
import blanket from "../../images/laundries/blanket.png";
import pillow from "../.././images/laundries/pillow01.png";
import cushions from "../../images/laundries/cushions.svg";
import sheets from "../../images/laundries/sheets.svg";
import mat from "../../images/laundries/mattress.svg";
import bear from "../../images/laundries/bear.svg";
import defaultImage from "../../images/laundries/tshirts.svg";
import unSelectedImage from "../../images/laundries/unSelected.svg"
import Modal from "react-modal";
import {laundryImage} from "../../lib/common";

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

const Form = ({match}) => {
    const laundryId = match?.params?.id ?? ''

    const [laundry, setLaundry] = useState({});

    useEffect(() => {
        getLaundryInfo(laundryId).then()
    }, []);

    const getLaundryInfo = async (id) => {
        try {
            const res = await getLaundry(id)
            console.log(res)
            setLaundry(res.data.data)
        } catch (err) {
            console.error(err)
        }
    }

    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const params = useState({
        name: "",
        image: "",
        days: "",
        washAt: undefined,
        description: ""
    })

    const handleSubmit = (e, id) => {
        if (id) {
            handleUpdateLaundry(e, id)
        } else {
            handleCreateLaundry(e)
        }
    }

    const handleCreateLaundry = async (e) => {
        e.preventDefault()

        try {
            const res = await createLaundry(params)
            console.log(res)

            if (res.status === 200) {
                console.log("データが変更されました")
                console.log("res.data.data")
            }
        } catch (err) {
            console.error(err)
        }
        // history.push("/laundry")
    }

    const handleUpdateLaundry = async (e, id) => {
        e.preventDefault()

        for (const property in params) {
            if (params[property] === "" || params[property] === undefined) {
                delete params[property]
            }
        }

        try {
            const res = await updateLaundry(id, params)
            console.log(res)

            if (res.status === 200) {
                console.log("データが変更されました")
                console.log("res.data.data")
            }
        } catch (err) {
            console.error(err)
        }
        // history.push("/laundry")
    }

    return (
        <>
            <div className="h-screen">
                <h1 className="text-xl mt-4 bg-yellow-200">洗濯物</h1>
                {/*<p className="text-xs text-gray-300 text-right">※のついている項目は必須です</p>*/}

                <form className="h-3/4 flex flex-col justify-around text-sm w-4/5 mx-auto mt-4">
                    <div className="flex flex-col">
                        <label htmlFor="name">洗濯物名</label>
                        <input type="text" id="name" name="name" className="bg-gray-100 p-1"
                               defaultValue={laundry.name ?? ""}/>
                    </div>

                    <button className="w-3/5 break-all mx-auto" onClick={openModal}>
                        <img src={laundryImage(laundry.image) ?? unSelectedImage} alt="画像" className="h-20 w-auto mx-auto mt-4"/>
                    </button>

                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="洗濯物詳細"
                    >
                        <button onClick={closeModal} className="bg-gray-200">close</button>
                        <div className="flex flex-wrap image-selection">
                            <input id="default" type="radio" name="image" value="default"/>
                            <label htmlFor="default">
                                <img src={defaultImage} alt="Tシャツの画像" className="h-10 w-auto"/>
                            </label>

                            <input id="duvet" type="radio" name="image" value="duvet"/>
                            <label htmlFor="duvet">
                                <img src={duvet} alt="毛布の画像" className="h-10 w-auto"/>
                            </label>

                            <input id="bear" type="radio" name="image" value="bear"/>
                            <label htmlFor="bear">
                                <img src={bear} alt="ぬいぐるみの画像" className="h-10 w-auto"/>
                            </label>

                            <input id="curtains" type="radio" name="image" value="curtains"/>
                            <label htmlFor="curtains">
                                <img src={curtains} alt="カーテンの画像" className="h-10 w-auto"/>
                            </label>

                            <input id="blanket" type="radio" name="image" value="blanket"/>
                            <label htmlFor="blanket">
                                <img src={blanket} alt="ブランケットの画像" className="h-10 w-auto"/>
                            </label>

                            <input id="pillow" type="radio" name="image" value="pillow"/>
                            <label htmlFor="pillow">
                                <img src={pillow} alt="枕の加増" className="h-10 w-auto"/>
                            </label>

                            <input id="cushions" type="radio" name="image" value="cushions"/>
                            <label htmlFor="cushions">
                                <img src={cushions} alt="クッションの画像" className="h-10 w-auto"/>
                            </label>

                            <input id="mat" type="radio" name="image" value="mat"/>
                            <label htmlFor="mat">
                                <img src={mat} alt="マットレスの画像" className="h-10 w-auto"/>
                            </label>

                            <input id="sheets" type="radio" name="image" value="sheets"/>
                            <label htmlFor="sheets">
                                <img src={sheets} alt="シーツの画像" className="h-10 w-auto"/>
                            </label>
                        </div>
                    </Modal>


                    <div className="flex flex-col w-full">
                        <label htmlFor="days" className="flex items-center">
                            洗濯までの期間
                            <img src={what} alt="詳細" className="h-4 w-auto p-0 m-0"/>
                        </label>
                        {/*<p className="text-xs">何日に1回洗濯したいかを日数で入力してください。</p>*/}
                        <input type="text" id="days" name="days" className="bg-gray-100 p-1"
                               defaultValue={laundry.days ?? ""}/>
                    </div>

                    <div className="flex flex-col mx-auto w-full">
                        <label htmlFor="washAt" className="flex items-center">
                            次の洗濯予定日
                            <img src={what} alt="詳細" className="h-4 w-auto p-0 m-0"/>
                        </label>
                        {/*<p>入力しない場合は自動的に今日から7日後になります</p>*/}
                        <input type="date" id="washAt" name="washAt" className="bg-gray-100 p-1"
                               defaultValue={laundry.washAt ?? ""}/>
                    </div>


                    <div className="flex flex-col">
                        <label htmlFor="description">説明</label>
                        <input type="text" id="description" name="description" className="bg-gray-100 p-1"
                               defaultValue={laundry.description ?? ""}/>
                    </div>

                    <Button color="yellow" func={(e) => {
                        handleSubmit(e, laundryId)
                    }} value="変更する"/>
                </form>
            </div>
        </>

    )
}

export default Form