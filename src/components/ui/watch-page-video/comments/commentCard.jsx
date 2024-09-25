import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { Avatar } from "@nextui-org/react";

const CommentCard = ({ comment }) => {
  let description =
    "Hello there chc uyhsi isyhaskchdg asudgasuiudg aushuagdf asiduiafj dvghyjdgjhgas gdgyfdyfyuj fdfsf gyuhgyvdyuf fdfyuaf dyutsyudf sfdygsyfdyf sdgsuif dyfysf ";
  return (
    <div className="w-full inline-flex gap-3 my-3">
      <Link to={`/c/${comment?.owner?.username}`} className="pt-2">
        <Avatar
          src={comment?.owner?.avatar?.url}
          name={comment?.owner?.fullName}
        />
      </Link>
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <Link
            to={`/c/${comment?.owner?.username}`}
            className="text-sm font-medium"
          >
            @{comment?.owner?.username}
          </Link>
          <ReactTimeAgo
            date={new Date(comment?.createdAt)}
            locale="en-US"
            className="text-xs font-semibold text-default-500"
          />
        </div>
        <p className="text-sm font-medium">{comment?.content}</p>
        {/* <p className="text-sm font-medium">{description}</p> */}
      </div>
    </div>
  );
};

export default CommentCard;
