import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { populate,apply } from "../redux/slices/tableslices";
export default function Columns({closepanel}){
    
    const dispatch = useDispatch();
    const [dragId, setDragId] = useState();
    var table = useSelector((state)=>state.table.order);
    var todeleteperm = useSelector((state)=>state.table.todelete)   //the deleted fields
    var [toDelete,setToDelete] = useState([...todeleteperm]);       //to mark deletions
    const [boxes,setBoxes] = useState([...table]);                  //to reorder the fields 
    const init = [...table];

      // useEffect(()=>{                                               //
      //   const res = dispatch(populate(init));
      //   setBoxes(res.payload.slice())
      // },[])                                     


      useEffect(()=>{                                              //to populate the field cards with the actual order
        setBoxes([...table])
      },[table])


    const onClose=()=>{                                            //closing the edit panel
      const res = dispatch(populate(init));
      setBoxes(res.payload.slice())
      closepanel();
    }
    const onApply=()=>{                                           
      dispatch(populate(boxes))                                    // to apply the reordering
      dispatch(apply(toDelete))                                    //to apply the deletion changes       

        closepanel();
    }
    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
      };

    const deletefield = (ev)=>{                                   //marking deletion
        if(toDelete.indexOf(ev.currentTarget.id)!==-1)
          setToDelete(toDelete.filter((val) => val!==ev?.currentTarget.id))
        else{
          setToDelete([...toDelete,ev?.currentTarget?.id ]);
          
        }

    } 

    
      const handleDrop = (ev) => { 
        const dragBox = boxes.find((box) => box.id === dragId);
        const dropBox = boxes.find((box) => box.id === ev.currentTarget.id);
        const dragBoxOrder = dragBox.order;
        const dropBoxOrder = dropBox.order;           
        const newBoxState = boxes.map((box) => {
          if (box.id === dragId) {
              return {name:box.name,order:dropBoxOrder,id:box.id}
          }
          if (box.id === dropBox.id) {
              return {name:box.name,order:dragBoxOrder,id:box.id}
          }
          return box;
          });
          setBoxes(newBoxState)
        
      };

    return(
            <div className="card py-5">
                <div className="container-fluid w-100">
                <div className='row'>
                    <h6>Dimensions and metrics</h6>
                </div>
                  <div className="row d-flex ">
                {boxes
        .sort((a, b) => a.order - b.order)                //to sort according order specified in the columns object
        .map((box,key) => (                                     
            <div key={key}
                onClick={deletefield}
                draggable={true}
                id={box.name}
                onDragOver={(ev)=>ev.preventDefault()}
                onDragStart={handleDrag}
                onDrop={handleDrop}
            className="col-lg-2 col-md-3 col-sm-4 py-3">
            <div className={ "card p-2"+(toDelete.indexOf(box.name)===-1?' selected':'')}>
                {box.name}
            </div>
            </div>
            
            ))}
            </div>
        <div className='row d-flex justify-content-end w-100'>
            <div className='col-lg-2 col-md-3 col-sm-4'><button onClick={onClose} className='btn btn-light btn-sm'>Close</button></div>
            <div className='col-lg-2 col-md-3 col-sm-4'><button onClick={onApply} className='btn btn-primary btn-sm'>Apply</button></div>
        </div>
                </div>
            </div>
    )
}