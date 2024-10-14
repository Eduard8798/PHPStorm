import {toast} from "react-toastify";
import MyError from "../../helpers/MyError";
import MyLog from "../../helpers/MyLog";

export default async (searchParams = null, options = null) => {



       const url = new URL(`https://66f970c0afc569e13a98cb42.mockapi.io/products` );

       // если есть параментры - сделать запрос в url
        if (searchParams){
            searchParams.map (p=>{
                url.searchParams.append(p.name,p.value)
            })
        }
    toast.info(url.toString())
        try {
            const response = await fetch(url, {
                headers: {

                },
                ...options,
            });

            MyLog(response.statusText)

            return await response.json();
        } catch (error) {
            MyError(error)
            // throw error;
        }

}