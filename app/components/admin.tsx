import { auth, signIn, signOut } from "@/auth";

export default async function Admin() {
	const session = await auth();
	const user = session?.user;
	return user ? (
		<>
			<h1>Hi, {user.name}!</h1>
			<form
				action={async () => {
					"use server";
					await signOut();
				}}
			>
				<button type='submit'>Logout</button>
			</form>
		</>
	) : (
		<form
			action={async () => {
				"use server";
				await signIn("google");
			}}
		>
			<button type='submit'>Login</button>
		</form>
	);
}
