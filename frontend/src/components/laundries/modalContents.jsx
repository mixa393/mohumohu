import {laundryImage} from "../../lib/common";

const ModalContents = ({name,image,days,washAt,description}) =>{
    return(
        <>
            <h2 className="text-center p-1 bg-pink-100">{name}</h2>

            <div className="grid grid-cols-5 my-8 text-sm">
                <div className="col-span-2 flex items-center justify-center">
                    <img src={laundryImage(image)} alt={`${name}の画像`}
                         className="w-3/5 h-auto"/>
                </div>
                <div className="col-span-3">
                    {days &&
                    <div className="flex justify-between items-center border-b-2 border-dashed">
                        <p className="p-1 bg-gray-100">頻度</p>
                        <p className="border-b border-dashed">{days ?? ""}日に1回</p>
                    </div>}

                    <div className="flex justify-between items-center mt-5 border-b-2 border-dashed">
                        <p className="p-1 bg-gray-100">次回の洗濯</p>
                        <p>{washAt}</p>
                    </div>

                    {description &&
                    <p className="mt-5 border-b-2 border-dashed">{description ?? ""}</p>}
                </div>
            </div>
        </>
    )
}

export default ModalContents