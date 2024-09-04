import { createThirdwebClient } from 'thirdweb'
import { env } from 'process';

const CLIENT_ID = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;
console.log(env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID)

export const thirdwebClient = createThirdwebClient({
    clientId: CLIENT_ID!
})
