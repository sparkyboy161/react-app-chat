import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography, Chip, Button, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ChatContext } from '../context/ChatContext';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '50px',
        padding: theme.spacing(3, 2)
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    topicsWindow: {
        width: '30%',
        height: '300px',
        borderRight: '1px solid grey'
    },
    chatWindow: {
        width: '70%',
        height: '300px',
        padding: '20px'
    },
    chatBox: {
        width: '85%'
    },
    button: {
        width: '15%'
    },
}));

export default function Dashboard() {

    const classes = useStyles();

    const { allChats, sendMessageAction, user } = useContext(ChatContext);

    const topics = Object.keys(allChats);

    const [activeTopic, setActiveTopic] = useState(topics[0]);
    const [textValue, setTextValue] = useState('');

    return (
        <div >
            <Paper className={classes.root} >
                <Typography variant='h3'>
                    Chat app
                </Typography>
                <Typography variant='h5'>
                    {activeTopic}
                </Typography>
                <div className={classes.flex}>
                    <div className={classes.topicsWindow}>
                        <List>
                            {
                                topics.map((topic, i) =>
                                    <ListItem onClick={e => setActiveTopic(e.target.innerText)} button key={i}>
                                        <ListItemText primary={topic} />
                                    </ListItem>)
                            }

                        </List>
                    </div>
                    <div className={classes.chatWindow}>
                        {
                            allChats[activeTopic].map((chat, i) =>
                                <div className={classes.flex} key={i}>
                                    <Chip label={chat.from} className={classes.chip} />
                                    <Typography variant='body1'>{chat.msg}</Typography>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={classes.flex}>
                    <TextField
                        label='Send a chat'
                        className={classes.chatBox}
                        value={textValue}
                        onChange={e => setTextValue(e.target.value)} />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                            sendMessageAction({ from: user, msg: textValue, topic: activeTopic });
                            setTextValue('');

                        }}
                    >Send</Button>
                </div>
            </Paper>

        </div>
    );
}