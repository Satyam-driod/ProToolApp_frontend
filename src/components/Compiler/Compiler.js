import React, { Component } from 'react'
import './Compiler.css';


class Compiler extends Component {

    constructor(props) {
        super(props);
        this.state = {
          input: ``,
          output: ``,
          language_id: 52,
          user_input: ``,
        };
      }

      input = (event) => {
        event.preventDefault();
        this.setState({ input: event.target.value });
      };
      userInput = (event) => {
        event.preventDefault();
        this.setState({ user_input: event.target.value });
      };
      language = (event) => {
        event.preventDefault();
        this.setState({ language_id: event.target.value });
      };

      submit = async (e) => {
        e.preventDefault();
        let outputText = document.getElementById("output");
        outputText.innerHTML = "";
        outputText.innerHTML += "Creating Submission ...\n";
        const response = await fetch(
          "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&fields=*",
          {
            method: "POST",
            "headers": {
              "content-type": "application/json",
              "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`,
              "x-rapidapi-host": "judge0-ce.p.rapidapi.com"
            },
            body: JSON.stringify({
              source_code: this.state.input,
              stdin: this.state.user_input,
              language_id: this.state.language_id,
            }),
          }
        );
        outputText.innerHTML += "Submission Created ...\n";
        const jsonResponse = await response.json();
        // console.log(jsonResponse.token);
        
        if(response.ok){
          let jsonGetSolution = {
            status: { description: "Queue" },
            stderr: null,
            compile_output: null,
          };
      
          while (
            jsonGetSolution.status.description !== "Accepted" &&
            jsonGetSolution.stderr == null &&
            jsonGetSolution.compile_output == null
          ) {
            outputText.innerHTML = `Creating Submission ... <br>Submission Created ...<br>Checking Submission Status<br>status : ${jsonGetSolution.status.description}`;
            if (jsonResponse.token) {
              let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=false`;
      
              const getSolution = await fetch(url, {
                method: "GET",
                headers: {
                  "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
                  "x-rapidapi-key": `${process.env.REACT_APP_API_KEY}`, //// Get yours for free at https://rapidapi.com/hermanzdosilovic/api/judge0
                  "content-type": "application/json",
                },
              });
              
              jsonGetSolution = await getSolution.json();
              // console.log(jsonGetSolution);
            }
          }
          if (jsonGetSolution.stdout) {
            const output = (jsonGetSolution.stdout);
            console.log(output);
      
            outputText.innerHTML = "";
      
            outputText.innerHTML += `Results : ${output}<br>Execution Time : ${jsonGetSolution.time} Secs<br>Memory used : ${jsonGetSolution.memory} bytes`;
          } else if (jsonGetSolution.stderr) {
            const error = atob(jsonGetSolution.stderr);
      
            outputText.innerHTML = "";
      
            outputText.innerHTML += `\n Error :${error}`;
          } else {
            const compilation_error = atob(jsonGetSolution.compile_output);
      
            outputText.innerHTML = "";
      
            outputText.innerHTML += `\n Error :${compilation_error}`;
          }
        }
      };

    render() {
        return (
            <div className="compiler">
            <div className="row container-fluid">
                <div style={{minHeight:'500px' ,left:'0px', margin:'0px',width:'60%',minWidth:'500px'}}>
                    
                    <textarea require name="solution" id="source" wrap="off" autoCapitalize="none" autoCorrect="off" spellCheck="false"
                    className=" source" defaultValue={this.input} onChange={this.input}></textarea>
                </div>
                <div style={{minWidth:'450px',backgroundColor:'white',padding:'20px',}}>
                    <h4>Language</h4>
                    <select
                      value={this.state.language}
                      onChange={this.language}
                    id="tags"
                    className="form-control form-inline mb-2 language"
                    >
                    <option value="52">C++</option>
                    <option value="50">C</option>
                    <option value="62">Java</option>
                    <option value="71">Python</option>
                    </select>


                    <button
                    type="submit"
                    className="btn btn-danger  "
                       onClick={this.submit}
                    >
                    <i class="fas fa-cog fa-fw"></i> Run
                    </button>
                    <div className="">
                        <h4>User Input</h4>
                        <br />
                        <textarea id="input"
                            onChange={this.userInput}
                            defaultValue={this.userInput}
                        ></textarea>
                    </div>
                        <div>
                        <h4>Output</h4>
                            <div id="output">{this.output}</div>
                        </div>
                </div>   
            </div>   
        </div>
        )
    }
}

export default Compiler

