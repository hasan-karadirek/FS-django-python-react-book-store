import React from "react";
interface AddToCartButtonProps{
bookId:number,
btnClasses:string,
btnText:string

}
const AddToCartButton : React.FC<AddToCartButtonProps> = ({bookId,btnClasses,btnText})=>{
    return <button id={bookId.toString()} className={btnClasses} type="submit">{btnText}</button>
}

export default AddToCartButton