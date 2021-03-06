import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Frontend extends Component{
    constructor(props){
        super(props);
        this.state = {
            mobile:'',
            token:undefined,
            otp:'',
            error:false,
            verified:false
        }
        this.sendOtp = this.sendOtp.bind(this);
        this.verifyOtp = this.verifyOtp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOtp = this.handleOtp.bind(this);
    }

    handleOtp(e) {
        this.setState({
            otp: e.target.value,
        });
    }

    handleChange(e){
        if(!isNaN(e.target.value)){
            this.setState({
                mobile:e.target.value
            });
        }
    }

    sendOtp(e){
        e.preventDefault();
        var jsonObject = {
            mobile:this.state.mobile
        };
        const options = {
            method : 'POST',
            body : JSON.stringify(jsonObject),
            mode : 'cors',
            cache : 'default',
            headers: {
                'Content-Type': 'application/json'
            },
        }

        fetch('/api/send-otp',options)
        .then( (res) => {
             return res.json();
        })
        .then((json)=>{
            if(json.success){
                this.setState({
                    error:false,
                    token:json.token
                });
            }else{
                this.setState({
                    error:json.message
                });
            }
        });
    }

    verifyOtp(e){
        e.preventDefault();
        
        var jsonObject = {
            otp:this.state.otp,
            token:this.state.token
        };
        const options = {
            method : 'POST',
            body : JSON.stringify(jsonObject),
            mode : 'cors',
            cache : 'default',
            headers: {
                'Content-Type': 'application/json'
            },
        }

        fetch('/api/verify-otp',options)
        .then( (res) => {
             return res.json();
        })
        .then((json)=>{
            if(json.success){
                this.setState({
                    verified:true
                });
            }else{
                this.setState({
                    error:json.message
                });
            }
        });
    }
    
    render(){
        let {mobile,error,token,otp,verified} = this.state;
        return(
            <div className = "container-fluid pt-3" style = {{height:'100vh',width:'100vw',background: '-webkit-linear-gradient(to bottom, #654ea3, #eaafc8)',background: 'linear-gradient(to bottom, #654ea3, #eaafc8)'}}>
                <div className = "row no-gutters justify-content-center align-items-center">
                    <div className = "col-12 text-right">
                        <Link to = "/backend" className = "btn btn-light">Go to Admin Panel</Link>
                    </div>
                </div>
                <hr/>
                <div className = "row no-gutters justify-content-center align-items-center">
                    <div className = "col-12 text-center">
                        <h1 className = "d-none d-lg-block text-white" style = {{fontFamily:["Georgia","sans-serif"],fontSize:'400%'}}>
                            Welcome to OTP validation service
                        </h1>
                        <h5 className = "d-block d-lg-none text-white" style = {{fontFamily:"Georgia"}}>
                            Welcome to OTP validation service
                        </h5>
                    </div>
                </div>
                {
                    (verified)?
                    <div className = "text-dark text-center">
                        Your mobile number is successfully Verified !!
                    </div>
                    :
                    (!token)?
                        <div className="row no-gutters justify-content-center align-items-center">  {/* send otp form*/}
                            <div className="col-12 col-lg-4 text-center">
                                <div className="mt-3 text-center">
                                    <form onSubmit={this.sendOtp}>
                                        <div className="form-group">
                                            <label className="text-white" style={{ fontFamily: "Lucida Grande" }}> <small>Enter your 10 digit mobile number below to continue </small></label>
                                            <input
                                                type="mobile"
                                                className="p-2 rounded form-control text-center"
                                                id="mobile"
                                                onChange={this.handleChange}
                                                value={mobile}
                                                style={{ border: 'o.8px solid #88a09e' }}
                                            />
                                            {
                                                (error) ?
                                                    <div style={{ color: '#9b1d29' }}><small>{error}</small></div>
                                                    :
                                                    null
                                            }
                                        </div>
                                        <button className="btn btn-outline-dark"> Send Otp </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    :
                        <div className = "row no-gutters justify-content-center align-items-center">        {/*verify otp form*/}
                            <div className = "col-12 col-lg-4 text-center">
                                <div className = "mt-3 text-center">
                                    <form onSubmit = {this.verifyOtp}>
                                        <div className = "form-group">
                                            <label className = "text-white" style = {{fontFamily:"Lucida Grande"}}> <small>Enter the otp sent to mobile {mobile} </small></label>
                                            <input 
                                                type = "number" 
                                                className = "p-2 rounded form-control text-center" 
                                                id = "otp" 
                                                onChange = {this.handleOtp} 
                                                value = {otp} 
                                                style = {{border:'o.8px solid #88a09e'}}
                                            />
                                            {
                                                (error)?
                                                <div style = {{color:'#9b1d29'}}><small>{error}</small></div>
                                                :
                                                null
                                            }
                                        </div>
                                        <button className = "btn btn-outline-dark"> verify Otp </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default Frontend;