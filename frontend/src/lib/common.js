import curtains from "../images/laundries/curtains.svg";
import duvet from "../images/laundries/duvet.svg";
import blanket from "../images/laundries/blanket.png";
import pillow from "../images/laundries/pillow01.png";
import cushions from "../images/laundries/cushions.svg";
import sheets from "../images/laundries/sheets.svg";
import mat from "../images/laundries/mattress.svg";
import bear from "../images/laundries/bear.svg";
import defaultImage from "../images/laundries/tops01.png";

const laundryImage = (image) => {
    switch (image) {
        case "curtains":
            return curtains;
        case "duvet-cover":
            return duvet;
        case "blanket":
            return blanket;
        case "pillow":
            return pillow;
        case "cushions":
            return cushions;
        case "sheets":
            return sheets;
        case "mat":
            return mat;
        case "bear":
            return bear;
        default:
            return defaultImage;
    }
}


export {laundryImage}