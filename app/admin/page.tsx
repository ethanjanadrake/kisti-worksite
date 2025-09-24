import { auth } from "@/auth";

const Admin = async () => {
	const session = await auth();
	return session ? (
		<h1>Admin Content</h1>
	) : (
		<h1>Admins Only! Please Log In.</h1>
	);
};

export default Admin;
