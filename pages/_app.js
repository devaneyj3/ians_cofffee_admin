import { Amplify } from "aws-amplify";

import awsExports from "../src/aws-exports";
import "@aws-amplify/ui-react/styles.css";

import { Authenticator } from "@aws-amplify/ui-react";

import Layout from "../src/components/layout";

import "../public/styles.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { DrinkContextProvider } from "../src/contexts/DrinkContext";

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps }) {
	return (
		<Authenticator
			variation="modal"
			signUpAttributes={["email", "phone_number", "name"]}>
			<DrinkContextProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</DrinkContextProvider>
		</Authenticator>
	);
}

export default MyApp;
