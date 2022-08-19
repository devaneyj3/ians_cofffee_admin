import React from "react";
import Nav from "./nav";

import classes from "./layout.module.scss";
import Footer from "./footer";

export default function Layout({ children }) {
	return (
		<div>
			<Nav />
			{children}
			<Footer />
		</div>
	);
}
