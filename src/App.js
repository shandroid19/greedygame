import { useState,useEffect,useRef } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from './components/Table';
import Columns from './components/Columns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSliders } from '@fortawesome/free-solid-svg-icons'
import { populate,filldata } from './redux/slices/tableslices';

function App() {
  const [data,setdata] = useState([]);
  const from =  useRef();                 //from date ref
  const to =  useRef();                   //to date ref
  const dispatch = useDispatch();
  const [refresh,setrefresh] = useState(true);      //to force re-render the components 
  const [openPanel,setOpenPanel] = useState(false);
  const coldata = [                                     //columns fields along with the order
    {name:"date",order:0,id:'date'},
    {name:"app_id",order:1,id:'app_id'},
    {name:"requests",order:2,id:'requests'},
    {name:"responses",order:3,id:'responses'},
    {name:"impressions",order:4,id:'impressions'},
    {name:"clicks",order:5,id:'clicks'},
    {name:"revenue",order:6,id:'revenue'},
    {name:"fill_rate",order:7,id:'fill_rate'},
    {name:"ctr",order:8,id:'ctr'},
]

  const closepanel = ()=>{
      setOpenPanel(false);
  }
  const onSettings = ()=>{
      setOpenPanel(true);
  }

  const onChangeFrom = ()=>{
      if(to.current.value)
          makeRequest();
  }
  const onChangeTo= ()=>{
      if(from.current.value)
          makeRequest();
  }



  const makeRequest=()=>{             //making a request to the API
    setrefresh(!refresh)
    fetch('https://go-dev.greedygame.com/v3/dummy/report?startDate=2000-12-01&endDate=2001-01-01').then((data)=>{return data.json()})
    .then((res)=>{
      setdata(res.data);
      dispatch(populate(coldata));
      setdata(dispatch(filldata(res.data)).payload);
    }).catch((err)=>console.log(err));
  }

  //caption to display when there is no data
  const caption = <div className='container p-5'>      
    <div className='row justify-content-center d-flex'>
      <div className='col-sm justify-content-center d-flex '>
            <h4>Select From and To dates to view the table</h4>
      </div>
    </div>
  </div>

  return (
    <div className='container-fluid p-5'>
      <div className='row'><h3>Analytics</h3></div>
      {/* <div><button onClick={makeRequest} className='btn'>request</button></div> */}

      <div className="container">

<div className="row d-flex justify-content-between my-5">     
    <div className="col-6 ">    
        <div className="row d-flex">
            <div className="col-6 d-flex align-items-center">
                <b><label className='form-label'>From&nbsp;</label></b>                                      
                <input type='date' onChange={onChangeFrom} ref={from} className='form-control'></input>
            </div>
            <div className="col-6 d-flex align-items-center">
            <b><label className='form-label'>To&nbsp;</label></b>

                <input type='date' ref={to} onChange={onChangeTo} className='form-control'></input>
            </div>
        </div>
    </div>
    <div className="col-6 d-flex justify-content-end">
        <button disabled={!data.length} onClick={onSettings} className="btn btn-sm btn-primary py-0"><FontAwesomeIcon icon={faSliders} />&nbsp;Settings</button>
    </div>
</div>
<div className='row'>
    {openPanel?<Columns closepanel={closepanel}/>:<></>}
</div>

</div>
      <div className='row'>
        {data.length?<Table rows = {data}/>:caption}
        </div>
    
    </div>
  );
}

export default App;
