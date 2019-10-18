import React,{Component} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class Home extends Component{
    constructor(props){
        super(props);
        this.columns=[
            {
                Header: "Mobile Number",
                accessor: "mobile",
                filterable:true,
                headerStyle:{
                    fontWeight:'bold',
                    color:'white'
                },
            },
            {
                Header: "No of OTPs sent",
                accessor: "count",
                filterable:true,
                headerStyle:{
                    color:'white'
                },
            }
        ]
        this.state = {
            details:[],
            smsSent:10,
            uniqueNum:10
        }
    }

    componentDidMount(){
        const options = {
            method : 'GET',
            mode : 'cors',
            cache : 'default'
        }

        fetch('/api/get-summary',options)
        .then( (res) => {
             return res.json();
        })
        .then((json)=>{
            if(json.success){
                this.setState({
                    smsSent:json.smsSent,
                    uniqueNum:json.uniqueNum
                });
            }else{
                alert("Some error Occured");
            }
        });
        
        fetch('/api/get-details',options)
        .then( (res) => {
             return res.json();
        })
        .then((json)=>{
            if(json.success){
                this.setState({
                    details:json.details,
                });
            }else{
                alert("Some error Occured");
            }
        });
    }

    render(){
        let {smsSent,uniqueNum,details} = this.state;
        let columns = this.columns;
        return(
            <div className = "container-fluid pt-5" style = {{height:'100vh',width:'100vw',background: '-webkit-linear-gradient(to bottom, #654ea3, #eaafc8)',background: 'linear-gradient(to bottom, #654ea3, #eaafc8)'}}>
                <div className = "row no-gutters justify-content-center align-items-center">
                    <div className = "col-12 text-center">
                        <h1 className = "d-none d-lg-block text-white" style = {{fontFamily:["Georgia","sans-serif"],fontSize:'300%'}}>
                            Welcome to the admin portal
                        </h1>
                        <h5 className = "d-block d-lg-none text-white" style = {{fontFamily:"Georgia"}}>
                            Welcome to the admin portal
                        </h5>
                    </div>
                </div>
                <div className = "row no-gutters justify-content-center align-items-center" style = {{backgroundColor:'#'}}>
                    <div className = "col-12 text-center">
                        <div className = "text-white" style = {{fontFamily:'monospace'}}>
                            <span>Total SMS(s) Sent: {smsSent}</span><br/>
                            <span>Count of unique mobile numbers: {uniqueNum}</span>
                        </div>
                    </div>
                </div>
                <div className = "row no-gutters justify-content-center align-items-center mt-5" style = {{backgroundColor:'#'}}>
                    <div className = "col-12 text-center">
                        <ReactTable
                            columns={columns}
                            data={details}
                            pageSize={10}
                            showPageSizeOptions={false}
                            footerClassName = "text-white"
                            getTdProps={(state, rowInfo, column) => {
                                return {
                                    style: {
                                        color:'white',
                                        textAlign: 'center'
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;