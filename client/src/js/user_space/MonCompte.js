/* eslint-disable */
import React from 'react';
import RC2 from 'react-chartjs2';

function FormatNumberLength(num, length) {
    if(num == 0)num=12;
    if(num== -1)num = 11;
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}
export default class MonCompte extends React.Component{

    render(){

        var currentDate = new Date();
        var currentDate1 = new Date();
        var currentDate2 = new Date();
        const currentMonth = FormatNumberLength(currentDate.getMonth()+1,2);
        const monthMinus1 =  FormatNumberLength(currentDate.getMonth(),2);
        const monthMinus2 =  FormatNumberLength(currentDate.getMonth()-1,2);
        if(monthMinus1 ==11 || monthMinus1 == 12)currentDate1.setYear(currentDate.getFullYear()-1);
        if(monthMinus2 == 11 || monthMinus2 == 12)currentDate2.setYear(currentDate.getFullYear()-1);
        const date = currentMonth+"/"+currentDate.getFullYear();
        const date1 = monthMinus1+"/"+currentDate1.getFullYear();
        const date2 = monthMinus2+"/"+currentDate2.getFullYear();
        var operations = Array.from(this.props.operations);
        var depense =0;
        var depense1 = 0;
        var depense2 = 0;

        var depot =0;
        var depot1 = 0;
        var depot2 = 0;

        operations.map(op=>{
            if(new Date(op.date.date.toString()).toLocaleDateString().substr(3)== date && op.amount < 0 )depense =depense+op.amount;
            if(new Date(op.date.date.toString()).toLocaleDateString().substr(3)== date1 && op.amount < 0 )depense1 =depense1+op.amount;
            if(new Date(op.date.date.toString()).toLocaleDateString().substr(3)== date2 && op.amount < 0 )depense2 =depense2+op.amount;

            if(new Date(op.date.date.toString()).toLocaleDateString().substr(3)== date && op.amount > 0 )depot =depot+op.amount;
            if(new Date(op.date.date.toString()).toLocaleDateString().substr(3)== date1 && op.amount > 0 )depot1 =depot1+op.amount;
            if(new Date(op.date.date.toString()).toLocaleDateString().substr(3)== date2 && op.amount > 0 )depot2 =depot2+op.amount;
        });

        const data = {
            labels: [date,date1,date2
            ],
            datasets: [
                {
                    label: ["Transfer Amount"],
                    backgroundColor: 'rgba(130, 255, 238,0.2)',
                    borderColor: 'rgba(130, 255, 238,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(130, 255, 238,0.4)',
                    hoverBorderColor: 'rgba(130, 255, 238,1)',
                    data: [Math.abs(depense),Math.abs(depense1),Math.abs(depense2)],
                },
                {
                    label: ["Date"],
                    backgroundColor: 'rgba(52, 180, 249,0.2)',
                    borderColor: 'rgba(52, 180, 249,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(52, 180, 249,0.4)',
                    hoverBorderColor: 'rgba(52, 180, 249,1)',
                    data: [depot,depot1,depot2],
                }
            ]
        };
        return(

            <div className="row">
                <RC2 data={data} type='bar' />
            </div>);
    }
}