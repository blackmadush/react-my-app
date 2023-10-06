import React, { useState, useEffect } from 'react';
import './App.css';
import * as echarts from 'echarts';

function App() {
  const [inputarr, setInputarr] = useState([]);
  const [inputdata, setInputdata] = useState({ name: "", Age: "" });
  const [chartData, setChartData] = useState({
    xAxisData: [],
    yAxisData: [],
  });

  const [editRowIndex, setEditRowIndex] = useState(null); 

  function handleChange(e) {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  }

  function addToInputarr() {
    const { name: inputName, Age: inputAge } = inputdata;
    if (editRowIndex !== null) {
      const updatedInputarr = [...inputarr];
      updatedInputarr[editRowIndex] = { name: inputName, Age: inputAge };
      setInputarr(updatedInputarr);
      setEditRowIndex(null); 
    } else {
      setInputarr([...inputarr, { name: inputName, Age: inputAge }]);
    }
    setInputdata({ name: "", Age: "" });
  }

  function clearTable() {
    setInputarr([]);
    setEditRowIndex(null);
  }

  function editRow(index) {
    setEditRowIndex(index);
    const rowData = inputarr[index];
    setInputdata({ name: rowData.name, Age: rowData.Age });
  }

  function deleteRow(index) {
    const updatedInputarr = [...inputarr];
    updatedInputarr.splice(index, 1);
    setInputarr(updatedInputarr);
  }

  useEffect(() => {
    const xAxisData = inputarr.map((item) => item.name);
    const yAxisData = inputarr.map((item) => item.Age);
    setChartData({ xAxisData, yAxisData });
  }, [inputarr]);

  useEffect(() => {
    const chartDom = document.getElementById('chart');
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Population Data Visualization',
      },
      textStyle: {
        align: 'center', 
      },
      xAxis: {
        type: 'category',
        data: chartData.xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: chartData.yAxisData,
          type: 'bar',
        },
      ],
    };

    myChart.setOption(option);
  }, [chartData]);

  return (
    <div className='App'>
      <div className='form-container'>
        <h1 className='form-heading'>Population Data</h1>
        <input
          type="text"
          autoComplete='off'
          name="name"
          value={inputdata.name}
          onChange={handleChange}
          placeholder='Enter Name'
        />

        <input
          type="text"
          autoComplete='off'
          name="Age"
          value={inputdata.Age}
          onChange={handleChange}
          placeholder='Age'
        />

        <button onClick={addToInputarr}>
          {editRowIndex !== null ? 'Update' : 'Add'}
        </button>
        <button onClick={clearTable}>Clear</button>

        <table border={3} width="100%" cellPadding={10}>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {inputarr.map((info, ind) => {
              return (
                <tr key={ind}>
                  <td>{editRowIndex === ind ? (
                    <input
                      type="text"
                      name="name"
                      value={inputdata.name}
                      onChange={handleChange}
                    />
                  ) : info.name}</td>
                  <td>{editRowIndex === ind ? (
                    <input
                      type="text"
                      name="Age"
                      value={inputdata.Age}
                      onChange={handleChange}
                    />
                  ) : info.Age}</td>
                  <td>
                    {editRowIndex === ind ? (
                      <button onClick={() => addToInputarr()}>Save</button>
                    ) : (
                      <button onClick={() => editRow(ind)}>Edit</button>
                    )}
                  </td>
                  <td>
                    <button onClick={() => deleteRow(ind)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div id="chart" style={{ width: '100%', height: '300px' }}></div>
    </div>
  );
}

export default App;
