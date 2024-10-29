import Avatar from '@mui/material/Avatar';
import './TableData.css'
import notImaga from './sinproduct.png'

export const TableSeeDetails = ({ data, columns, formatData, }) => {
  if (!data) {
    return <h1>Error</h1>
  }
  return (
    <div className="table-container">
      <div className='table-content'>
        <table>
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr key={row.id}>
                  {columns.map((column, index) => {
                    const newFormat = formatData(row)
                    const value = column.value.split('.').reduce((o, i) => o[i], newFormat);
                    return (
                      <td key={index} data-label={column.label}>
                        {
                        (column.value === "url") ?
                          value ? <Avatar alt={value} src={value} />
                          : <Avatar alt={value} src={notImaga} />
                          : value}
                      </td>
                    )
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
