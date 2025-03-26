import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [ 
    Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
        async authorize(credentials) {
            // user object return null 
            let user = null;
            //validate credentials
            //get user

            user = {
                id: 1,
                name: "John Doe",
                email: "YsXfX@example.com"
            }
            
            if (!user) {
                throw new Error("Invalid credentials")
            }
            
            return user; // Return the user object
        }

    })  
  ],
})