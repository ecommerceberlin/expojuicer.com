import React, {useEffect, useState} from 'react'
import {
connect,
configure,
reduxWrapper,
Wrapper,
lsGet,
useTranslate,
TextField,
Typography,
Box,
makeStyles,
CircularProgress,
Button
} from 'eventjuicer-site-components';

import settings from '../../settings';

const useStyles = makeStyles(theme => ({

    root: {

    },
    comment: {
        maxWidth: 600
    }
}))

const send = async (config) => {

    const {code, company_id, comment} = config
    const request = await fetch(`https://api.eventjuicer.com/v1/services/scan`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code,
                company_id,
                comment
            })
          })
    return await request.json()

}


const CodeScanned = ({code}) => {

    const classes = useStyles()
    const [translate] = useTranslate()
    
    const [company_id, setCompanyId] = useState(null)
    const [comment, setComment] = useState("")
    const [synced, setSynced] = useState(null)

    useEffect(()=>{
        const company_id = lsGet("company_id")
        if(company_id > 0){
            setCompanyId(company_id)
        }
    })

    useEffect(async ()=>{
        if(company_id > 0 && code && !synced){
           const sync = await send({code, company_id})
           if("data" in sync){
               setSynced(true)
           }
        }
    }, [company_id, code])

    const handleChange = (event) => {
        setComment(event.target.value);
    }

    const handleSendComment = async () => {
        if(comment){
            const sync = await send({code, company_id, comment})
            if("data" in sync){
                setComment("")
            }
        }
    };

    if(!synced){
        return (<Wrapper><Box m={10}><CircularProgress size="10rem" /></Box></Wrapper>)
    }

    return (<Wrapper>
        <Box>
            <TextField 
                className={classes.comment} 
                id="comment" 
                label="Name" 
                value={comment} 
                onChange={handleChange} 
                variant="outlined" 
                fullWidth
                multiline
                maxRows={4} 
            />
            <Button 
                onClick={handleSendComment} 
                variant="contained" 
                color="primary">Send Comment
            </Button>
        </Box>
    </Wrapper>);

}

export const getServerSideProps = reduxWrapper.getServerSideProps(async (props) => {

    const {params:{code}} = props;

    await configure(props, {
        settings : settings,
        preload : []
    })

    return {props : {code}}

})


export default connect()(CodeScanned)