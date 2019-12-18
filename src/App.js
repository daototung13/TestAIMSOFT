import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
    const axios = require('axios');
    const [provinces, setProvinces] = useState(null);
    const [provinceName, setProvinceName] = useState(null);


    const getProvinces = () => {
        axios.get('http://localhost:8888/get_provinces')
            .then((res) => {
              setProvinces(res.data)
            })
            .catch((err => {
              console.log(err)
            }))
    };
    const addProvinces = (event) => {
      event.preventDefault();
      if (provinceName && provinceName !== '') {
        axios.post('http://localhost:8888/get_provinces', {
          name: provinceName
        })
         .then(() => {
              getProvinces();
              setTimeout(() => {
                alert('create province success')
              }, 2000)
          })
            .catch((err) => console.log(err))

      }
    };

    const handleChangeProvinceName = (e) => {
      setProvinceName(e.target.value)
    };
  useEffect(() => {
    getProvinces()
  }, []);

    return (
        <div className="App">
            <div className="main">
                <h2 className='main_title'>Bài 3</h2>
                <p className='main_desc'>
                  bài này em không dựng được con server nên không biết làm tiếp thế nào
                </p>
                <div>
                  <div>
                    <h5 className='provinces_title'>Name</h5>
                    <div>
                      {
                         provinces  ? (
                            <select onChange={getProvinces}>
                              {
                                provinces.map((province) => (
                                        <option key={province.id}>{province.name}</option>
                                    )
                                )
                              }
                            </select>
                        ) : ''
                      }
                    </div>
                  </div>
                </div>
                <form onSubmit={addProvinces}>
                    <label>
                        Province Name:
                        <input onChange={handleChangeProvinceName}   type="text" name="name"/>
                    </label>
                    <button type='submit' className={provinceName ? 'border_gray' : ''} disabled={ provinceName === null || provinceName === ''}>Add</button>
                </form>
            </div>
        </div>
    );
}

export default App;
