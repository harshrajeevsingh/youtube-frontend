import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { Avatar } from '@nextui-org/react';

const CommentCard = ({ comment }) => {
  return (
    <div className="w-full inline-flex gap-3 my-3">
      <Link to={`/c/${comment?.owner?.username}`} className="pt-2">
        <Avatar
          src={comment?.owner?.avatar?.url}
          name={comment?.owner?.fullName}
          size="sm"
        />
      </Link>
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <Link
            to={`/c/${comment?.owner?.username}`}
            className="text-sm font-normal"
          >
            @{comment?.owner?.username}
          </Link>
          <ReactTimeAgo
            date={new Date(comment?.createdAt)}
            locale="en-US"
            className="text-xs font-medium text-default-500"
          />
        </div>
        <p className="text-sm font-normal">{comment?.content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
