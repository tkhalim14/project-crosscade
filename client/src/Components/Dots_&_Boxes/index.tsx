import React, { useState, useEffect } from 'react';
import './index.css';

function DotsAndBoxes() {
  const [nbRows, setNbRows] = useState(6);
  const [nbCols, setNbCols] = useState(6);
  const [timelimit, setTimelimit] = useState(0.5);
  // const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    // Load external scripts
    loadScript('https://d3js.org/d3.v4.min.js');
    loadScript('dotsandboxes.js');
  }, []);

  const loadScript = (src: string) => {
    const existingScript = document.querySelector(`script[src="${src}"`);
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    }
  };
  
  

  return (
    <div>
      <div className="container">
        <h1>Dots and Boxes</h1>
        <div className="row">
          <div className="col-md">
            <div id="playing-area"></div>
          </div>
          <div className="col-md">
            <div className="form-group">
              <p>Size of game:</p>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Rows and Columns</span>
                </div>
                <input type="number" className="form-control" id="nb-rows" value={nbRows} onChange={(e) => setNbRows(parseInt(e.target.value))} min="1" />
                <input type="number" className="form-control" id="nb-cols" value={nbCols} onChange={(e) => setNbCols(parseInt(e.target.value))} min="1" />
              </div>
            </div>
            <div className="form-group">
              <p>Time limit:</p>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Timelimit</span>
                </div>
                {/* <input type="number" className="form-control" id="timelimit" value="0.5" step="0.5" min="0" /> */}
                <input type="number" className="form-control" id="timelimit" value={timelimit} onChange={(e) => setTimelimit(parseFloat(e.target.value))} step="0.5" min="0" />
              </div>
            </div>
            <div className="form-group">
            <p>Players:</p>
            <div className="input-group mb-3">
            <div className="input-group-prepend"><span className="input-group-text" id="basic-addon3">Agent 1</span></div>
            <input type="text" className="form-control" id="agent1" aria-describedby="basic-addon3" />
            </div>
            <div className="input-group mb-3">
            <div className="input-group-prepend"><span className="input-group-text" id="basic-addon3">Agent 2</span></div>
            <input type="text" className="form-control" id="agent2" aria-describedby="basic-addon3" />
            </div>
            <p>Fill in the address where an agent can be reached using WebSockets (e.g. ws://127.0.0.1:8089).
            If a field is empty a human player is assumed.
            </p>
            <button type="button" className="btn btn-secondary" id="restart-btn">Restart game</button>
            </div>
          </div>
        </div>
        <div className="footer">
        <small>&copy; <a href="https://dtai.cs.kuleuven.be">DTAI Research Group</a>, KU Leuven &mdash; <a href="https://github.com/wannesm/dotsandboxes">Source</a></small>
        </div>
      </div>
      
    </div>
  );
}

export default DotsAndBoxes;