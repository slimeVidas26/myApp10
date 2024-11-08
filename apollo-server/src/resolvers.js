import { Warehouse } from './models/Warehouse.js';
import { Department } from './models/Department.js';
import { Redstamp } from './models/Redstamp.js';
import { ItemReason } from './models/ItemReason.js';
import { Arrival } from './models/Arrival.js';
import { Supplier } from './models/Supplier.js';
import { Product } from './models/Product.js';
import { Order } from './models/Order.js';
import {User} from './models/User.js';

import bcrypt from 'bcrypt';




import { GraphQLScalarType, Kind } from 'graphql';

const dateScalar = new GraphQLScalarType({


  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (value instanceof Date) {
      return value.toLocaleDateString();
      //return value.getTime(); // Convert outgoing Date to integer for JSON
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10));
    }
    // Invalid hard-coded value (not an integer)
    return null;
  },
});

console.log(Date.now())





// GraphQL Resolvers
export const resolvers = {


  Date: dateScalar,

  Query: {
     // Query to get all users
     users: async () => {
      return await User.find();
    },
    login:  async(_, { password }) =>{
      const user = await User.findOne();  // Assume one user for simplicity
      if (user && bcrypt.compareSync(password, user.password)) {
        return true;
      }
      return false;
    },
    suppliers: async () => {
      try {
        const suppliers = await Supplier.find();
        console.log('list suppliers:', suppliers);
        return suppliers;
      } catch (error) {
        console.error('Error listing suppliers:', error);
        throw error;
      }
    },


    supplier: async (_, { id }) => {
      try {
        const supplier = await Supplier.findById(id);
        console.log('supplier', supplier);
        return supplier;
      } catch (error) {
        console.error('Error finding supplier:', error);
        throw error;
      }
    },

    products: async () => {
      try {
        const products = await Product.find();
        console.log('listing products', products);
        return products

      } catch (error) {
        console.error('Error finding products:', error);
        throw error;
      }
    },
    product: async (_, { id }) => {
      try {
        const product = await Product.findById(id);
        console.log('product', product);
        return product;

      } catch (error) {
        console.error('Error finding product:', error);
        throw error;
      }
    },

    orders: async () => {
      try {
        const orders = await Order.find();
        console.log('list orders:', orders);
        return orders;
      } catch (error) {
        console.error('Error listing orders:', error);
        throw error;
      }
    },
    order: async (_, { id }) => {
      try {
        const order = await Order.findById(id);
        console.log('order', order);
        return order;

      } catch (error) {
        console.error('Error finding order:', error);
        throw error;
      }
    },
    warehouses: async () => {
      try {
        const warehouses = await Warehouse.find();
        console.log('listing warehouses', warehouses);
        return warehouses

      } catch (error) {
        console.error('Error finding warehouses:', error);
        throw error;
      }
    },
    warehouse: async (_, { id }) => {
      try {
        const warehouse = await Warehouse.findById(id);
        console.log('warehouse', warehouse);
        return warehouse;

      } catch (error) {
        console.error('Error finding warehouse:', error);
        throw error;
      }
    },

    departments: async () => {
      try {
        const departments = await Department.find();
        console.log('listing departments', departments); 
        return departments

      } catch (error) {
        console.error('Error finding departments:', error);
        throw error;
      }
    },
    department: async (_, { id }) => {
      try {
        const departments = await Department.findById(id);
        console.log('departments', departments);
        return departments;

      } catch (error) {
        console.error('Error finding departments:', error);
        throw error;
      }
    },

    redstamps: async () => {
      try {
        const redstamps = await Redstamp.find();
        console.log('listing redstamps', redstamps);
        return redstamps

      } catch (error) {
        console.error('Error finding redstamps:', error);
        throw error;
      }
    },
    redstamp: async (_, { id }) => {
      try {
        const redstamps = await Redstamp.findById(id);
        console.log('redstamps', redstamps);
        return redstamps;

      } catch (error) {
        console.error('Error finding redstamps:', error);
        throw error;
      }
    },

    itemReasons: async () => {
      try {
        const itemReasons = await ItemReason.find();
        console.log('listing itemReasons', itemReasons);
        return itemReasons

      } catch (error) {
        console.error('Error finding itemReasons:', error);
        throw error;
      }
    },
    itemReason: async (_, { id }) => {
      try {
        const itemReasons = await ItemReason.findById(id);
        console.log('itemReasons', itemReasons);
        return itemReasons;

      } catch (error) {
        console.error('Error finding itemReasons:', error);
        throw error;
      }
    },



    arrivals: async () => await Arrival.find({}),

  },

  Mutation: {

     // Mutation to add a user
     addUser: async (_, { username, password }) => {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create a new user instance
      const newUser = new User({
        username,
        password: hashedPassword,
      });

      // Save the new user to the database
      await newUser.save();

      return newUser;
    },

    updateOrderProductStatus: async (_, { orderId , finalQuantity ,  productId, isOpen }) => {
      try {
        const order = await Order.findById(orderId);
        if (!order) {
          throw new Error(`Order with id ${orderId} not found`);
        }
  
        // Find the specific product in the order
        const productInOrder = order.orderProducts.find(
          (p) => p.product.toString() === productId
        );
  
        if (!productInOrder) {
          throw new Error(`Product with id ${productId} not found in the order`);
        }
  
        // Update isOpen status
        productInOrder.isOpen = isOpen;
        productInOrder.finalQuantity = finalQuantity;
  
        const updatedOrder = await order.save(); // Save the updated order
        console.log('Order product status updated successfully:', updatedOrder);
  
        return updatedOrder;
      } catch (error) {
        console.error('Error updating order product status:', error);
        throw error;
      }
    },

    updateOrderStatus: async (_, { orderId  }) => {
      try {
        const order = await Order.findById(orderId);
        if (!order) {
          throw new Error(`Order with id ${orderId} not found`);
        }
        // Update openOrder status
        order.openOrder = false;
  
        const updatedOrder = await order.save(); // Save the updated order
        console.log('Order  status updated successfully:', updatedOrder);
  
        return updatedOrder;
      } catch (error) {
        console.error('Error updating order  status:', error);
        throw error;
      }
    },


    addSupplier: async (_, { name, number, supplierDetails, products  , orders}) => {
      try {
        // Check if supplier with the given  name or number already exists
        const existingSupplier = await Supplier.findOne({
          number
          // $or: [
          //   { name : name },
          //   { number: number }
          // ]
        })

        if (!existingSupplier) {
          const newSupplier = new Supplier({
            name,
            number,
            supplierDetails,
            products,
            orders
          });
    
          await newSupplier.save();
          console.log('Supplier added successfully:', newSupplier);
    
          return newSupplier;

        }
        else {
          console.log(`supplier ${existingSupplier.name} with number ${existingSupplier.number}  already exists`)
        }
      } catch (error) {
        console.error('Error adding supplier:', error);
        throw error;
      }
    },

    addProduct: async (_, { name,  code, quantityPerBox, supplierId  }) => {
      try {
        // Check if product with the given code  already exists
        const existingProduct = await Product.findOne({ code })
        console.log("existingProduct", existingProduct)

        if (!existingProduct) {
          const product = new Product({ name, code, quantityPerBox, supplier: supplierId });
          product.toto = "toto"
          console.log("product from addProduct" , product)
          await product.save();

          // Find the supplier and update the products array
          const supplier = await Supplier.findById(supplierId);
          if (!supplier) {
            throw new Error('Supplier not found');
          }

          supplier.products.push(product);
          await supplier.save();
          console.log('product added success', product)
          return product;
        }
        else {
          console.log(`product ${existingProduct.name} with code ${existingProduct.code}  already exists`)
        }
      } catch (error) {
        console.error('Error adding product:', error);
        throw error;
      }
    },



   

    
    addOrder: async (_, { supplierId, orderProducts ,date ,  reference }) => {
      try {

        console.log('Checking for Order with reference:', reference);

        if (!Array.isArray(orderProducts) || orderProducts.length === 0) {
                 throw new Error('OrderProducts should be a non-empty array');
            }

            // Check if an order with the given reference already exists
         const existingOrder = await Order.findOne({ reference });
         console.log('Existing Order:', existingOrder);

        const supplier = await Supplier.findById(supplierId);
        if (!supplier) throw new Error('Supplier not found');

         //if order already exists
         if (!existingOrder) {
          // Find the order with the highest EDI value and increment it
          const highestOrder = await Order.findOne().sort({ edi: -1 }).exec();
          const newEdi = highestOrder ? highestOrder.edi + 1 : 1;
          console.log('New edi:', newEdi);

           
          let totalBoxes = 0;
          for (const { productId, initialQuantity } of orderProducts) {
            console.log(`Processing product with ID: ${productId}, quantity: ${initialQuantity}`);
            const product = await Product.findById(productId);
            if (product) {
              console.log(`Found product: ${product}`);
               //Add isOpen property to the product
               // product.isOpen = true;
              const numberOfBoxes = Math.ceil(initialQuantity / product.quantityPerBox);
              totalBoxes += numberOfBoxes;
            } else {
              throw new Error(`Product with ID ${productId} not found`);
            }
          }
   
          const totalQuantity = orderProducts.reduce((sum, p) => sum + p.initialQuantity, 0);
   
           orderProducts = orderProducts.map(p => ({
            product: p.productId,
             initialQuantity: p.initialQuantity,
            finalQuantity:p.finalQuantity,
            quantityPerBox: p.quantityPerBox,
            //isOpen: true ,// Ensure the isOpen property is added to each product in the order
            toto:"toto",
            isOpen:true
          }));

          console.log("orderProducts from addOrder" , orderProducts)
   
          // Create and save the new order with the correct edi field
         const newOrder = new Order({
           supplier: supplierId,
           orderProducts,
           reference,
           edi: newEdi, // Ensure the correct field is assigned
           date,
           totalQuantity,
           totalBoxes,
           openOrder:true
         });
   
         await newOrder.save();
         console.log('Order added successfully:', newOrder);
   
         return newOrder;
       } else {
         let totalBoxes = 0;
         for (const { productId, initialQuantity } of orderProducts) {
           console.log(`Processing product with ID: ${productId}, quantity: ${initialQuantity}`);
           const existingProductIndex = existingOrder.products.findIndex(p => p.product && p.product.toString() === productId);
   
           if (existingProductIndex > -1) {
             existingOrder.products[existingProductIndex].initialQuantity += initialQuantity;
   
             const product = await Product.findById(productId);
             if (product) {
               //product.isOpen = true;
               console.log(`Found product: ${product}`);
               const numberOfBoxes = Math.ceil(existingOrder.products[existingProductIndex].initialQuantity / product.quantityPerBox);
               totalBoxes += numberOfBoxes;
             } else {
               throw new Error(`Product with ID ${productId} not found`);
             }
           } else {
             existingOrder.products.push({ product: productId, initialQuantity });
   
             const product = await Product.findById(productId);
             if (product) {
               console.log(`Found product: ${product}`);
               //product.isOpen = true; // Add isOpen property to the product
                const numberOfBoxes = Math.ceil(initialQuantity / product.quantityPerBox);
                totalBoxes += numberOfBoxes;
              } else {
                throw new Error(`Product with ID ${productId} not found`);
              }
            }
          }
   
          existingOrder.totalQuantity = existingOrder.products.reduce((sum, p) => sum + p.initialQuantity, 0);
          existingOrder.totalBoxes = totalBoxes;
   
          const updatedOrder = await existingOrder.save();
          console.log('Order updated successfully:', updatedOrder);
   
          return updatedOrder;
        }
  
        // const newOrderProducts = await Promise.all(orderProducts.map(async op => {
        //   const product = await Product.findById(op.productId);
        //   if (!product) throw new Error('Product not found');
        //   return { 
        //     product, 
        //     initialQuantity: op.initialQuantity,  // Use initialQuantity
        //     isOpen: true  // Set default to open
        //   };
        // }));
  
        // console.log("newOrderProducts",newOrderProducts)
  
        // const order = new Order({ supplier,reference ,  orderProducts: newOrderProducts });
        // await order.save();
  
        // supplier.orders.push(order);
        // await supplier.save();
  
        // return order;
     
        
      } catch (error) {
        console.error('Error adding order:', error);
      } 
      },
    

    addDepartment: async (_, { title }) => {
      try {
        // Check if department with the given title  already exists
        const existingDepartment = await Department.findOne({ title })

        if (!existingDepartment) {
          const department = new Department({ title });
          await department.save();
          console.log('department added success', department)
          return department;
        }
        else {
          console.log(`department ${existingDepartment.title}   already exists`)
        }
      } catch (error) {
        console.error('Error adding department:', error);
        throw error;
      }
    },

    addRedstamp: async (_, { title }) => {
      try {
        // Check if redstamp with the given title  already exists
        const existingRedstamp = await Redstamp.findOne({ title })

        if (!existingRedstamp) {
          const redstamp = new Redstamp({ title });
          await redstamp.save();
          console.log('redstamp added success', redstamp)
          return redstamp;
        }
        else {
          console.log(`redstamp ${existingRedstamp.title}   already exists`)
        }
      } catch (error) {
        console.error('Error adding redstamp:', error);
        throw error;
      }
    },

    addItemReason: async (_, { title }) => {
      try {
        // Check if itemReason with the given title  already exists
        const existingItemReason = await ItemReason.findOne({ title })

        if (!existingItemReason) {
          const itemReason = new ItemReason({ title });
          await itemReason.save();
          console.log('itemReason added success', itemReason)
          return itemReason;
        }
        else {
          console.log(`itemReason ${existingItemReason.title}   already exists`)
        }
      } catch (error) {
        console.error('Error adding existingItemReason:', error);
        throw error;
      }
    },

  },

  // supplier : async (_, { id }) =>{
  //   try {
  //     const supplier  = await Supplier.findById(id);
  //   console.log('supplier' , supplier);
  //   return supplier;
  //   } catch (error) {
  //     console.error('Error finding supplier:', error);
  //     throw error;
  //   }
  // },

  Supplier: {
    products: async (supplier) => {
      try {
        const product = await Product.find({ supplier: supplier.id })
        console.log("product from Supplier", product)
        
        // supplier.products.push(product)
        return product;
      } catch (error) {
        console.error('Error finding product:', error);
        throw error;
      }

    }
  },
  // Supplier: {

  //   products: async(supplier) => await Product.find({ supplier: supplier.id })
  // },

  Product: {
    supplier: async (product) => {
      try {
        const supplier = await Supplier.findById(product.supplier)
        console.log("supplier", supplier)
        return supplier
      } catch (error) {
        console.error('Error finding supplier:', error);
        throw error;
      }

    }
  },


  Order: {
    supplier: async (order) => {
      try {

        const supplier = await Supplier.findById(order.supplier)
        if (!supplier) {
          throw new Error(`supplier with id ${order.supplier} not found`);
        }
        if (supplier.number == null) {
          throw new Error(`Supplier number is null for id ${order.supplier}`);
        }
        return supplier;

      } catch (error) {
        console.error('Error finding supplier:', error);
        throw error;
      }

    },

    orderProducts: async (order) => {
      console.log("order", order)

      try {
        const populatedProducts = await Promise.all(order.orderProducts.map(async (op) => {
          
          const product = await Product.findById(op.product);
           console.log("product" , product)

          // initialQuantity = op.initialQuantity
          // finalQuantity= op.finalQuantity
          // boxes = op.boxes
          // isOpen = op.isOpen


          console.log("op", op)

          return { product, initialQuantity: op.initialQuantity ,finalQuantity: op.finalQuantity, isOpen: op.isOpen  };
        }));
        console.log("populatedProducts", populatedProducts)

        return populatedProducts;
      }
      catch (error) {
        console.error('Error finding supplier:', error);
        throw error;
      }
    }

  }



}

