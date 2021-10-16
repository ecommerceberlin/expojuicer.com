import {
  connect,
  Wrapper,
  reduxWrapper,
  configure,
  useDatasource,
  get,
  map,
  Box,
  Typography,
  List
} from 'eventjuicer-site-components';

import {useRouter} from 'next/router'  

const settings = require('../settings').default;

const ListOfExhbitors = () => {

  const data = useDatasource({resource: "exhibitors2", filters:{
    sort : "profile.name"
  }})
  

const getBooths = (exhibitor) => map(get(exhibitor, 'instances', []).filter(p => parseInt(p.sold)), 'formdata.ti').filter(v => v && v.length).join(", ");


return (<Wrapper title="Click on your brand name to sign in." first={true}><List 
  data={data} 
  primary={(exhibitor) => get(exhibitor, "profile.name", exhibitor.slug)} 
  secondary={(exhibitor) => `${getBooths(exhibitor)}`}
  link={(exhibitor) => `/c/${exhibitor.id}`}
  /></Wrapper>)

}



export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {

  return await configure(props, {
    settings : settings,
    preload : ["exhibitors2"]
  })
})

export default connect()(ListOfExhbitors);
