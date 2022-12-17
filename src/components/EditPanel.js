import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import Columns from './Columns'
export default function EditPanel({data}){
    return(
    <div className="container-fluid">
        <div className="row d-flex justify-content-between my-5">
            <div className="col-6 ">
                <div className="row d-flex justify-content-between">
                    <div className="col-3">
                        <p>Start Date:</p>
                        <input type='date'></input>
                    </div>
                    <div className="col-3">
                        <p>End Date:</p>
                        <input type='date'></input>
                    </div>
                </div>
            </div>
            <div className="col-3 d-flex justify-content-center">
            <button className="btn btn-sm btn-light">Settings</button>
            </div>
        </div>
        <div className='row'>
            <Columns/>
        </div>

    </div>)
}