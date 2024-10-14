import {MyFetch} from "../helpers/MyFetch";
import {useState} from "react";

export default  () =>
{
    const [jwtToken, setJwtToken] = useState(null)


    const getJwtToken = () =>{
        const url = 'http://localhost:3939';
        MyFetch(setJwtToken,url)
    }

    return (
        <>
            <h1>Jwt Example</h1>
            <div>{jwtToken}</div>

            <div>
                <button onClick={getJwtToken}> Create (Get) Token</button>
            </div>
        </>
    )
};