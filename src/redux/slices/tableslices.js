import { createSlice,current } from "@reduxjs/toolkit";

export const tableSlice = createSlice({
    name:'table',
    initialState:{
        order:[],           //to maintain the order of the columns
        rows:[],            //to store the rows 
        todelete:[]         //to maintain deleted rows            
    },
    reducers:{

        populate: (state,action)=>{
            return{...state,order :action.payload} 
        },

        apply: (state,action)=>{
            state.todelete = action.payload;
        },

        filldata: (state,action)=>{
            var temprows = action.payload;              // to store unformatted data 
            state.rows = temprows.map((row)=>{
                const options = { year: 'numeric', month: 'long', day: 'numeric' };         // options converting dates to required format
                row.date= new Date(row.date)
                row.date=row.date.toLocaleDateString(undefined,options)
                const req= row.requests
                const res = row.responses
                const impressions = row.impressions
                const clicks = row.clicks
                row.requests = row.requests.toLocaleString();                               
                row.responses = row.responses.toLocaleString();
                row.impressions = row.impressions.toLocaleString();
                row.clicks = row.clicks.toLocaleString();
                row.revenue = "$"+row.revenue?.toFixed(2).toString();
                row.fill_rate=(res*100/req).toFixed(2)
                row.ctr = (clicks*100/impressions).toFixed(2)
                return row;
            })
            state.rows=temprows      
        }
    }
})

export const {rorder,handling,populate,filldata,deletecol,resurrectcol,apply} = tableSlice.actions;   //exporting all the actions 
export default tableSlice.reducer;