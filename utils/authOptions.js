import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectDB();
        const currentUser = await User.findOne({ email: profile.email });
        if (!currentUser) {
          await User.create({
            username: profile.name,
            email: profile.email,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log("Error in sign in callback:", error);
        return false;
      }
    },
    async session({ session }) {
      try {
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          session.user.id = user._id.toString();
        }
        return session;
      } catch (error) {
        console.log("Error in session callback:", error);
        return session;
      }
    },
  },
};

export default authOptions;
