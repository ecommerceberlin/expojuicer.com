
const settings =  {
      
    system : {
        ogTemplate: "",
        passwords : {
            'admin': '1751bfe48d5ad21fd9d'
        },
        lang_api_endpoint : 'https://api.eventjuicer.com/proxy?url=https%3A%2F%2Flocalise.biz%2Fapi%2Fexport%2Fall.json%3Fformat%3Dmulti%26pretty%26key%3DSHiwxgKaPMx_KThQH2zcdzwiKEMzuNBm',    
        api : "https://api.eventjuicer.com/v1/public/hosts/targiehandlu.pl",
        proxy: "https://api.eventjuicer.workers.dev?url=",
        // api : "http://eventjuicer-api.test/v1/public/hosts/targiehandlu.pl",
        post_api : "https://api.eventjuicer.com/v1/public/hosts/targiehandlu.pl/register",
        service_api : "https://api.eventjuicer.com/v1/services",
        og_image : "https://res.cloudinary.com/ecommerceberlin/image/upload/c_limit,w_1024/v1546943854/ebe_og_home.jpg",
    
    },


    ui : {

        menuItems : [

            {
                name: 'exhibitor',
                items: [
                  {name: 'ranking', to: '/'},
                ]
            }
  
        ]
    },

   
    common : {

        organizer_name : 'Infoguru Sp. z o.o. Sp. k.',
        organizer_address : 'POLAND, Poznań, Truskawiecka 13',
        organizer_regno : 'VAT ID 7811967834',
        event_name : 'Targi eHandlu',
        event_location : 'EXPO XXI Warszawa, Prądzyńskiego 12/14',
        event_date : '20 października  2021',
        event_hours : '10:00-17:00',
    },

    sales_support : {
        title: 'event.support.hello',
        description: 'event.support.description',
        people : [
            {             
                name: 'Karolina Michalak',
                position : 'Relationship Manager',
                langs : ["pl","en"],
                avatar: 'https://res.cloudinary.com/eventjuicer/image/upload/v1598009850/targiehandlu_people_km.jpg',
                phone: '+48 721 945 134',
                email: 'karolina.michalak@targiehandlu.pl',
                chatlio : true
            },
          
          ]
    },

   
    footer : {
        iconStyle : "black",
        primaryStyle: null,
        secondaryStyle: null,
      //  iconStyle: "heroIcon",
        links : []
    },

    appbar : {
        profile: ["logout"],
        links: [
            // {label: "common.menu.visitors.vote", color: "secondary",  href: "/vote", as: "/vote", variant: "contained"}
        ],
    },
    
};
  

export default settings