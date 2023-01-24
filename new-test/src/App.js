
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';

function App() {

  const [data, setData] = useState([])
  useEffect(()=>{
    fetchData()
  },[])

  const fetchData = async()=>{
    try {
      const res = await axios.get('https://mocki.io/v1/119fcd44-274e-43f1-a991-546ac6d679f2');
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  } 
const numberWithCommas = (x) => {
    if (typeof x !== "number") return x;
    const numFix = x.toFixed(2);
    return numFix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const cutName = (nameCust) =>{
  if(nameCust.length>30){
      return nameCust.slice(0,30).concat("...")
  }else{
    return nameCust
  }
}
const convertDate =(date)=>{
  let numDate= new Date(date);
  return formatDate(numDate)
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  const date2= [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('.');
  return date2
}

function checkProjectState(project) {
  if(project==="In progress"){
    return "progress status"
  }else if(project==="Done"){
    return "done status"
  }else if(project==="Cancelled"){
    return "cancelled status"
  }else if(project==="Negotiation"){
    return "negotiation status"
  }
}

const searchAdressOrName=(event)=>{
  if(event.target.value.length>2){
    const filteredArray=data.filter(item=>{
      
      return item.address.toLowerCase().indexOf(event.target.value.toLowerCase())>=0||item?.customerName?.toLowerCase().indexOf(event.target.value.toLowerCase())>=0
   
    })
    return setData(filteredArray)
  }else{
    return fetchData()
  }
}
  return (
    <div className='main__container'>
      <h1>Contracts</h1>
      <div className='container__projects'>
        <div className='searching'>
          <input onChange={searchAdressOrName}/>
          <SearchIcon/>
        </div>
        <div className='projects'>
          {
            data.map((item, index)=>{
              return(
              
                  <div className='project'key={index}>
                    <div className='projects__head'>
                      <div className='bold__text'>{item.customerName?cutName(item.customerName):"No name"}</div>
                      <div className='grey__text'>ID: {item.projectId}</div>
                    </div>
                    <div className='projects__body'>
                      <div className='address'>{item.address}</div>
                      <div key={item} className='rooms'>
                      {
                        item.rooms.map((item, index)=>{
                          return(
                           <div key={index}>{item.name}</div>
                          )
                        })
                      }
                      </div>
                      <div className='project__info'>
                       <div>
                        <div className='grey__text'>Last update:</div>
                        <div className='date__and__total'>{convertDate(item.updated_timestmp)}</div>
                       </div>
                       <div>
                        <div className='grey__text'>Total:</div>
                        <div className='bold__text date__and__total'>${numberWithCommas(item.totalProject)}</div>
                       </div>
                       <div>
                        <div className='grey__text'>Stage:</div>
                        <div className={checkProjectState(item.projectState)}>{item.projectState}</div>
                       </div>
                      </div>
                    </div>
                  </div>
              )
            })
          }

        </div>
      </div>

    </div>
  );
}

export default App;
