import React, { useEffect, useState } from "react";

import { useOrderContext } from "../src/contexts/OrderContext";

import classes from "./orders.module.scss";

import Order from "../src/components/order/order";

export default function Orders() {
	const [orders, setOrders] = useState([]);

	const { fetchAllOrders } = useOrderContext();

	useEffect(() => {
		const getOrders = async () => {
			const orders = await fetchAllOrders();
			setOrders(orders);
		};
		getOrders();
	}, []);
	return (
		<>
			{orders.length > 0 ? (
				<>
					<h3 className={classes.order_length}>
						{orders.length > 1
							? `There are ${orders.length} orders`
							: `There is ${orders.length} order`}
					</h3>
					<div className={classes.orders_page}>
						{orders.map((order) => {
							const total = order?.total.toFixed(2);
							//convert date to readable format
							const date = new Date(order?.createdAt);
							const dateString = date.toLocaleDateString();

							return (
								<div key={order.id} className={classes.orders_container}>
									<section className={classes.order}>
										<p>{order.status}</p>
										<p>&#8226;</p>
										<p>{dateString}</p>
										<p>&#8226;</p>
										<p>${total}</p>
									</section>

									<section className={classes.orderInfo}>
										<Order id={order.id} userID={order.userID} />
									</section>
								</div>
							);
						})}
					</div>
				</>
			) : (
				<h3 className={classes.order_length}>There are no orders</h3>
			)}
		</>
	);
}
