import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import './box.css'

type BoxProps = {
    children: React.ReactNode,
    target1: string,
    target2: string
}

const Box = ( { children, target1 , target2 }: BoxProps ) =>
{
    const [ count , setCount ] = useState(0);
    const [ loading , setLoading ] = useState(false);

    const getByLink = async () =>
    {
        await fetch(`http://10.0.0.239:3001${target2}/`)
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
            <Link className="button" to={target1}>Create</Link>
            <Link className="button" to={target2}>List</Link>
            <hr/>
            {loading && <h2>{count}</h2>}
        </div>
    )
}

export default Box;