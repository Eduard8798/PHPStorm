import {useEffect, useState} from "react";
import MockApiFetch from "./MockApiFetch";

export default () =>{

    const [products,setProducts] = useState([])
    const [page,setPage] = useState(1);
    const [limit,setLimit] = useState(10);

const getData = () =>{

    const searchParams = [
        {name:'page',value: page},
        { name:'limit',value: limit}
    ]
    MockApiFetch(searchParams)
        .then(data =>{
            setProducts(data)
        })
}

    const doSetLimit = (ev) =>{
    const v = ev.target.value
        if (v < 1 || v > 20) {return}
        setLastPageLoadMor(0)
        setLimit(v)
    }

    const doSetPage = (ev) =>{
    const v = ev.target.value
        if (v < 1 || v > 20) {return}
        setLastPageLoadMor(0)
        setPage(v)

    }

      const [lastPageLoadMore,setLastPageLoadMor] = useState(0);

    const doLoadMore = () =>{
        if (lastPageLoadMore === 0) {
            setLastPageLoadMor(parseInt(page) + 1 )
        }else {
            setLastPageLoadMor(parseInt(setLastPageLoadMor) + 1 );
        }
    }



    useEffect(() => {
        if (setLastPageLoadMor === 0) {return}
        const searchParams = [
            {name:'page',value: lastPageLoadMore},
            { name:'limit',value: limit}
        ]
        MockApiFetch(searchParams)
            .then(data =>{
                setProducts(prevProducts =>[...prevProducts,...data]);
            })

    },[lastPageLoadMore])

    useEffect(() => {
        getData()
    }, [limit,page]);
    return(
        <>
        <h1>Data from MockApi</h1>
            <div>
                <label>
                    <input type='number'
                    value={limit}
                    onChange={doSetLimit}/>
                </label>
                <label>
                    <input type='number'
                    value={page}
                    onChange={doSetPage}/>
                </label>
            </div>
        <ul>
            {products.map((p,i)=>
            <li key={i}>
                <p>{p.name}</p>
                <img src={p.photo} width = '70px'/>

            </li>
            )}
        </ul>
            <button onClick={doLoadMore}>LoadMore</button>
</>
    )
}