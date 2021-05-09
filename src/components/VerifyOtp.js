import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import axios from "axios";


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1.5),
            width: '25ch',
            
        },
    },

    entOtp: {
        fontSize: '18px', fontWeight: 600, margin: "0 !important",
        padding: 0,
        [theme.breakpoints.down('md')]: {
            fontSize: '20px', fontWeight: 400, margin: "0 !important",
            padding: 0,
        },
    },
    phone: {
        fontSize: '30px', fontWeight: 600, margin: "0 !important",
        padding: 0
    },
    button: {
        borderRadius: '20px',
        backgroundColor: '#F9CB10',
        color: "rgb(28,28,28)",
        maxWidth: '100px',
        maxHeight: '40px',
        minWidth: '30px',
        minHeight: '30px'
    },
    otpField: {
        maxWidth: '100px',
        maxHeight: '25px',
        minWidth: '30px',
        minHeight: '20px'
    },
    icon: {
        width: '18px',
        height: '15px'
    }
}));


const VerifyOtp = (props) => {
    const classes = useStyles();

    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(59);
    const phoneNumber = props.location?.state || "";

    const history = useHistory();
    const handleClick = () => history.push({
        pathname : '/',
        state : phoneNumber
        });

    useEffect(() => {
        if (timer > 0) {
            setTimeout(() => setTimer(timer - 1), 1000);
        } else {
            setTimer(0);
        }
    },[timer]);

    const handleChange = (e) => {
        if (otp.length > 3) {
            alert('Otp cannot be greater than 4');
        }
        else {
            setOtp(e.target.value);
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let apiUrl = `https://testa2.aisle.co/V1/users/verify_otp`;
        var data = {
            number: "+919876543212",
            otp: otp
        };
        var headers = {
            "Content-Type": "application/json",
            "Cookie": "__cfduid=df9b865983bd04a5de2cf5017994bbbc71618565720",
            "Access-Control-Allow-Origin": "*",
        };
        axios
            .post(apiUrl, data, { headers: headers }, { validateStatus: false })
            .then((response) => {
                if (response.data.token !== null) {
                    // console.log("ssss" + response.data.token)
                    
                    
                    history.push("/home")
                    localStorage.setItem("Authorization", response.data.token)
                }
                else {
                    alert("Invalid OTP");
                    window.location.reload();
                }
            })
            .catch((err) => {
                if (err.response) {
                    // console.log("otp login", err.response);
                }
            });



        return props.history.push({
            pathName: '/verify-otp',
        })
    }


    return (
        <div style={{ margin: '12%', display:'flex', flexDirection: 'column' }}>
            
            <p className={classes.entOtp}>+91 {phoneNumber} <EditIcon onClick={handleClick} fontSize="small" className={classes.icon}></EditIcon></p>
            <p className={classes.phone}>Enter The OTP</p>
            <form className={classes.root} noValidate autoComplete="off">
                <TextField id="otp"
                    className={classes.otpField}
                    style={{ borderRadius: '25%' }}
                    value={otp}
                    label="OTP" type="number"
                    onChange={handleChange}
                    variant="outlined" />
                <br></br><br></br>
                <span style={{ display: 'flex', alignItems: 'center' }}><Button variant="contained" className={classes.button} onClick={handleSubmit}>
                    Continue
                </Button>
                    <span style={{ margin: '10px' }}>{timer !== 0 ? timer > 9 ? <span>00:{timer}</span> : <span>00:0{timer}</span> : <span></span>}
                    </span>
                </span>
            </form>

        </div>
    )
}


export default VerifyOtp
