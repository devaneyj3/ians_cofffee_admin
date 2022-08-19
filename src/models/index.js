// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "IN_PROGRESS": "IN_PROGRESS",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "COMPLETED": "COMPLETED"
};

const { OrderDrink, Drink, Order, Cart, CartItem, User } = initSchema(schema);

export {
  OrderDrink,
  Drink,
  Order,
  Cart,
  CartItem,
  User,
  OrderStatus
};