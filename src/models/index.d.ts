import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum OrderStatus {
  NEW = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  COMPLETED = "COMPLETED"
}



type OrderDrinkMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DrinkMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrderMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CartMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CartItemMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class OrderDrink {
  readonly id: string;
  readonly Drink?: Drink | null;
  readonly orderID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderDrinkDrinkId?: string | null;
  constructor(init: ModelInit<OrderDrink, OrderDrinkMetaData>);
  static copyOf(source: OrderDrink, mutator: (draft: MutableModel<OrderDrink, OrderDrinkMetaData>) => MutableModel<OrderDrink, OrderDrinkMetaData> | void): OrderDrink;
}

export declare class Drink {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly image?: string | null;
  readonly price: number;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Drink, DrinkMetaData>);
  static copyOf(source: Drink, mutator: (draft: MutableModel<Drink, DrinkMetaData>) => MutableModel<Drink, DrinkMetaData> | void): Drink;
}

export declare class Order {
  readonly id: string;
  readonly total: number;
  readonly userID: string;
  readonly status: OrderStatus | keyof typeof OrderStatus;
  readonly OrderDrinks?: (OrderDrink | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Order, OrderMetaData>);
  static copyOf(source: Order, mutator: (draft: MutableModel<Order, OrderMetaData>) => MutableModel<Order, OrderMetaData> | void): Order;
}

export declare class Cart {
  readonly id: string;
  readonly CartItems?: (CartItem | null)[] | null;
  readonly userID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Cart, CartMetaData>);
  static copyOf(source: Cart, mutator: (draft: MutableModel<Cart, CartMetaData>) => MutableModel<Cart, CartMetaData> | void): Cart;
}

export declare class CartItem {
  readonly id: string;
  readonly quantity: number;
  readonly Drink?: Drink | null;
  readonly cartID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly cartItemDrinkId?: string | null;
  constructor(init: ModelInit<CartItem, CartItemMetaData>);
  static copyOf(source: CartItem, mutator: (draft: MutableModel<CartItem, CartItemMetaData>) => MutableModel<CartItem, CartItemMetaData> | void): CartItem;
}

export declare class User {
  readonly id: string;
  readonly email: string;
  readonly phone: string;
  readonly Carts?: (Cart | null)[] | null;
  readonly Orders?: (Order | null)[] | null;
  readonly sub: string;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}