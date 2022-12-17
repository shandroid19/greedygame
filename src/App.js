import logo from './logo.svg';
import { useState,useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditPanel from './components/EditPanel';

function App() {
  const [data,setdata] = useState([]);
  useEffect(()=>{
    fetch('https://go-dev.greedygame.com/v3/dummy/report?startDate=2000-12-01&endDate=2001-01-01').then((data)=>{return data.json()})
    .then((res)=>{setdata(res.data)});
  },[]) 
  return (
    <div className='container-fluid p-5'>
      <div className='row'><h3>Analytics</h3></div>
      <EditPanel data={data}/>
    </div>
  );
}

export default App;
