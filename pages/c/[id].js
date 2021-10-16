import React, {useEffect} from 'react'
import {
connect,
configure,
reduxWrapper,
Wrapper,
MyButton as Button,
lsSet,
Box,
useTranslate,
Avatar,
resizeCloudinaryImage,
Grid,
makeStyles,
Typography,
get
} from 'eventjuicer-site-components';

import settings from '../../settings';

const useStyles = makeStyles(theme => ({ 
  
  root : {
    maxWidth: 600
  },
  avatarContainer: {
    minHeight: 300,
    minWidth: 300,
  },
  avatarImg: {
    objectFit: "contain",
    maxHeight: "80%",
    maxWidth: "80%",
  },
}));



const PageCompany = ({company, id}) => {

  const [translate] = useTranslate()
  const classes = useStyles()

  useEffect(() => {

    if(id > 0){
      lsSet("company_id", id)
    }
  })

  if(!company){
    return null
  }

  return (
  <Wrapper first={true}>
  <Box m={8}>
  <Grid className={classes.root} container direction="column" justifyContent="center" alignItems="center">
  <Grid item><Typography variant="h4">Ready!</Typography></Grid>
  <Grid item>
    <Avatar variant="square" src={ resizeCloudinaryImage(get(company, "profile.logotype_cdn"), 300, 300) } classes={{
              root:classes.avatarContainer,
              img: classes.avatarImg
    }}/>
    </Grid>
  </Grid>
  </Box>
  </Wrapper>
  );

}




export const getServerSideProps = reduxWrapper.getServerSideProps(async (props) => {

  const {params:{id}} = props;
  const resource = `companies/${id}`
  
   await configure(props, {
    settings : settings,
    preload : [resource]
  })

  return { props : {id, resource}}

})


export default connect((state, props)=>({
  company: props.resource in state.resources? state.resources[props.resource]: {}
}))(PageCompany);
