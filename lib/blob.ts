import { Session } from "next-auth";
import { put } from "@vercel/blob";

export async function putImage(img: File, session: Session) {
    if (!session) throw new Error("Put action restricted. Please Log In.")
    const url = await put("pics/" + img.name, img, { access: "public" });
    return url
}