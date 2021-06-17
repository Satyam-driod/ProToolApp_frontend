import React, {useContext, useState,useEffect} from 'react'
import {Form,Button} from 'react-bootstrap';
import './todo.css';
import UserContext from '../../UserContext';
import axios from 'axios';
import Cookies from 'js-cookie';
import {CSSTransition, TransitionGroup} from 'react-transition-group';


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function Todo() {
    const [worklist, setWorkList]=useState([]);
    const [edit,setEdit]=useState(false);
    const [work, setWork]=useState({
        id:null,
        title:'',
        completed:false,
    });
    const user = useContext(UserContext);
    var csrftoken=getCookie('csrftoken');
    const tasks=worklist;

    const changeHandler = e =>{
        setWork({...work,title:e.target.value});
    }
    
    const fetchWork = async (e)=>{
        let res =await fetch(`${process.env.REACT_APP_API_URL}/user/work/`,{
            method:'GET',
            headers: {Authorization: `Token ${Cookies.get('auth_token')}`},
        });
        
        if(res.ok){
            let response = await res.json(); 
            setWorkList(response);
        }
        else{
            let error = await res.json();
            console.log(error);
        }
    };

    const SubmitHandler =async (e)=>{
         e.preventDefault();
         var url=`${process.env.REACT_APP_API_URL}/user/work/`;
         if(edit===true){
             url=`${process.env.REACT_APP_API_URL}/user/work/${work.id}/`;
             setEdit(false);
         }  
        let res =await fetch(url,{
            body:JSON.stringify({
                user:`${user.user.username}`,
                user_id:`${user.user.id}`,
                title:work.title,
            }),
            method:'POST',
            headers: {Authorization: `Token ${Cookies.get('auth_token')}` ,"Content-Type":'application/json'},
        });

        if(res.ok){
            let response = await res.json(); 
            fetchWork();
            setWork({
               id:null,
               title:'',
               completed:false, 
            })
        }
        else{
            let error = await res.json();
            console.log(error);
        }
        
    }

    const HandleEdit=work=>{
        setEdit(true);
        setWork(work);
        console.log(work);

    }

    const HandleDelete= async (task,e)=>{
         e.preventDefault();
        let res =await fetch(`${process.env.REACT_APP_API_URL}/user/work/${task.id}/`,{
            method:'DELETE',
            headers: {Authorization: `Token ${Cookies.get('auth_token')}`,
            "Content-Type":'application/json',
            'X-CSRFToken':`${csrftoken}`,            
            },
        });

        if(res.ok){
            let response = await res.json(); 
            fetchWork();
        }
        else{
            let error = await res.json();
            console.log(error);
        }
    }

    useEffect(() => {
       fetchWork();
    }, [])
    return (

        <div className="container">
            <div className="task-container">
            <div className="form-wrapper">
            <Form onSubmit={(e)=>SubmitHandler(e)} style={{display:'flex'}} >
                <Form.Group style={{width:'450px'}}>
                    <Form.Control className="inputt" placeholder="add something" value={work.title}  onChange={(e)=>{changeHandler(e)}}></Form.Control>
                </Form.Group>
                <Button className="submit btn btn-info" variant="hidden" type="submit" >Submit</Button>
            </Form>
            </div>
            <div style={{padding:'2px'}}>
                <div id="list-wrapper">
                <TransitionGroup className="shopping-list">
                            {tasks.map(function(task,id){
                                return(
                                    <CSSTransition key={id} timeout={500} classNames="fade">
                                    <div className="task-wrapper flex-wrapper" key={id}>
                                    <div style={{flex:7}}>
                                    <span>{task.title}</span>
                                    </div>
                                    <div style={{flex:1}}>
                                    <button className="btn btn-sm  btn-outline-info"  onClick={(e)=>{HandleEdit(task)}}>Edit</button>
                                    </div>
                                    <div style={{flex:1}}>
                                    <button className="btn btn-sm  btn-outline-dark delete" onClick={(e)=>{HandleDelete(task,e)}}>-</button>
                                    </div>
                                </div>
                                </CSSTransition>
                                )
                                
                            })}
                    </TransitionGroup>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Todo
