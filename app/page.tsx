import getCollection from "../lib/db";
import Image from "next/image";

export default async function Home() {
	const welcomeText = "Welcome to Kisti's Portfolio!";
	const collection = await getCollection("img_ref");
	const documents = await collection?.find().toArray();
	documents?.forEach(doc => {
		console.log(doc._id);
	});
	return (
		<>
			<h1 className='text-3xl'>{welcomeText}</h1>
			{documents?.map(imgref => (
				<div key={imgref._id.toString()}>
					<Image
						src={imgref.url.url}
						width={500}
						height={500}
						alt={imgref.description}
					/>
					<h2>{imgref.description}</h2>
				</div>
			))}
		</>
	);
}
