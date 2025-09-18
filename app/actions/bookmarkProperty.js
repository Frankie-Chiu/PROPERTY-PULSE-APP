"use server";
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId, checkOnly = false) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;

  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const isBookmarked = user.bookmarks.includes(propertyId);

  if (checkOnly) {
    return { isBookmarked };
  }

  let message;

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = "Bookmark Removed";
  } else {
    user.bookmarks.push(propertyId);
    message = "Bookmark Added";
  }

  await user.save();

  revalidatePath("/properties/saved", "page");

  return {
    message,
    isBookmarked: !isBookmarked, // Reflect new state after toggle
  };
}

export default bookmarkProperty;
