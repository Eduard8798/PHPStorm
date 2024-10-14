import {useEffect, useState} from "react";
import ColorsItem from "./ColorsItem";
import {toast} from "react-toastify";
import MyLog from "../helpers/MyLog";
import myLog from "../helpers/MyLog";
import MyError from "../helpers/MyError";
import {MyFetch} from "../helpers/MyFetch";
import ColorForm from "./ColorForm";
import MockApiFetch from "./mockApi/MockApiFetch";


export default () => {



    const [colors,SetColor] = useState([])
   // const [paginate,SetPaginate] = useState({})

    const [pageNumber,setPageNumber] = useState(1);
    const [pageSize,setPageSize] = useState(4);

    const delColor = (id) => {
        MyFetch('ApiColor/' + id, {
            method: "DELETE"
        })
            .then(res => {
                MyLog(res)
                SetColor((prevColors) => prevColors.filter(color => color.id !== id));
            })
    }
   /* const getData = () =>{

        const searchParams = [
            {name:'page',value: page},
            { name:'limit',value: limit}
        ]
        MockApiFetch(searchParams)
            .then(data =>{
                setProducts(data)
            })
    }*/

    const getColors = () =>
    {
        const url = `ApiColor?pageNumber=${pageNumber}&pageSize=${pageSize}`;

        MyFetch(url)
            .then(res =>{
                SetColor(res.data)
                //SetPaginate(res.paginate)
                console.log(res.paginate)
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

    useEffect(() => {
        getColors();
    }, [pageNumber, pageSize]);

    const doSetNumber = (ev) =>{
        const v = ev.target.value
        if (v < 1 || v > 20) {return}
        setLastPageLoadMor(0)
        setPageNumber(v)

    }
    const [lastPageLoadMore,setLastPageLoadMor] = useState(0);
    const doSetSize = (ev) =>{
        const v = ev.target.value
        if (v < 1 || v > 20) {return}
        setLastPageLoadMor(0)
        setPageSize(v)
    }
    const doLoadMore = () =>{
        if (lastPageLoadMore === 0) {
            setLastPageLoadMor(parseInt(pageNumber) + 1 )
        }else {
            setLastPageLoadMor(parseInt(lastPageLoadMore) + 1 );
        }
    }
    useEffect(() => {
        if (setLastPageLoadMor === 0) {return}

        const url = `ApiColor?pageNumber=${lastPageLoadMore}&pageSize=${pageSize}`;

        MyFetch(url)
            .then(res =>{
                SetColor(prevProducts => [...prevProducts, ...res.data])
                //SetPaginate(res.paginate)
                console.log(res.paginate)
            })

    },[lastPageLoadMore])
    return(
        <>
            <h1>Colors</h1>
            <ul>
                {colors.map((color, i) => (

                    <ColorsItem color={color} getColors={getColors} delColor={delColor} key={i}/>
                ))}
            </ul>
            <ColorForm
                getColors={getColors}
            />
            <div>
                <label>
                    <input type='number'
                           value={pageSize}
                           onChange={doSetSize}/>
                </label>
                <label>
                    <input type='number'
                           value={pageNumber}
                           onChange={doSetNumber}/>
                </label>

            </div>
            <button onClick={doLoadMore}>LoadMore</button>
        </>
    )

}