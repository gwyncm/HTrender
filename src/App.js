import React, { useState } from 'react';
import './App.css';
import countries from './countries.json';
import data from './data.json';
import pages from './normal.json';
//import pages from './model.json';

function Datatable(props) {

  const getFlag = (country) => { 
    return `/flags/${country}.svg`
  }

  var data = props.data
  var mode = props.item.mode
  
   var dupe = mode === 1 || mode === 6;
   var comp = mode === 2 || mode === 3 ? { "background": "pink"} : null;
   var foreign = mode === 4 || mode === 3 ? { "background": "pink"} : null;
   var other = mode === 5 ? { "background": "lightblue"} : null;
   var del = mode === 6;
   var names = Object.getOwnPropertyNames(data[0])

  const contact = [ 1,2,3,4,5,6 ]
  const station = [ 7,8,9,10,11]
  const repeat = [ 12,13,14 ]

  var keys = [
    { project: [ ...contact, ...station ] },    //  0
    { project: [  ...contact, ...repeat ] },    //  1
    { project: [  ...contact ] },               //  2
    { project: [ 3, ...station ] },             //  3
    { project: [  0, ...contact ] },            //  4
    ]
  var project = keys[props.item.key].project

  return (
    <div>
   
    <table className="table table-condensed" style={{ "font" : "23px areal"}}>
         <thead><tr>

         { names.map((name,index) => ( project.indexOf(index) >= 0 ? 
          <th key={ index }>{ name.charAt(0).toUpperCase() + name.slice(1) }</th> : null ))}
      
         </tr></thead>
         <tbody>
         {data.filter( (item,index) => { 
            if (dupe === false && item.id === 0 ) return false;
            if (del === true && item.id === 1 ) return false;
            return true;
            } ).map(item => (
          
          <tr key={item.id}>
         { project.indexOf(0) >= 0  ? <td> { item.id } </td> : null }
         { project.indexOf(1) >= 0 ? <td style={comp}> { item.date } </td> : null }
         { project.indexOf(2) >= 0 ? <td style={comp}> { item.time } </td> : null }
         { project.indexOf(3) >= 0 ? <td style={ foreign } > { item.call } </td>  : null }
         { project.indexOf(4) >= 0 ?   <td style={other}> { item.band } </td>  : null }
          { project.indexOf(5) >= 0 ?   <td style={other}> { item.freq } </td> : null }
          { project.indexOf(6) >= 0 ?   <td> { item.mode } </td> : null }
          { project.indexOf(7) >= 0 ? <td> { item.grid } </td> : null }
          { project.indexOf(8) >= 0 ? <td><img className="flag" src={getFlag(item.country)} alt={item.country}></img></td> : null }
         { project.indexOf(9) >= 0 && item.id === 0 ? <td>USA</td> : null }
         { project.indexOf(9) >= 0 && item.id !== 0 ? <td> { countries[item.country.toUpperCase()] } </td> : null }
         { project.indexOf(10) >= 0 ?   <td> { item.name } </td> : null }
          { project.indexOf(11) >= 0 ?   <td> { item.comment } </td> : null }
          { project.indexOf(12) >= 0 ?   <td> { item.date2 } </td> : null }
          { project.indexOf(13) >= 0 ?   <td> { item.time2 } </td> : null }
          { project.indexOf(14) >= 0 ?   <td> { item.freq2 } </td> : null }
         </tr> ))}
          </tbody>
       </table>
       </div>
      )
}

const PAGE = 0
const TABLE = 1

const sequence0 = {
  title: "Data modeling and design",
  items: [
  { type: PAGE, page: 0, keys: [] }, 
  { type: PAGE, page: 0, keys: [0] },
  // 2
  ] 
}

