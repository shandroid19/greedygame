import { useState } from "react";
export default function Columns(){
    const data = [
        "Date",
        "App_id",
        "Requests",
        "Responses",
        "Impressions",
        "Clicks",
        "Revenue",
        "Fill rate",
        "CTR"
    ]
    const [dragId, setDragId] = useState();
    const [boxes,setBoxes] = useState(data.map((item,key)=>{return {name:item,order:key,id:item}}))

    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
        console.log(ev.currentTarget.id);
      };
    
      const handleDrop = (ev) => {
        const dragBox = boxes.find((box) => box.id === dragId);
        const dropBox = boxes.find((box) => box.id === ev.currentTarget.id);
        console.log(dragBox,dropBox);
    
        const dragBoxOrder = dragBox.order;
        const dropBoxOrder = dropBox.order;
    
        const newBoxState = boxes.map((box) => {
          if (box.id === dragId) {
            box.order = dropBoxOrder;
          }
          if (box.id === ev.currentTarget.id) {
            box.order = dragBoxOrder;
          }
          return box;
        });
    
        setBoxes(newBoxState);
      };

    return(
            <div className="card py-5">
                <div className="container-fluid d-flex justify-content-around">
                {boxes
        .sort((a, b) => a.order - b.order)
        .map((box,key) => (
            <div key={key}
                draggable={true}
                id={box.name}
                onDragOver={(ev)=>ev.preventDefault()}
                onDragStart={handleDrag}
                onDrop={handleDrop}
            className="col-1">
            <div className="selected card p-2">
                {box.name}
            </div>
            </div>
            
            ))}
        <div className='row d-flex justify-content-left'>
            <div className='col-1'><button className='btn btn-light btn-sm'>Close</button></div>
            <div className='col-1'><button className='btn btn-primary btn-sm'>Apply</button></div>
        </div>
                </div>
            </div>
    )
}