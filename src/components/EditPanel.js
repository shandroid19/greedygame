import { useState,useRef } from 'react';
import Columns from './Columns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSliders } from '@fortawesome/free-solid-svg-icons'
export default function EditPanel({data}){
    
    const from =  useRef();
    const to =  useRef();

    const [openPanel,setOpenPanel] = useState(false);
    const closepanel = ()=>{
        setOpenPanel(false);
    }
    const onSettings = ()=>{
        setOpenPanel(true);
    }
    const onChangeFrom = ()=>{
        console.log(!to.current.value)
    }
    const onChangeTo= ()=>{
    }
    return(
    <div className="container p-5">

        <div className="row d-flex justify-content-between my-5">
            <div className="col-6 ">
                <div className="row">
                    <div className="col-6">
                        <b><label className='form-label'>From</label></b>
                        <input type='date' onChange={onChangeFrom} ref={from} className='form-control'></input>
                    </div>
                    <div className="col-6">
                    <b><label className='form-label'>To</label></b>

                        <input type='date' ref={to} onChange={onChangeTo} className='form-control'></input>
                    </div>
                </div>
            </div>
            <div className="col-6 d-flex justify-content-end">
                <button onClick={onSettings} className="btn btn-sm btn-primary py-0"><FontAwesomeIcon icon={faSliders} />&nbsp;Settings</button>
            </div>
        </div>
        <div className='row'>
            {openPanel?<Columns closepanel={closepanel}/>:<></>}
        </div>

    </div>)
}