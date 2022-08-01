import React from "react";
import Card from "react-bootstrap/Card";
import Figure from "react-bootstrap/Figure";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/UserContext";
import Avatar from "../../components/Avatar";
import styles from "../../styles/PostDetail.module.css";

const PostDetail = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    likes_count,
    like_id,
    tags,
    title,
    content,
    image,
    updated_at,
    ViewPostPage,
    setPosts,
  } = props;

  //   const { FO, IH, GO, TE, PA, OT } = tags;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card>
      <Card.Body>
        <div className="text-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <span>{updated_at}</span>
          {is_owner && ViewPostPage && "..."}
        </div>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img variant="top" src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title>{title}</Card.Title>}
        {tags && (
          <Card.Subtitle className="mb-2 small text-muted">
            Category: {tags}
          </Card.Subtitle>
        )}
        {content && <Card.Text>{content}</Card.Text>}
        {likes_count && (
          <Card.Subtitle className="mb-2 text-muted">
            {likes_count}
          </Card.Subtitle>
        )}
        {comments_count && (
          <Card.Subtitle className="mb-2 text-muted">
            {comments_count}
          </Card.Subtitle>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostDetail;
