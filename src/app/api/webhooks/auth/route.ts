import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { CreateUser } from "@/db/user/schema";
import { createUser, deleteUser, updateUser } from "@/utils";

export async function POST(req: Request) {
  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  try {
    const payload = await req.json()
    const eventType = payload.type

    switch (eventType) {
      case 'user.created':
        const userDto: CreateUser = {
          authId: payload.data.id,
          profilePictureUrl: payload.data.image_url,
          email: payload.data.email_addresses[0].email_address,
          username: payload.data.username,
          firstName: payload.data.first_name,
          LastName: payload.data.last_name,
          createdAt: new Date(payload.data.created_at),
        };
        await createUser(userDto);
        break
      case 'user.updated':
        if (payload.data.id) {
          const userDto: CreateUser = {
            authId: payload.data.id,
            profilePictureUrl: payload.data.image_url,
            email: payload.data.email_addresses[0].email_address,
            username: payload.data.username,
            firstName: payload.data.first_name,
            LastName: payload.data.last_name,
          };
          await updateUser(userDto);
        }
        break
      case 'user.deleted':
        if (payload.data.id) {
          await deleteUser(payload.data.id);
        }
        break
    }

    return new Response('', { status: 200 })
  } catch (error) {
    console.error('Error handling webhook:', error)
    return new Response('Error processing webhook', { status: 400 })
  }
}
