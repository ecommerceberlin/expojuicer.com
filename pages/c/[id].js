import React, {useEffect} from 'react'
import {
connect,
configure,
reduxWrapper,
Wrapper,
MyButton as Button,
lsSet,
Box,
useTranslate
} from 'eventjuicer-site-components';


import settings from '../../settings';


const PageCompany = ({id}) => {

const [translate] = useTranslate()

useEffect(() => {

  lsSet("company_id", id)

})

return (
<Wrapper first={true}>
<Box>{translate("good_to_go")}{id}</Box>
</Wrapper>
);

}




export const getServerSideProps = reduxWrapper.getServerSideProps(async (props) => {

  const {params:{id}} = props;

   await configure(props, {
    settings : settings,
    preload : []
  })

  return { props : {id}}

})


export default connect()(PageCompany);
