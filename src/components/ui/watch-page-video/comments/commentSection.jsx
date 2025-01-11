import CommentList from './commentList';
import AddComment from './addComment';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import DrawerCommentBox from './drawerCommentBox';

const CommentSection = ({ videoId }) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div className="w-full mt-2 md:mt-10">
      {isDesktop ? (
        <>
          <AddComment videoId={videoId} />
          <CommentList videoId={videoId} />
        </>
      ) : (
          <DrawerCommentBox videoId={videoId} />
      )}
    </div>
  );
};

export default CommentSection;
