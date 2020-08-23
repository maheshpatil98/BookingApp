import React, { Component } from 'react';

class Signup extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
            email:"",
            password:"",
            firstName:"",
            lastName:"",
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
            password : this.state.password,
            firstName : this.state.firstName,
            lastName : this.state.lastName
        }
        fetch("http://localhost:7003/users/signup",{
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
                this.state.cheems = rems 
            );
            console.log(this.state.cheems);
        });
    }

    render() {   
        return (
            <div className="container-sm w-25">
                <form className="form-group" onSubmit={this.onSubmit}>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            required
                            value={this.state.email}
                            onChange={this.onChange}
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        />
                    </div>

                    <div>
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            required
                            pattern="[A-Za-z]{3,}"
                            value={this.state.firstName}
                            onChange={this.onChange}
                        />
                    </div>

                    <div>
                        <label>last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            pattern="[A-Za-z]{3,}"
                            required
                            value={this.state.lastName}
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="text"
                            name="password"
                            pattern=".{7,}"
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

export default Signup;
