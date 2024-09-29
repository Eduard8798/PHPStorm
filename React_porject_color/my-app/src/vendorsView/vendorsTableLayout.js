
export default (prop) => {


    return(<>
            <h2>{prop.propName}</h2>
            <table>
                {prop.vendors.map((v, i) => (
                    <tr key={i}>
                        <td>{v.name}</td>

                    </tr>

                ))}
            </table>
        </>
    )

}