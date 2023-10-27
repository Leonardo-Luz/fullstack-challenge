import { employeeTypeProps } from "../../types/employeetype";
import './table.css';

type EmployeeTypeRowProps = {
    employeeTypes: employeeTypeProps[] | null;
    filteredId?: number;
};

const EmployeeTypeRow = ( { employeeTypes , filteredId }: EmployeeTypeRowProps) =>
{
    const employeeTypes_ = employeeTypes;

    let notfound = false;

    const FilterCheck = () =>
    {
        if(employeeTypes_)
        for(let i = 0; i < employeeTypes_.length; i++)
        {
            if(employeeTypes_[i].employeetypeid === filteredId)            
                return true;
        }

        return false;
    }

    return(
        <table>
            <thead><tr><td className="id">id</td><td className="desc">description</td><td className="sit">situation</td></tr></thead>
            <tbody>
            {employeeTypes_ && employeeTypes_.map((data) => {
                if(filteredId === undefined)
                    return <tr><td className="id">{data.employeetypeid}</td><td className="desc">{data.description}</td><td className="sit">{(data.situation && "Ativo")||(!data.situation && "Desligado")}</td></tr>
                else if(!FilterCheck() && !notfound)
                {
                    notfound = true;
                    return <tr><td className="id"></td><td className="desc">not found</td><td className="sit"></td></tr>
                }
                else if(filteredId === data.employeetypeid)
                    return <tr><td className="id">{data.employeetypeid}</td><td className="desc">{data.description}</td><td className="sit">{(data.situation && "Ativo")||(!data.situation && "Desligado")}</td></tr>
            })}
            </tbody>
        </table>
    )
}

export default EmployeeTypeRow;