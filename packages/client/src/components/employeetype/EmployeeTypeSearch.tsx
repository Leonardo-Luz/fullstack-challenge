import { useState } from "react";

type EmployeeTypeSearchProps = {
    getEmployeeTypeById: (id:number) => Promise<void>;
}

const EmployeeTypeSearch = ({ getEmployeeTypeById }: EmployeeTypeSearchProps) =>
{
    const [ id , setId ] = useState(Number);

    return(
        <div>
            <label>
                <input type="number" onChange={(e) => (setId(parseInt(e.target.value)))}/>
                <button onClick={() => getEmployeeTypeById(id)}>LOAD DATA</button>
            </label>
        </div>
    )
}

export default EmployeeTypeSearch;