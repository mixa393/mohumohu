import React from "react"

const LaundryItem = ({id,name,image,limitDays}) => {
    return (
        <>
            <div className="flex bg-pink-200">
                <img src={image} alt={`${name}の画像`}/>
                <p>{name}</p>
                <p>あと{limitDays}日</p>
            </div>
        </>
    )
}

export default LaundryItem