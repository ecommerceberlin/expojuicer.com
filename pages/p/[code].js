import React, {useEffect, useState} from 'react'
import {
    connect,
    configure,
    reduxWrapper,
    Wrapper,
    lsGet,
    lsSet,
    useTranslate,
    TextField,
    Typography,
    Box,
    makeStyles,
    CircularProgress,
    Button,
    useRouter,
    Grid
} from 'eventjuicer-site-components';


import ScanOwner from '../../components/ScanOwner';
import settings from '../../settings';

const useStyles = makeStyles(theme => ({

    root: {
        minWidth: 400,
        maxWidth: 600
    },

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
    
    const [company_id, setCompanyId] = useState(null)
    const [comment, setComment] = useState("")
    const [synced, setSynced] = useState(null)
    const [commentSynced, setCommentSynced] = useState(null)
    const {push} = useRouter()

    useEffect(()=>{
        const company_id = lsGet("company_id")
        if(company_id > 0){
            setCompanyId(company_id)
        }else{
            lsSet("unsaved", code)
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
                setCommentSynced(true)
                setTimeout(() => setCommentSynced(null), 3000)
            }
        }
    };

    if(!company_id){
        return (<Wrapper><Box m={10}>
        <Typography variant="h6" gutterBottom>
        Who are you? Please <a href="/" onClick={()=>push("/")}>go to the homepage</a> and choose your brand name.
        </Typography>
        </Box></Wrapper>)
    }

    if(company_id && !synced){
        return (<Wrapper><Box m={10}><CircularProgress size="10rem" /></Box></Wrapper>)
    }

    return (<Wrapper>
        <Box>
            <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
            <Grid item>
            <Box className={classes.root}>
            <Typography variant="h4" gutterBottom>{commentSynced ? `Comment saved!`: `Contact saved. Comment? (optional)`}</Typography>
            <TextField 
                id="comment" 
                label="Type comment here" 
                value={comment} 
                onChange={handleChange} 
                variant="outlined" 
                fullWidth
                multiline
                maxRows={4} 
            /><br />
            <Button 
                onClick={handleSendComment} 
                variant="outlined" 
                color="primary">Send Comment
            </Button>
            </Box>

            </Grid>
            <Grid item>

            <ScanOwner 
                logotype={lsGet("company_logotype")} 
                name={lsGet("company_name")} 
                title="Saved for" 
            />    
            
            </Grid>

            </Grid>
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