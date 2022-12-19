import { useState,useEffect,useRef } from "react"
import { useSelector } from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSort} from '@fortawesome/free-solid-svg-icons'

    export default function Table(){

    var columns = useSelector((state)=>state.table.order);  //order of columns
    var rows = useSelector((state)=>state.table.rows);      //data in the rows
    var todeleteperm = useSelector((state)=>state.table.todelete)   //deleted rows


    const filtermenu = useRef();                              //menu to choose filtering field
    const [currentSort,setCurrentSort] = useState('default')
    const [mode,setmode] = useState("");
    const [filterstr,setfilterstr] = useState("");            //string for filtering 
    const [refresh,setrefresh] = useState(true);
    useEffect(()=>{
        setrefresh(!refresh)
    },[rows,columns])

    const sortTypes = {                                     //all sorting options
      ascending: {
        class: 'sort-up',
        fn: (a, b) => {
          if(typeof a==='object'){
            return ('' + a[mode]).localeCompare(b[mode]);
          }
          else
            return a[mode] - b[mode]
        }
      },
      descending: {
        class: 'sort-down',
        fn: (a, b) => {
          if(typeof a==='object'){
            return ('' + b[mode]).localeCompare(a[mode]);
          }
          else
            return b[mode] - a[mode]
        }
      },
      default: {
        class: 'sort',
        fn: (a, b) => a
      }
    };

    const onSortChange = () => {          //to switch the sorting order
      
      let nextSort;
  
      if (currentSort === 'descending') nextSort = 'ascending';
      else if (currentSort === 'ascending') nextSort = 'default';
      else if (currentSort === 'default') nextSort = 'descending';
  
      setCurrentSort(nextSort);
    };
    
        return (
          <div className="container">
          <div className="row d-flex align-items-center px-5">
            <div className="col-3">
            <button className="btn btn-outline-primary" onClick={onSortChange}>
              Sort mode: {currentSort}
            </button>
            </div>

            <div className="col-3">
          <select ref={filtermenu} className='form-control' name="">
            {columns.map((item)=>{return <option key={item.name} value={item.name}>Filter by {item.name}</option>})} 
            </select>
          </div>

            <div className="col-4">
              <input type={'text'} onChange={(e)=>setfilterstr(e.currentTarget?.value)} placeholder={"Search here.."}></input>
            </div>
          </div>
          
          <div className="row p-5">
          <table className="table table-striped">
            <thead>
              <tr>
                {
                columns.map(column => {
                  if(todeleteperm.indexOf(column.name)===-1)
                    return <th id={column.id} onClick={(ev)=>{setmode(ev.currentTarget.id)}} key={column.id}><FontAwesomeIcon icon={faSort}></FontAwesomeIcon>{column.name}</th>
                })}
              </tr>
            </thead>
            <tbody>
              {[...rows]
              .sort(sortTypes[currentSort].fn)
              .filter(e=>e[filtermenu.current?.value]?.includes(filterstr))
              .map((row,key) => {
                return (
                  <tr key={key}>
                    {columns.map(column => {
                      if(todeleteperm.indexOf(column.name)===-1)
                        return <td key={column.id}>{row[column.id]} {column.id=='ctr' || column.id=='fill_rate'?'%':''}</td>

                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
          </div>
          </div>
        )
      }
