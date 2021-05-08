import React, { Fragment, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Footer from './layouts/Footer';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '90vh',
        margin : theme.spacing(1)
    },
    header: {
        display: 'flex',
        justifyContent: "center"
    },
    button: {
        borderRadius: '20px',
        border : "2px solid #FCDF03",
        backgroundColor: '#FCDF03',
        color: "rgb(28,28,28)",
        maxWidth: '113px',
        maxHeight: '50px',
        minWidth: '30px',
        minHeight: '30px',
        fontWeight:800,
        fontSize : '15px'
    },
    interestGrid : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    detailDiv : {
        height : '95%',
        display : 'flex',
        flexDirection : 'column',
        flexGrow : 1,
        margin : theme.spacing(2),
       
        justifyContent : 'flex-end'
    },
    detailDivBlur : {
        height : '88%',
        display : 'flex',
        flexDirection : 'column',
        flexGrow : 1,
        margin : theme.spacing(1),
        filter: 'none !important',
        justifyContent : 'flex-end'
    },
    blurName : {
        color : 'white', 
        padding : "0px", 
        margin : "0px",
        filter: 'none! important'
         
    },
    label : {
        textTransform: 'capitalize'
    },
    
}));




const Home = (props) => {

    const [details, setDetails] = React.useState({});

    const history = useHistory();

    const getUserDetails = () => {
        var apiUrl = `https://testa2.aisle.co/V1/users/test_profile_list`;
        var headers = new Headers({
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Cookie": "__cfduid=df9b865983bd04a5de2cf5017994bbbc71618565720",
            "Authorization": localStorage.getItem("Authorization") || "",
        });
        return fetch(
            apiUrl,
            {
                method: 'GET',
                headers: headers
            }).then((response) => response.json())
            .then(data => data)
            .catch(err => {
                console.log(err);
                return history.push("/");
            }
            )

    }

    useEffect(async() => {
       let userDetails = await getUserDetails();

       setDetails(userDetails);

        console.log("User detail is", userDetails);

    },[]);

    const classes = useStyles();
    if(details.invites){
        return (
        
            (<Fragment>
            {console.log("Details of user is", details.invites.profiles[0].general_information.first_name)}
            <div className={classes.root}>
                
                
                <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={6} >
                    <h1 className={classes.header} style={{padding : "0px", margin : "0px"}}>Notes</h1>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} >
                        <h4 className={classes.header} style={{padding : "0px", margin : "0px"}}>Personal messages to you</h4>
                    </Grid>
                    
                    <Grid item xs={12} sm={12} md={6} lg={6} >
                        <div style={{ backgroundImage: `url(${details.invites.profiles[0].photos[0].photo})`, height : "40vh", backgroundSize : "cover", borderRadius : "20px"}}>
                            <div className={classes.detailDiv}>
                                <h3 style={{color : 'white', padding : "0px", margin : "0px"}}>{details.invites.profiles[0].general_information.first_name},{details.invites.profiles[0].general_information.age}</h3>

                                <h5 style={{color : 'white', padding : "0px", margin : "0px", marginTop : '5px'}}>Tap to read 50+ Notes</h5>
                            </div>
                            
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <h3  style={{padding : "0px", margin : "0px"}}>Interested In You</h3>
                       
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} className={classes.interestGrid}>
                    <h5  style={{padding : "0px", margin : "0px", maxWidth : '60%', color : '#9B9B9B'}}>Premium members can view all their likes at once</h5>
                    <button   
                    className={classes.button}
                    >
                       Upgrade
                        </button> 
                    </Grid>
                    {
                        details.likes.profiles.map(profile => (
                            <Grid item xs={6} sm={6} md={3} lg={3}>
                    <div style={{ backgroundImage: `linear-gradient(90deg, rgba(105,105,105,1), rgba(105,105,105,0.95), rgba(105,105,105,0.9)),url(${profile.avatar})`,  border : '1px solid black',  height : "22vh", backgroundSize : "cover", borderRadius : "10px"}}>
                       
                    <div className={classes.detailDivBlur}>
                                <h3 className={classes.blurName} >{profile.first_name}</h3>

                                
                        </div>
                    </div>
                    
                    </Grid>
                        ))
                    }
                    
                   
                    
                </Grid>
                
                

            </div>
            <Footer  />
        </Fragment>) 
        
        
       )
    }
     else{
        return ( (<div>Loading...</div>))
     } 
}

export default Home
