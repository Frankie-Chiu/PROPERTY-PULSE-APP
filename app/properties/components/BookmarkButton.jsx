"use client";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const BookmarkButton = ({ property }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchBookmarkStatus = async () => {
      try {
        const res = await bookmarkProperty(property._id, true); // checkOnly = true
        setIsBookmarked(res.isBookmarked);
      } catch (error) {
        toast.error(error.message || "Failed to check bookmark status");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkStatus();
  }, [property._id, userId]);

  const handleClick = async () => {
    if (!userId) {
      toast.error("You need to sign in to bookmark a listing");
      return;
    }

    setLoading(true);
    try {
      const res = await bookmarkProperty(property._id); // Toggles bookmark
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    } catch (error) {
      toast.error(error.message || "Failed to update bookmark");
    } finally {
      setLoading(false);
    }
  };

  const buttonColor = isBookmarked ? "red" : "blue";
  const buttonText = loading ? "Loading..." : isBookmarked ? "Remove Bookmark" : "Bookmark Property";

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`bg-${buttonColor}-500 hover:bg-${buttonColor}-700 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <FaBookmark className="mr-2" /> {buttonText}
    </button>
  );
};

export default BookmarkButton;