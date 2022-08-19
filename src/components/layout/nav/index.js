import React from "react";

import Link from "next/link";

import classes from "./nav.module.scss";

import { useRouter } from "next/router";
import { Button } from "reactstrap";

import { Auth } from "aws-amplify";

export default function Nav() {
	const router = useRouter();

	//sign customer out
	const signOut = async () => {
		await Auth.signOut();
	};
	return (
		<nav className={classes.nav_container}>
			<video autoPlay muted loop className={classes.video}>
				<source src="/video/making_coffee.mp4" type="video/mp4" />
			</video>
			<ul className={classes.nav}>
				<Link href="/">Home</Link>
				<Link href="/orders">Orders</Link>
				<Button color="danger" onClick={() => signOut()}>
					Sign Out
				</Button>
			</ul>
			<section className={classes.info}>
				<h1 className={classes.greeting}>Welcome to Ian's Coffee</h1>
			</section>
		</nav>
	);
}
