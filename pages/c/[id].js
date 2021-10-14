import React from 'react'
import {
connect,
configure,
reduxWrapper,
Wrapper,
MyButton as Button
} from 'eventjuicer-site-components';


import settings from '../../settings';


const PageCompany = ({id}) => {

return (
<Wrapper>
</Wrapper>
);

}




export const getServerSideProps = reduxWrapper.getServerSideProps(async (props) => {

  const {params:{id}} = props;

  await configure(props, {
  settings : settings,
  preload : ['ranking', 'prizes']
  })

  return { props : {id}, revalidate : 10}

})


export default connect()(PageCompany);
