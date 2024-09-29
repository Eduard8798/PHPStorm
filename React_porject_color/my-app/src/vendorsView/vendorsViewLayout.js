import {useState}  from "react";
import VendorsTableLayout from "./vendorsTableLayout";

import VendorsUlLayout from "./vendorsUlLayout";

export default () => {

    const [ViewType,setViewType] = useState('table')
    const SetViewTypeToTable = () => {
        setViewType ('table')
    }
    const SetViewTypeToList = () => {
        setViewType ('list')
    }


    const someVol = "Hello Props"

    const [vendors,setVendors] = useState([
        {name: 'Apple',logoUrl: ''},
        {name: 'Samsung',logoUrl: ''},
        {name: 'Dell',logoUrl: ''}
    ]);


return(
    <>
        <h1>Vector List</h1>
        <p><span onClick={SetViewTypeToTable}>To Table </span><span onClick={SetViewTypeToList}> To List</span></p>

        { ViewType === 'table' ?
            ( <VendorsTableLayout vendors = {vendors}/> ) : (<VendorsUlLayout vendors = {vendors}/>)
        }

    </>
)





}