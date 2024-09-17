import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './TableData.css'

const itemsPerPageOptions = [5, 10, 15];
export const TableDataCustom = ({ columns, page, setPage, rowsPerPage, 
    setRowsPerPage, updateFuntion, deleteFuntion, 
    refetch, isLoading, data}) => {
  
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
              {columns.map((column,index) => (
                <th key={index}>{column.label}</th>
              ))}
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((row) => {
              return (
                <tr key={row.id}>
                  {columns.map((column, index) => {
                    // console.log(new Date(row.updatedAt));
                    const value = column.value.split('.').reduce((o, i) => o[i], row);
                    return (
                        <td key={index} data-label={column.label}>
                          {value}
                        </td>
                      )})}
                  <td>
                    <button onClick={()=>{updateFuntion(row)}}><EditIcon/></button>
                    <button onClick={()=>{deleteFuntion(row)}}><DeleteIcon/></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button className='paginationBTN' onClick={() => handleChangePage( page - 1)} disabled={page === 1}>
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
