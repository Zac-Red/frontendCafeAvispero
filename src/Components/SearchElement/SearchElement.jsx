import './SearchElement.css'
export const SearchElement = ({ refetch, options = [], selectedOption, setSelectedOption, inputValue, setInputValue }) => {
  // Función para manejar el cambio del select
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Función para manejar el cambio del input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (selectedOption && inputValue) {
      refetch();
    }
  };
  return (
    <div className='containersearch'>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="" disabled>
          Selecciona una opción
        </option>
        {options.map(({ option, value }) => (
          <option key={option} value={value}>
            {option}
          </option>
        ))}
      </select>

      <input
        className="inputsearch"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Ingresa un valor"
      />
      <button onClick={handleSearch} disabled={!selectedOption || !inputValue}>
        Buscar
      </button>
    </div>
  )
}
