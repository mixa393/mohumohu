import {useState} from "react";
import {createLaundry, updateLaundry} from "../../lib/api/laundries";
import Button from "../common/button";

import curtains from "../../images/laundries/curtains.svg";
import duvet from "../../images/laundries/duvet.svg";
import blanket from "../../images/laundries/blanket.png";
import pillow from "../.././images/laundries/pillow01.png";
import cushions from "../../images/laundries/cushions.svg";
import sheets from "../../images/laundries/sheets.svg";
import mat from "../../images/laundries/mattress.svg";
import bear from "../../images/laundries/bear.svg";
import defaultImage from "../../images/laundries/tops01.png";

const Form = ({id, name, image, days, washAt, description, func}) => {
    const params = useState({
        name: "",
        days: "",
        washAt: undefined,
        description: ""
    })

    const onSubmitRequest = (func) => {
        if (func === "create") {
            // handleCreateLaundry()
        } else {
            // handleUpdateLaundry()
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
        // setIsDisplayedForm(false)
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
        // setIsDisplayedForm(false)
        // history.push("/laundry")
    }

    return (
        <>
            <p>※のついている項目は必須です</p>

            <form className="flex flex-col justify-around mx-auto">
                <label htmlFor="name">洗濯物名</label>
                <input type="text" id="name" name="name" placeholder={name}
                       className="bg-gray-100"/>

                <p>画像</p>
                <div className="mt-4 flex flex-wrap image-selection">
                    <input id="default" type="radio" name="image" value="default"/>
                    <label htmlFor="default">
                        <img src={defaultImage} className="h-10 w-auto"/>
                    </label>

                    <input id="duvet" type="radio" name="image" value="duvet"/>
                    <label htmlFor="duvet">
                        <img src={duvet} className="h-10 w-auto"/>
                    </label>

                    <input id="bear" type="radio" name="image" value="bear"/>
                    <label htmlFor="bear">
                        <img src={bear} className="h-10 w-auto"/>
                    </label>

                    <input id="curtains" type="radio" name="image" value="curtains"/>
                    <label htmlFor="curtains">
                        <img src={curtains} className="h-10 w-auto"/>
                    </label>

                    <input id="blanket" type="radio" name="image" value="blanket"/>
                    <label htmlFor="blanket">
                        <img src={blanket} className="h-10 w-auto"/>
                    </label>

                    <input id="pillow" type="radio" name="image" value="pillow"/>
                    <label htmlFor="pillow">
                        <img src={pillow} className="h-10 w-auto"/>
                    </label>

                    <input id="cushions" type="radio" name="image" value="cushions"/>
                    <label htmlFor="cushions">
                        <img src={cushions} className="h-10 w-auto"/>
                    </label>

                    <input id="mat" type="radio" name="image" value="mat"/>
                    <label htmlFor="mat">
                        <img src={mat} className="h-10 w-auto"/>
                    </label>

                    <input id="sheets" type="radio" name="image" value="sheets"/>
                    <label htmlFor="sheets">
                        <img src={sheets} className="h-10 w-auto"/>
                    </label>

                </div>

                <div className="mt-4 flex flex-col">
                    <label htmlFor="days">洗濯までの期間？</label>
                    {/*<p className="text-xs">何日に1回洗濯したいかを日数で入力してください。</p>*/}
                    <input type="text" id="days" name="days" placeholder={days}
                           className="bg-gray-100"/>
                </div>

                <div className="mt-4 flex flex-col">
                    <label htmlFor="washAt">次の洗濯予定日</label>
                    {/*<p>入力しない場合は自動的に今日から7日後になります</p>*/}
                    <input type="date" id="washAt" name="washAt" placeholder={washAt}
                           className="bg-gray-100"/>
                </div>

                <div className="mt-4 flex flex-col">
                    <label htmlFor="description">説明</label>
                    <input type="text" id="description" name="description"
                           className="bg-gray-100"/>
                </div>

                <Button color="yellow" func={(e) => {
                    handleUpdateLaundry(e, id)
                }} value="変更する"/>
            </form>
        </>

    )
}

export default Form