import React from 'react';
export default class OperationsList extends React.Component{

    render(){
        var operations = Array.from(this.props.operations);
        var i =0;
        return(
            <div>
                <div className="row">
                    {operations.map(op=>{
                        return<div key={i++} className="row oprow">
                                <div className="col-xs-4">{new Date(op.date.date.toString()).toLocaleDateString()} </div>
                                <div style={{"textAlign":"center"}}  className="col-xs-4">{op.type}</div>
                                <div style={{"textAlign":"right"}} className="col-xs-4">{op.amount} Rs</div>
                        </div>;
                    })}
                </div>
                <div className="row text-center">
                    <br/>
                    Total Transaction Amount till {new Date().toLocaleDateString()} is {this.props.solde} Rs
                </div>
            </div>);
    }
}