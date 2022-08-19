import React from "react";

import classes from "./footer.module.scss";

import Link from "next/link";

export default function Footer() {
	return (
		<div className={classes.footer}>
			<span>@2022 The Web Accelerator</span>
		</div>
	);
}
