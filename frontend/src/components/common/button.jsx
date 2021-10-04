
const Button = ({color,func,value}) => {
    return(
        <input type="submit"
               onClick={func}
               value={value}
               className={`bg-${color}-300 w-1/2 mx-auto py-2 rounded-xl border-b-4 border-${color}-500 hover:bg-${color}-400`}/>
    )
}

export default Button