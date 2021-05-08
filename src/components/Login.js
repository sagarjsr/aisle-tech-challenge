import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import countryCodes from '../data/countryCode.json';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({

    button: {
        borderRadius: '20px',
        backgroundColor: '#F9CB10',
        color: "rgb(28,28,28)",
        maxWidth: '100px',
        maxHeight: '40px',
        minWidth: '30px',
        minHeight: '30px',
        marginLeft:"2%"
    },
    select: {
        maxWidth: '110px',
        maxHeight: '30px',
        minWidth: '100px',
        minHeight: '30px',
        
    },
    getOtp: {
        fontSize: '18px', fontWeight:400, margin: "0 !important",
        padding: 0,
        [theme.breakpoints.down('md')]: {
            fontSize: '20px', fontWeight: 600, margin: "0 !important",
            padding: 0,
        },
    },
    header: {
        display: 'flex !important', flexDirection: 'column',
        margin: '0 !important'
    },
    phone: {
        fontSize: '30px', fontWeight: 600, margin: "0 !important",
        padding: 0
    }


}));


const Login = (props) => {
    const classes = useStyles();
    const history = useHistory();

    const [userData, setUserData] = React.useState({
        countryCode: "+91",
        phoneNumber: props.location?.state || ""

    });

    const handleChange = (name) => (e) => {
        if(name === 'countryCode'){
            alert('Currently Operational only in Inda');      
        }
       else if ((userData.phoneNumber).length > 9) {
            alert('Phone Number cannot be greater than 10');
            setUserData({ ...userData, [name]: "" });

        }
        else {
           
            setUserData({ ...userData, [name]: e.target.value });
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let apiUrl = `https://testa2.aisle.co/V1/users/phone_number_login`;
        var data = {
            number: userData.countryCode + userData.phoneNumber
        };
        var headers = {
            "Content-Type": "application/json",
            "Cookie": "__cfduid=df9b865983bd04a5de2cf5017994bbbc71618565720",
            "Access-Control-Allow-Origin": "*",
        };
        axios
            .post(apiUrl, data, { headers: headers }, { validateStatus: false })
            .then((response) => {
                if (response.data.status === true) {

                    localStorage.setItem("phone", userData.phoneNumber)
                    history.push({
                        pathname : "/verify-otp",
                        state : userData.phoneNumber
                })
                }
                else {
                    alert("Incorrect Phone Number");
                    window.location.reload();
                }
            })
            .catch((err) => {
                if (err.response) {
                    console.log("error login", err.response);
                }
            });





    }

    return (
        <div style={{ marginLeft: "6%", marginTop: '4%' }}>
            <p className={classes.getOtp}>Get OTP</p>
            <p className={classes.phone}>Enter Your </p>
            <p className={classes.phone}>Phone Number</p>
            <form style={{marginTop: '3%' }}>
                <Grid container spacing={3}>
                    <Grid item xs={3} sm={6}>
                        <TextField
                            id="countryCode"
                            className={classes.select}
                            select
                            label=""
                            value={userData.countryCode}
                            onChange={handleChange('countryCode')}
                            SelectProps={{
                                native: true,
                            }}
                            // helperText="Country Code"
                            variant="outlined">
                            {countryCodes.map((option) => (
                                <option key={option.label} value={option.value}>
                                    {option.label} {option.value}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={7} sm={3}>
                        <TextField id="phoneNo"
                            style={{ marginLeft: "10%"}}
                            value={userData.phoneNumber}
                            type="number"
                            label="Phone Number"
                            onChange={handleChange('phoneNumber')}
                            variant="outlined" />
                    </Grid>
                    <Button variant="contained" className={classes.button} onClick={handleSubmit}>
                        Continue
                </Button>



                </Grid>
            </form>
        </div>
    )
}

export default Login
