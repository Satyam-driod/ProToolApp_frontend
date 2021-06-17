import React, { Component } from 'react'
import "./WhiteBoard.css";
import RangeSlider from 'react-bootstrap-range-slider';


 class WhiteBoard extends Component {

    constructor(props){
        super(props);
        this.state={
            color:'black',
            size:5,

        };
    }

    color = (event) => {
        event.preventDefault();
        this.setState({ color: event.target.value });
    };

    changeWidth =(event)=>{
        event.preventDefault();
        this.setState({size:event.target.value});
        console.log(this.state.size);
    }

     func=()=>{
        let area=document.querySelector("#board");
        let canvas =document.querySelector('#canvas');
        var ctx = canvas.getContext("2d");
        var penColor = this.state.color;
        var pencilBtn = document.getElementById("pencil");
        var eraserBtn = document.getElementById("eraser");
        var resetBtn = document.getElementById("reset");
        //var whiteBoardWindowCloserBtn = document.getElementById("whiteboard-window-closer"); 
        var dataUrl;
        var penWidth=this.state.size;


        function setWidthAndHeight() {
        canvas.height = area.clientHeight - 20;
        canvas.width = area.clientWidth - 20;
        }

        window.addEventListener("load", () => {
            try {
                dataUrl = localStorage.getItem("drawing");
                var dataImg = new Image;
                dataImg.src = dataUrl;
                dataImg.onload = () => {
                    ctx.drawImage(dataImg, 0, 0);
                }
            }
            catch {}
            setWidthAndHeight();
            let isPainting = false;
            function paint(evt) {

                if(!isPainting) return;
                ctx.lineWidth = penWidth;
                ctx.lineCap = "round";
                ctx.strokeStyle = penColor; 
                ctx.lineTo(evt.clientX-60, evt.clientY-175);
                ctx.stroke();
            };
            canvas.addEventListener("mousedown",(evt)=>{isPainting = true;paint(evt);});
            canvas.addEventListener("mouseup",()=>{
                isPainting = false;
                ctx.beginPath();
                localStorage.setItem("drawing", canvas.toDataURL());
            });
            canvas.addEventListener("mousemove",paint)
            // console.log(color);
            pencilBtn.addEventListener("click", () => {penColor = this.state.color; penWidth=penWidth;});
            eraserBtn.addEventListener("click", () => {penColor = "white"; penWidth=15;});
            resetBtn.addEventListener("click", () => {
                ctx.clearRect(0,0,canvas.width, canvas.height)
                localStorage.removeItem("drawing"); 
            });
        });

        window.addEventListener("resize", () => {
        //  try
        //       {localStorage.removeItem("drawing");}
        //    catch{}
            localStorage.setItem("drawing", canvas.toDataURL());
            setWidthAndHeight();
            dataUrl = localStorage.getItem("drawing");
            var dataImg = new Image;
            dataImg.src = dataUrl;
            dataImg.onload = () => {
                ctx.drawImage(dataImg, 0, 0);
            }
        });
    }
    componentDidMount(){
       this.func();
    }
    render() {
        return (
            <div id="board">
             	<div id="drawing-tools"  role="group" aria-label="drawing tools">
                    <button id="pencil" type="button" 
                    class="btn btn-secondary button">Pencil
                    </button>
                    <button id="eraser" type="button" 
                    class="btn btn-secondary button">Eraser
                    </button>
                    <button id="reset" type="button" 
                    class="btn btn-secondary button">Reset
                    </button>
                    <span className="ml-2">penColor</span>
                    <select
                        value={this.state.color}
                      onChange={this.color}
                    id="tags"
                    className=" ml-1 color"
                    >
                    <option value="Black">Black</option>
                    <option value="Red">Red</option>
                    <option value="Blue">Blue</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Orange">Orange</option>
                    
                    </select>
                   
                    
                    </div>
                    <br></br>
                    <canvas id="canvas"></canvas>
                    
        </div>
        )
    }
}

export default WhiteBoard
