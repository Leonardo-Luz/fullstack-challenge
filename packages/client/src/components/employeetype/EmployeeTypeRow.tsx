import { employeeTypeProps } from "../../types/employeetype";
import './table.css';

type EmployeeTypeRowProps = {
    employeeTypes: employeeTypeProps[] | null;
};

const EmployeeTypeRow = ( { employeeTypes }: EmployeeTypeRowProps) =>
{
    const data = employeeTypes;

    return(
        <table>
            <thead><tr><td className="id">id</td><td className="desc">description</td><td className="sit">situation</td></tr></thead>
            <tbody>
            {data && data.map((data) => {
                return <tr><td className="id">{data.employeetypeid}</td><td className="desc">{data.description}</td><td className="sit">{(data.situation && "Ativo")||(!data.situation && "Desligado")}</td></tr>
            })}
            </tbody>
        </table>
    )
}

export default EmployeeTypeRow;