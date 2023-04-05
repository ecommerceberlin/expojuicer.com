import React, {useEffect} from 'react'
import {
  connect,
  configure,
  reduxWrapper,
  Wrapper,
  lsSet,
  lsGet,
  Box,
  Grid,
  makeStyles,
  Typography,
  get,
  useRouter
} from 'eventjuicer-site-components';

import ScanOwner from '../../components/ScanOwner';
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

  const classes = useStyles()
  const {push} = useRouter()

  useEffect(() => {
    const unsaved = lsGet("unsaved")

    if(id > 0){
      
      lsSet("company_id", id)
      lsSet("company_name", get(company, "profile.name", get(company, "slug")))
      lsSet("company_logotype", get(company, "profile.logotype_cdn"), "")

      if(unsaved){
        lsSet("unsaved", null)
        push(`/p/${unsaved}`)
      }
    }
  })


  return (
  <Wrapper first={true}>
  <Box m={8}>
  <Grid className={classes.root} container direction="column" justifyContent="center" alignItems="center">
  <Grid item>
    <Typography variant="h1" align="center">Ready!</Typography>
    </Grid>
    <Grid item>

    <ScanOwner 
      name={get(company, "profile.name", get(company, "slug")) } 
      logotype={get(company, "profile.logotype_cdn") } 
    />

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
