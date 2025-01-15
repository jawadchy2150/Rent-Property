import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic'

// PUT /api/messages/:id
export const PUT = async (request, { params}) => {
    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        const { id } = await params;

        if(!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', {
                status: 401
            })
        }
        const { userId} = sessionUser;

        const message = await Message.findById(id);

        if(!message) return new Response("Message not found", {status: 404})

        // verify ownership
        if(message.recipient.toString() !== userId) {
            return new Response('Unauthorized', {status: 401})
        }

        // update messge to read/unread depending on the current status

        message.read = !message.read;
        await message.save();

        return new Response(JSON.stringify(message), {status: 200})

        
    } catch (error) {
        console.log(error);
        return new Response('Something went wrong', {status: 500})
    }
}