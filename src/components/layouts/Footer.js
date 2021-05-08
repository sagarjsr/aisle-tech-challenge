import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import PersonIcon from '@material-ui/icons/Person';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmailIcon from '@material-ui/icons/Email';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    center : {
        padding : '0px',
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        flexGrow : 1,
        margin : '0px'
    },
    customBadge : {
        backgroundColor : "#8C5CFB"
    }

});

const Footer = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
        <BottomNavigation  value={value} onChange={handleChange} className={classes.root}>
            <span  className={classes.center}>
                <BottomNavigationAction style={{padding : '0px', margin : '0px'}} value="recents" icon={ <DashboardIcon style={{padding : '0px', margin : '0px'}}/>} />
                <Typography variant='caption'>Discover</Typography>
            </span>
            <span className={classes.center}>
                <BottomNavigationAction  style={{padding : '0px', margin : '0px'}} value="favorites" icon={
                <Badge classes={{badge : classes.badge}} badgeContent={4} color="primary">
                    <EmailIcon />
                </Badge>} />
                <Typography variant='caption'>Notes</Typography>
            </span>
            <span className={classes.center}>
                <BottomNavigationAction  style={{padding : '0px', margin : '0px'}} value="nearby" icon={<Badge badgeContent={51} max={50} color="primary"> <ChatBubbleIcon /> </Badge>} />
                <Typography variant='caption'>Matches</Typography>
            </span>
            <span className={classes.center}>
                <BottomNavigationAction style={{padding : '0px', margin : '0px'}} value="folder" icon={<PersonIcon />} />
                <Typography variant='caption'>Profile</Typography>
            </span>
            
            
           
            
        </BottomNavigation>
        </div>
    );
}

export default Footer