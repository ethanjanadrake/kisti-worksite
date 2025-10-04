import getCollection from "../lib/db";

export default async function Home() {
	const welcomeText = "Welcome to Kisti's Portfolio!";
	const collection = await getCollection("users");
	// const documents = await collection?.find().toArray();
	// documents?.forEach(i => {
	// 	console.log(i);
	// });
	// const results = await collection?.insertOne({
	// 	name: "JJ D",
	// 	email: "ejd@gmail.com",
	// 	password: "pwd",
	// });
	return (
		<>
			<h1 className='text-3xl'>{welcomeText}</h1>
		</>
	);
}
