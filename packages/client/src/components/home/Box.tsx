import './box.css'

import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'

type BoxProps = {
    children: React.ReactNode,
    table: string,
}

const Box = ( { children, table }: BoxProps ) =>
{
    const [ count , setCount ] = useState(0);
    const [ loading , setLoading ] = useState(false);

    const getByLink = async () =>
    {
        await fetch(`http://localhost:3001${table}/`)
        .then((res) => res.json()
            .then((data) => {
            setCount(data.length);
            setLoading(true);
        })
        )
    }

    useEffect(()=> {getByLink()});

    return(
        <div id="box">
            <h2>{children}</h2>

            <hr/>

            <Link className="button" to={table + 'form'}>Create</Link>
            <Link className="button" to={table}>List</Link>
            
            <hr/>
            
            { loading /* wait to fetch data length */ && <h2>{count}</h2> }
        </div>
    )
}

export default Box;