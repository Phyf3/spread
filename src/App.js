import {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
const XLSX = require('xlsx');
const Papa = require('papaparse')


function App() {

  const [args, setArgs] = useState([]);

  const [csv, setCsv] = useState([]);

  
  const make_cols = refstr => {
    let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
    for(var i = 0; i < C; ++i) o[i] = {name: XLSX.utils.encode_col(i), key:i};
    return o;
  }

  const readCsv = (e) => {
    console.log(e.target.files)
    const file = e.target.files
    console.log(file[0])

    Papa.parse(file[0], {
      header: false,
      skipEmptyLines: true,
      complete: function(results) {
      console.log(results.data)
      setCsv(results.data);
    }})
  }

  useEffect(() => {
    console.log("csvvv", csv)
  }, [csv])
  

    //getting data from the uploaded spreadsheet (.xlsx) file
  const readUploadFile = (e) => {
    e.preventDefault();
    // setuploading(true);
    if(e.target.files) {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = (e) => {
          /* parse the data */
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
          /* get worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, {
          header: 1
      });
      console.log("is this json", data)
      setArgs(data)
      // setCols(make_cols(ws['!ref']));
      //console.log(cols)
      }
      reader.readAsArrayBuffer(e.target.files[0])
      // setuploading(false);
    }
  }
  // console.log("cols",cols)
  // console.log("args", args)
  //console.log("inital data look",args)


  //turn the spreadsheet to a javascript object with the addresses as key and amounts as values
  const object = Object.fromEntries(args)
  const csvObject = Object.fromEntries(csv)

  //extract the addresses into one array (the addresses are the keys)
  const addressesArray = Object.keys(object)
  const csvAddressesArray = Object.keys(csvObject)

  //extract the amounts into one array (the amounts are the values)
  const amountsArray = Object.values(object)
  const csvAmountArray = Object.values(csvObject)


  console.log("array of address:", addressesArray)
  console.log("array of address:", csvAddressesArray)

  console.log("array of amounts:", amountsArray)
  console.log("array of amounts:", csvAmountArray)



  return (
    <div className="App">
      <div className="input-section">
        <form action="">
          <input type="file" name="upload" className="file-input" id="file"
          onChange={readUploadFile}/>
          <label for="file">Upload your spreasheet by clicking here</label>
          <button className="transfer-btn">Send</button>
        </form>
      </div>    



      <div>
        <input type="file" name="upload" id="" onChange={readCsv} />
        <label>CSV Upload</label>
      </div>
    </div>
  );
}

export default App;
