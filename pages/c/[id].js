import React from 'react'
import {
    connect,
    configure,
    reduxWrapper,
    PartnerPromo,
    PartnerPerformance,
    Wrapper,
    Markdown,
    MyButton as Button
  } from 'eventjuicer-site-components';
  

  import settings from '../../settings';

  import {
    AssignmentInd as Badges,
    Mic as Presentation,
    Videocam as Video_interview,
    Web as Brand_highlight,
    MonetizationOn as Earlybird,
    Event as Meetups,
    Description as Blog,
    VolumeUp as Rollups
} from '@material-ui/icons'



  const PageCompany = ({id}) => {
    
  return (
    <Wrapper>

     <PartnerPromo id={id} icons={{
      Badges, 
      Presentation,
      Video_interview,
      Brand_highlight,
      Earlybird,
      Meetups,
      Blog,
      Rollups
    }}
    sidebar={
      <div>
      <PartnerPerformance icons={{
        Badges, 
        Presentation,
        Video_interview,
        Brand_highlight,
        Earlybird,
        Meetups,
        Blog,
        Rollups
      }} 
      limit={5}
      />
      <Button href="/" label="exhibitor.ranking.button" />
      </div>
    }
    />

    <Markdown label="exhibitor.promo.about" />

    </Wrapper>
  );
  
  }

  export async function getStaticPaths() {

    return {
      paths: [],
      fallback: "blocking" 
    };
     
  }

  
  export const getStaticProps = reduxWrapper.getStaticProps(async (props) => {
  
    const {params:{id}} = props;

    await configure(props, {
      settings : settings,
      preload : ['ranking', 'prizes']
    })

    return {
        props : {
            id
        },
        revalidate : 10
    }
  
  })
  



  
  export default connect()(PageCompany);
  