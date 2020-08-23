import React, { Component } from 'react'

class Login extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             email:"",
             password:"",
             cheems:{}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChange(e){
        this.setState(
            {[e.target.name] : e.target.value }
        );
    }

    onSubmit(e){
        e.preventDefault();

        const Post = {
            email : this.state.email,
            password : this.state.password
        }
        fetch("http://localhost:7003/users/login",{
            method:"POST",
            headers:{
                'content-type':'application/json'
            },
            body : JSON.stringify(Post)
        })
        .then(res=>res.json())
        .then(rems=>{
            console.log(rems);
            this.setState(
                this.state.cheems=rems
            );
        });
    }
   
    render() {
        return (
            <div className="container-sm w-25">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </div>
                    <br/>
                    <button className="btn btn-success" type="submit">Done</button>
                </form>  
                <hr/>
                <div>
                    <h3>{this.state.cheems.message}</h3>
                </div>
            </div>
        )
    }
}


export default Login;
