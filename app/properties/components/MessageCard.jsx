"use client";
import { useState, useMemo } from "react"; // CHANGE: Added useMemo
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";
import React from "react"; // CHANGE: Added for React.memo

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  // CHANGE: Memoize formatted date to avoid recomputation on every render
  const formattedDate = useMemo(() => {
    return new Date(message.createdAt).toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  }, [message.createdAt]);

  const handleRead = async () => {
    try {
      const read = await markMessageAsRead(message._id);
      // CHANGE: Only update state and count if the action succeeds
      setIsRead(read);
      setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1));
      toast.success(`Marked As ${read ? "Read" : "New"}`);
    } catch (error) {
      // CHANGE: Added error handling
      toast.error("Failed to update message status");
      console.error("Error marking message as read:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMessage(message._id);
      // CHANGE: Only update state and count if the action succeeds
      setIsDeleted(true);
      setUnreadCount((prevCount) => (isRead ? prevCount : prevCount - 1));
      toast.success("Message Deleted");
    } catch (error) {
      // CHANGE: Added error handling
      toast.error("Failed to delete message");
      console.error("Error deleting message:", error);
    }
  };

  // CHANGE: Early return for deleted state to avoid rendering the rest
  if (isDeleted) {
    return <p className="text-gray-500">Message deleted</p>;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong> {/* CHANGE: Fixed email link syntax */}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong> {/* CHANGE: Fixed phone link syntax */}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong> {formattedDate}{" "}
          {/* CHANGE: Use memoized date */}
        </li>
      </ul>
      <div className="mt-3 flex space-x-4">
        {/* CHANGE: Moved buttons to a flex container for better styling */}
        <button
          onClick={handleRead}
          className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
        >
          {isRead ? "Mark As New" : "Mark As Read"}
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// CHANGE: Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(MessageCard);
