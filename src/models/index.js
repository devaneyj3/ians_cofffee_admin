// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const OrderStatus = {
  "NEW": "NEW",
  "IN_PROGRESS": "IN_PROGRESS",
  "READY_FOR_PICKUP": "READY_FOR_PICKUP",
  "COMPLETED": "COMPLETED"
};

const { Cart, CartItem, OrderDrink, Order, Drink, User } = initSchema(schema);

export {
  Cart,
  CartItem,
  OrderDrink,
  Order,
  Drink,
  User,
  OrderStatus
};