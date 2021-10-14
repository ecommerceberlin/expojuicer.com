import React from 'react'
import {
connect,
configure,
reduxWrapper,
Wrapper
} from 'eventjuicer-site-components';

import settings from '../../settings';

const CodeScanned = ({code}) => {

return (<Wrapper>
OK
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





export default connect()(CodeScanned);
