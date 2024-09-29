export default (prop) => {


    return(<>
            <h2>{prop.propName}</h2>
            <ul>
                {prop.vendors.map((v, i) => (
                    <li key={i}>
                        {v.name}

                    </li>

                ))}
            </ul>
        </>
    )

}