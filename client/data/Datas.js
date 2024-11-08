  const  data = [
    {
      id: '1',
      reference: '12345',
      date: '08/12/22',
      supplier: 'Tomer',
      rows: '4',
      quantity : '215',
      supplied:null,
      isOpen: true,
      order_details :[
        {code : '44444',
        product_name : 'Chiffon Bread',
        quantity: 500,
        supplied:null,
        boxes: 10,
        isOpen : 'true',
        isFull : 'null',
        ReasonOfRefund:null
      },
       { code : '55555',
         product_name : 'White Bread',
         quantity: 180,
         supplied:null,
         boxes: 10,
         isOpen : 'true',
         isFull : 'null', 
         ReasonOfRefund:null
       },
       {code : '66666',
       product_name: 'Cereal Bread',
         quantity: 15,
         supplied:null,
         boxes: 2,
         isOpen : 'true',
         isFull : 'null',  
         ReasonOfRefund:null
       },
         {code : '77777',
       product_name: 'Cereal De France',
         quantity: 56,
         supplied:null,
         boxes: 4,
         isOpen : 'true',
         isFull : 'null', 
         ReasonOfRefund:null
       },
      ]
    },
    {
      id: '2',
      reference: '23456',
      date: '09/12/22',
      supplier: 'Gouri',
      rows: '25',
      quantity : '654',
      supplied: 0,
      isOpen:true,
      order_details :[
        {code : '44444',
        product_name : 'Chiffon Bread',
        quantity: 1000,
        supplied:null,
        boxes: 10,
        isOpen : 'true',
        isFull : 'null', 
        ReasonOfRefund:null
      },
      {code : '56412356',
      product_name : 'White Bread',
        quantity: 100,
        supplied:null,
        boxes: 10,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : 'null', 
        ReasonOfRefund:null
      },
      {code : '0101010101',
      product_name: 'Cereal Bread',
        quantity: 15,
        boxes: 2,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : 'null',
        ReasonOfRefund:null
      },

      ]
    },
    {
      id: '3',
      reference: '78125662',
      date: '10/12/22',
      supplier: 'Fisher',
      rows: '20',
      quantity : '215',
      supplied:null , 
      isOpen: 'true',
      order_details :[
        {code : '77777',
        product_name : 'Chiffon Bread',
        quantity: 100,
        boxes: 10,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : 'null', 
        ReasonOfRefund:null
      },
      {code : '88888',
      product_name : 'White Bread',
        quantity: 100,
        boxes: 10,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : 'null', 
        ReasonOfRefund:null
      },
      {code : '99999',
      product_name: 'Cereal Bread',
        quantity: 15,
        boxes: 2,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : 'null',
        ReasonOfRefund:null
      },

      ]
    },
    {
      id: '4',
      reference: '7062919616',
      date: '11/12/22',
      supplier: 'Leiman',
      rows: '40',
      quantity : '1520',
      supplied:null , 
      isOpen: 'true',
      order_details :[
        {code : '101010',
        product_name : 'Chiffon Bread',
        quantity: 100,
        boxes: 10,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true,
        ReasonOfRefund:null
      },
      {code : '111111',
      product_name : 'White Bread',
        quantity: 100,
        boxes: 10,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true,
        ReasonOfRefund:null
      },
      {code : '121212',
      product_name: 'Cereal Bread',
        quantity: 15,
        boxes: 2,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true,  
        ReasonOfRefund:null
      },

      ]
    },
    {
      id: '5',
      reference: '7062921581',
      date: '11/12/22',
      supplier: 'Chastovich',
      rows: '120',
      quantity : '1245',
      supplied:null , 
      isOpen: 'true',
      order_details :[
        {code : '131313',
        product_name : 'Chiffon Bread',
        quantity: 100,
        boxes: 10,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true, 
        ReasonOfRefund:null
      },
      {code : '141414',
      product_name : 'White Bread',
        quantity: 100,
        boxes: 10,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true, 
        ReasonOfRefund:null
      },
      {code : '151515',
      product_name: 'Cereal Bread',
        quantity: 15,
        boxes: 2,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true, 
        ReasonOfRefund:null
      },

      ]
    },
    {
      id: '6',
      reference: '9069040563',
      date: '12/12/22',
      supplier: 'Falco',
      rows: '16',
      quantity : '42',
      supplied:null ,
      isOpen: 'true', 
      order_details :[
        {code : '161616',
        product_name : 'Chiffon Bread',
        quantity: 100,
        boxes: 10,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true,
        ReasonOfRefund:null
      },
      {code : '171717',
      product_name : 'White Bread',
        quantity: 100,
        boxes: 10,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true,
        ReasonOfRefund:null
      },
      {code : '181818',
      product_name: 'Cereal Bread',
        quantity: 15,
        boxes: 2,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true, 
        ReasonOfRefund:null
      },

      ]
    },
    {
      id: '7',
      reference: '7119138917',
      date: '12/12/22',
      supplier: 'Tnouva',
      rows: '63',
      quantity : '780',
      supplied:null , 
      isOpen: 'true',
      order_details :[
        {code : '191919',
        product_name : 'Chiffon Bread',
        quantity: 100,
        boxes: 10,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true, 
        ReasonOfRefund:null
      },
      {code : '202020',
      product_name : 'White Bread',
        quantity: 100,
        boxes: 10,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true, 
        ReasonOfRefund:null
      },
      {code : '212121',
      product_name: 'Cereal Bread',
        quantity: 15,
        boxes: 2,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true,
        ReasonOfRefund:null
      },

      ]
    },
    {
      id: '8',
      reference: '7119134444',
      date: '12/12/22',
      supplier: 'Tara',
      rows: '89',
      quantity : '752',
      supplied:null , 
      isOpen: 'true',
      order_details :[
        {code : '222222',
        product_name : 'Chiffon Bread',
        quantity: 100,
        boxes: 10,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true, 
        ReasonOfRefund:null
      },
      {code : '232323',
      product_name : 'White Bread',
        quantity: 100,
        boxes: 10,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true, 
        ReasonOfRefund:null
      },
      {code : '242424',
      product_name: 'Cereal Bread',
        quantity: 15,
        boxes: 2,
        isOpen : 'true',//can be true(open) or false(closed)
        isFull : true,
        ReasonOfRefund:null
      },

      ]
    },
   
  ];

  export default data