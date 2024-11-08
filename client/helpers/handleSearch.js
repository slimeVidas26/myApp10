import filter from 'lodash.filter';


 const HandleSearch = (text) => {
    const formattedQuery = text.toLowerCase(); 
    console.log(formattedQuery)
    const filteredData = filter(data.ediOrders, edi => {
      return contains(edi, formattedQuery);
    });
    console.log('filteredData' , filteredData);
    setModalOpen(true)
    setQuery(text);
    setFullData(filteredData)
    setTitle('Edi Certificate')
  };
 
   const contains = ({orderNumber }, query) => {
    //const { first, last } = name;
 console.log('contains' , contains)
    if (orderNumber.includes(query)) {
      return true;
    }
   
    return false;
  };

  export default HandleSearch