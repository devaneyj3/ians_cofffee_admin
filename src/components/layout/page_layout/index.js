import React from "react";

import classes from "./page_layout.module.scss";

export default function PageLayout({ children }) {
	return <div className={classes.page_container}>{children}</div>;
}
