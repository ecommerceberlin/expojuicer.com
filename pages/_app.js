import React from 'react'
import { reduxWrapper, NextApp, MyHead } from 'eventjuicer-site-components';

const MyCustomApp = (props) => <NextApp {...props} layout={false}  />

export default reduxWrapper.withRedux(MyCustomApp)