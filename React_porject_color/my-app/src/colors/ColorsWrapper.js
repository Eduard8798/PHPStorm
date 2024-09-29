import {useEffect, useState} from "react";
import ColorsItem from "./ColorsItem";
import {toast} from "react-toastify";
import MyLog from "../helpers/MyLog";
import myLog from "../helpers/MyLog";
import MyError from "../helpers/MyError";
import {MyFetch} from "../helpers/MyFetch";
import ColorForm from "./ColorForm";


export default () => {



    const [colors,SetColor] = useState([])
    const [paginate,SetPaginate] = useState({})


    const delColor = (id) => {
        MyFetch('ApiColor/' + id, {
            method: "DELETE"
        })
            .then(res => {
                MyLog(res)
                SetColor((prevColors) => prevColors.filter(color => color.id !== id));
            })
    }

    const getColors = () =>
    {
        MyFetch('ApiColor')
            .then(res =>{
                SetColor(res.data)
                SetPaginate(res.paginate)
            })
        /*fetch(`http://localhost:5245/api/ApiColor`)
            .then(res =>{
                MyLog(res)
                myLog(res.status + " " + res.statusText)
               return res.json()
            })
            .then(res => {
                SetColor(res.data)
                SetPaginate(res.paginate)
                toast.info ("Total Items" + res.paginate.totalItems)
            })
            .catch(err=>{
                MyError(err)
            })*/

    }

    //getColors()

    useEffect(() => {
        getColors()
    }, []);

    return(
        <>
            <h1>Colors</h1>
            <ul>
                {colors.map((color,i) =>(

                    <ColorsItem color = {color} getColors ={getColors} delColor = {delColor} key = {i}/>
                ))}
            </ul>
            <ColorForm
                getColors={getColors}
            />
        </>
    )

}