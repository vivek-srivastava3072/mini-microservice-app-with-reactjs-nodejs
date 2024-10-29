import React from "react";

export default function CommentList({ comments }) {
  return (
    <div className="mt-3">
      All Comments ({comments?.length})
      {comments?.map((comment) => {
        return (
          <div
            key={comment.id}
            className={`${
              comment.status === "pending"
                ? "text-warning"
                : comment.status === "rejected"
                ? "text-danger font-italic"
                : ""
            } border fs-6 list-group-item list-group-item-light px-1 py-0`}
          >
            {comment.status === "pending" ? (
              <div className="text-warning">Awaiting moderation</div>
            ) : (
              comment.content
            )}
          </div>
        );
      })}
    </div>
  );
}
