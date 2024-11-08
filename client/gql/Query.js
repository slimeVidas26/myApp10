import { gql } from "@apollo/client";

 export const HELLO_QUERY = gql`
 query Query($name: String) {
     hello(name: $name)
 }
`



export  const EDI_ORDER_ITEMS_BY_NUMBER_QUERY = gql`
query EdiOrderItemsByNumberQuery($ediOrder : String) {
    ediOrderItemsByNumber(ediOrder: $ediOrder) {
        product
        code
        quantity
        
    }
}`

export  const WAREHOUSES_QUERY = gql`
     query WarehouseQuery {
         warehouses {
            id
             title  
         }
     }`


     

 

export  const DEPARTMENTS_QUERY = gql`
     query DepartmentQuery {
         departments {
            id
            title   
         }
     }`

     export  const REDSTAMPS_QUERY = gql`
     query RedstampQuery {
         redstamps {
            id
            title   
         }
     }`

     export  const ITEMREASONS_QUERY = gql`
     query ItemReasonQuery {
         itemReasons {
            id
            title   
         }
     }`

export  const ARRIVALS_QUERY = gql`
query ArrivalQuery {
    arrivals {
       id
       title   
    }
}`

export  const PRODUCTS_QUERY = gql`
    query ProductsQuery {
        products {
        name
        barcode
        description
        image
        quantityInStock
        quantityPerBox
        }
    }`

   
    export  const PRODUCT_QUERY = gql`
    query ProductQuery($productId: ID!) {
        products(id: $productId) {
        name
        barcode
        description
        image
        quantityInStock
        quantityPerBox
        }
    }`


export  const SUPPLIERS_QUERY = gql`
query SupplierQuery {
    suppliers {
       id
       name
       
       number
    }
}`




export  const SUPPLIER_QUERY = gql`
query SupplierQuery($supplierId: ID!) {
    supplier(id: $supplierId) {
      name
      email
      number
      products {
        name
      }
    }
}`



export  const EDI_ORDER_QUERY = gql`
query OrderQuery($orderId: ID!)  {
  order(id: $orderId) {
    id
    edi
    totalBoxes
    reference
    supplier {
      name
    }
    orderProducts {
      product {
        id
        name
        code
        quantityPerBox
        inStock
      }
      isOpen
      initialQuantity
      finalQuantity
    }
   
  }
}`




export  const EDI_ORDERS_QUERY = gql`
query EdiOrdersQuery {
  orders {
    id
    edi
    date
    reference
    totalBoxes
    totalQuantity
    openOrder
    orderProducts {
      product {
        name
        code
        quantityPerBox
        inStock
      }
      isOpen
      initialQuantity
      finalQuantity
    }
    supplier {
      name
      number
    }
  }

}`

export // Define the mutation to update orderPrtoduct status
const UPDATE_ORDER_PRODUCT_STATUS_MUTATION = gql`
  mutation UpdateOrderProductStatus($orderId:ID!, $finalQuantity:Int! ,  $productId: ID!, $isOpen: Boolean!) {
    updateOrderProductStatus(orderId: $orderId ,
                             finalQuantity: $finalQuantity ,
                             productId: $productId,
                              isOpen: $isOpen) {
      id
      orderProducts {
        product {
          id
          name
          code
          quantityPerBox
           inStock
        }
        isOpen
        finalQuantity
        initialQuantity
       
      }
    }
  }
`

export const UPDATE_ORDER_STATUS_MUTATION = gql`
mutation UpdateOrderStatus($orderId:ID!, $openOrder:Boolean!) {
  updateOrderStatus(orderId: $orderId ,
                    openOrder: $openOrder) {
                    id
                    openOrder  
}
}`;






export  const ADD_SUPPLIER = gql`
mutation AddSupplier($name: String!, $number: Int!) {
    addSupplier(name: $name, number: $number) {
      name
      number
    }
  }`











export  const CLOSED_ORDERS_QUERY = gql`
query ClosedOrdersQuery {
     closedOrders {
    reference
    date
    supplier{
     number
     name
     }
     rows
     quantity
     supplied
     isOpen 
    }
}`

export  const ORDER_ITEMS_QUERY = gql`
query OrderItemsQuery {
    orderItems {
      code
      product_name
      quantity
      boxes
      isOpen
      isFull
      ReasonOfRefund
      orderReference
    }
}`





