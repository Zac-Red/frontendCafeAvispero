import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Avatar from '@mui/material/Avatar';
import notImaga from './sinproduct.png'

import './TableData.css'

const itemsPerPageOptions = [5, 10, 20, 50];
export const TableDataCustom = ({ columns, formatData, page, setPage, rowsPerPage,
  setRowsPerPage, updateFuntion, deleteFuntion, seeData, setData,
  refetch, isLoading, data }) => {

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(1);
    refetch();
  };

  if (isLoading) {
    return <h1>reload</h1>
  }

  if (!data?.items) {
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
              {(updateFuntion || deleteFuntion || seeData || setData) && <th>Opciones</th>}
            </tr>
          </thead>
          <tbody>
            {data.items.map((row) => {
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
                  {(updateFuntion || deleteFuntion || seeData || setData) &&
                    <td className='optionstable'>
                      {updateFuntion &&
                        <button className='editbtnTable' onClick={() => { updateFuntion(row) }}><EditIcon/></button>}
                      {deleteFuntion &&
                        <button className='deletebtnTable' onClick={() => { deleteFuntion(row) }}><DeleteIcon/></button>}
                      {seeData &&
                        <button className='seebtnTable' onClick={() => { seeData(row) }}><RemoveRedEyeIcon/></button>}
                      {setData &&
                        <button className='checkbtnTable' onClick={() => { setData(row) }}><CheckCircleIcon/></button>}
                    </td>
                  }
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button className='paginationBTN' onClick={() => handleChangePage(page - 1)} disabled={page === 1}>
          Previo
        </button>
        <span>Pagina {page} de {data.totalPages}</span>
        <button className='paginationBTN' onClick={() => handleChangePage(page + 1)} disabled={page === data.totalPages}>
          Next
        </button>
        <select className='select-items-per-page' value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} items por pagina
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
