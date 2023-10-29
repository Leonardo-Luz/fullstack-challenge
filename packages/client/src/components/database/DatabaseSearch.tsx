import { useState } from "react";
import { Link } from 'react-router-dom';
import './search.css'

type databaseSearchProps = {
    database: string;
}

const DatabaseSearch = ({ database }: databaseSearchProps) =>
{
    const [ id , setId ] = useState(String);

    return(
        <div className="search">
            <label>
                <input className="search-field" type="text" onChange={(e) => (setId(e.target.value))}/>
                <Link className="search-button" to={database + id}>Search</Link>
            </label>
        </div>
    )
}

export default DatabaseSearch;