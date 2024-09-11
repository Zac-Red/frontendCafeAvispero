import './TableData.css'

const itemsPerPageOptions = [5, 10, 15]
export const TableData = ({columns, page, setPage, rowsPerPage, 
  setRowsPerPage, refetch, isLoading, data}) => {

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
    return <h1>Sin Datos</h1>
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
            </tr>
          </thead>
          <tbody>
            {data.items.map((row) => {
              return (
                <tr key={row.id}>
                  {columns.map((column, index) => {
                    const value = column.value.split('.').reduce((o, i) => o[i], row);
                    return (
                      <td key={index}>
                        {typeof value === "boolean"? 
                          (value === true ? "Activo" : "Desactivado")
                          :
                          value
                        }
                      </td>)})}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={() => handleChangePage( page - 1)} disabled={page === 1}>
          Previo
        </button>

        <span>Pagina {page} de {data.totalPages}</span>

        <button onClick={() => handleChangePage(page + 1)} disabled={page === data.totalPages}>
          Next
        </button>

        <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
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