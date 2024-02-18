import React, { useState, useEffect } from 'react';
import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, Button } from '@mui/material';
import flightData from './flightData.json';
import Pagination from '@mui/material/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [age, setAge] = React.useState('');
  const [category, setCategory] = React.useState('');

  useEffect(() => {
    setData(flightData);
    setFilteredData(flightData);
  }, []);

  const columns = [
    { Header: 'Checkbox', accessor: 'checkbox', Cell: () => <Checkbox /> },
    { Header: 'ID', accessor: 'id' },
    { Header: 'SHPIIFY', accessor: 'flight_number' },
    { Header: 'Name', accessor: 'first_name' },
    { Header: 'Origin', accessor: 'departure_airport' },
    { Header: 'Destination', accessor: 'arrival_airport' },
    { Header: 'Departure Time', accessor: 'departure_time' },
    { Header: 'Arrival Time', accessor: 'arrival_time' },
    { Header: 'Departure Date', accessor: 'departure_date' },
    { Header: 'Arrival Date', accessor: 'arrival_date' },
    { Header: 'Departure Airport', accessor: 'departure_airport' },
    { Header: 'Arrival Airport', accessor: 'arrival_airport' },
    { Header: 'Passenger Count', accessor: 'passenger_count' },
  ];

  const handleRowFilterChange = (filterText) => {
    const filtered = flightData.filter((row) => {
      return Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(filterText.toLowerCase())
      );
    });
    setFilteredData(filtered);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSearch = () => {
    // Perform search logic here if needed
    // You can access the current values of age and category using the state
  };

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', marginRight: '17px' }}>
        <h1 style={{ textAlign: 'left', marginLeft: '30px' }}>Orders</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ marginLeft: '10px', minWidth: '17%', height: '55px', marginTop: '20px', marginRight: '10' }}
        >
          CREATE NEW
        </Button>
      </div>
      <Box boxShadow={8} p={3} mb={3} borderRadius={5} margin={5}>
      <div style={{ display: 'flex', marginLeft: '30px', marginBottom: '0px', marginTop: '5px', alignItems: 'flex-start' }}>
          <h4 style={{ flex: '40%', marginLeft: '30px' }}>What are you looking for?</h4>
          <h4 style={{ flex: '15%' }}>Category</h4>
          <h4 style={{ flex: '20%', marginRight: '19%' }}>Status</h4>
        </div>
        <div style={{ display: 'flex', marginLeft: '30px', marginBottom: '0px', marginTop: '5px', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faSearch} style={{ color: "#9c9fa5", marginRight: '10px', height: '20px' }} />
          <TextField
           
            label="Search for category, name, company, etc"
            variant="outlined"
            onChange={(e) => handleRowFilterChange(e.target.value)}
            style={{ width: '40%' }}
          />

          <FormControl variant="outlined" style={{ marginLeft: '10px', minWidth: '17%' }}>
            <InputLabel id="demo-simple-select-label">All</InputLabel>
            <Select value={age} onChange={handleAgeChange}>
              {/* Menu Items */}
            </Select>
          </FormControl>

          <FormControl variant="outlined" style={{ marginLeft: '10px', minWidth: '17%' }}>
            <InputLabel id="demo-simple-select-label">All</InputLabel>
            <Select value={category} onChange={handleCategoryChange}>
              {/* Menu Items */}
            </Select>
          </FormControl>

          <Box marginLeft={'10px'} marginRight={'10px'}>
            <FontAwesomeIcon icon={faAnglesDown} style={{ color: "#9c9fa5", height: '20px' }} />
            </Box>

<Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: '10px', minWidth: '17%', height: '55px' }}>
  Search
</Button>
</div>
</Box>
<Box boxShadow={8} p={3} mb={3} borderRadius={5} margin={5}>
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
<h3 style={{ marginLeft: '7px' }}>Product Summary</h3>
  <p style={{ marginRight: '0px', alignItems: 'right', marginLeft: '25%' }}>Show</p>
  <FormControl variant="outlined" style={{ marginLeft: '10px', minWidth: '17%' }}>
    <InputLabel id="demo-simple-select-label"><strong>ALL COLUMN</strong></InputLabel>
    <Select value={age} onChange={handleAgeChange}>
      {/* Menu Items */}
    </Select>
  </FormControl>

  <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: '10px', minWidth: '17%', height: '55px' }}>
    DISPATCHED SELECTED
  </Button>
  <Pagination
    checkboxSelection={true}
    count={Math.ceil(filteredData.length / rowsPerPage)}
    page={page + 1}
    onChange={handlePageChange}
    shape="rounded"
    color="primary"
  />
</div>

<TableContainer component={Paper} style={{ maxHeight: '600px' }}>
<Table>
  <TableHead>
    <TableRow>
      {columns.map(column => (
        <TableCell key={column.Header}>{column.Header}</TableCell>
      ))}
    </TableRow>
  </TableHead>
  <TableBody>
    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
      <TableRow key={row.id}>
        {columns.map(column => (
          <TableCell key={column.Header}>{row[column.accessor]}</TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer>
</Box>
</div>
);
}

export default App;

