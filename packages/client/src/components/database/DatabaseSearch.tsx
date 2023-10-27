import { useState } from "react";
import { Link } from 'react-router-dom';

type databaseSearchProps = {
    database: string;
}

const DatabaseSearch = ({ database }: databaseSearchProps) =>
{
    const [ id , setId ] = useState(Number);

    return(
        <div>
            <label>
                <input type="number" onChange={(e) => (setId(parseInt(e.target.value)))}/>
                <Link to={database + id}>Search</Link>
            </label>
        </div>
    )
}

export default DatabaseSearch;