const sequence = {
  title: "Normalization for data modeling",
  items: [
  { type: PAGE, page: 0, key: 0, mode: 0 }, 
  { type: PAGE, page: 0, key: 0, mode: 1 },
  // 2
  { type: PAGE, page: 1, key: 0, mode: 0  },
  { type: PAGE, page: 1, key: 0, mode: 1  },
  { type: TABLE, key: 0, mode: 0   },
  { type: PAGE, page: 1, key: 1, mode: 1  },
  { type: TABLE, key: 0, mode: 0  },
  { type: PAGE, page: 1, key: 2, mode: 1   },
  { type: PAGE, page: 1, key: 3, mode: 1   },
  { type: TABLE, keys: [2,3], key: 0,  },
  { type: PAGE, page: 1, key: 4, mode: 1   },
  // 11
  { type: PAGE, page: 2, key: 0, mode: 0  },
  { type: PAGE, page: 2, key: 0, mode: 1  },
  { type: TABLE, key: 1, mode: 1 },  
  { type: PAGE, page: 2, key: 1, mode: 1  },
  { type: TABLE, key: 0, mode: 2 }, 
  { type: PAGE, page: 2, key: 2, mode: 1  },
  { type: TABLE, key: 0, mode: 2 }, 
  { type: PAGE, page: 2, key: 3, mode: 1  },
  { type: TABLE, key: 0, mode: 2}, 
  { type: PAGE, page: 2, key: 4, mode: 1  },
  { type: TABLE, key: 0, mode: 6 },  
 // 22
  { type: PAGE, page: 3, key: 0, mode: 0  },
  { type: PAGE, page: 3, key: 0, mode: 1  },
  { type: TABLE, key: 2, mode: 3  },  
  { type: PAGE, page: 3, key: 0, mode: 2 }, 
  { type: TABLE, key: 3, mode: 3  },    
  { type: PAGE, page: 3, key: 0, mode: 3 }, 
  { type: TABLE, key: 2, mode: 5 }, 
// 30
  { type: PAGE, page: 4, key: 0, mode: 0 },
  { type: PAGE, page: 4, key: 0, mode: 1  },
  { type: TABLE, key: 4, mode: 4  },  
  { type: PAGE, page: 4, key: 0, mode: 2  }, 
  { type: TABLE, key: 3, mode: 4   }, 
  ] 
}

function Showpage(props) {

  var page = props.pages[props.item.page]
  //var keys = props.item.keys
  var keys = Array(props.item.mode).fill(props.item.key).map((x,i) => x + i);

  return (
  <span>
    <span style={{ "textAlign": "center"}}>
        <h2>{ page.title}</h2>
        <hr style={{ "height" :"3px", "background": "blue" }}/>
    </span>
    <span >
    <ul style={{ "marginLeft" : "80px" }}>
      {page.items.map( (item, index) => (
        <li key={index}><h3>
          <span style={{ "color" : "black"}}>{item.point}</span></h3>
        <ul>
        { keys.indexOf(index) >= 0  ? item.texts.map( (text,index) => (
        <li key={index}><h4>{text}</h4></li>
        )) : null }
        </ul>
        </li>
      ))}
    </ul>
    </span>
  </span> )
}

function App() {

  const [page,setPage] = useState(0)
 
  const upPage = () => { 
    if ((page+1)<sequence.items.length) { 
      setPage(page+1) }
  }
  
  const handleChange = (e) => {
    var value = parseInt(e.target.value)
    if (value >= 0 && value < sequence.items.length) setPage(value)
  }

  return (
    <div className="App">
      <header className="App-header">
    <span>
      <button className="btn btn-primary btn-sm" onClick={() => upPage()}>Page</button>
      &nbsp;
      <input type="number" value={ page } className="short" name="page" onChange={handleChange}></input>
      &nbsp;
      <input type="number" value={ sequence.items.length } disable="true" readOnly className="short"></input>
    </span>

        <p>
          { sequence.title }
        </p>
      </header>

      { sequence.items[page].type === TABLE  ? <Datatable data={data} item={sequence.items[page]}></Datatable> : null }
      { sequence.items[page].type === PAGE  ? <Showpage pages={pages} item={sequence.items[page]}></Showpage> : null }
      
    </div>
  )
}

export default App;
