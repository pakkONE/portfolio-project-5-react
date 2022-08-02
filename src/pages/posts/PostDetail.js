import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Figure from "react-bootstrap/Figure";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/UserContext";
import Avatar from "../../components/Avatar";
import styles from "../../styles/PostDetail.module.css";
import { axiosRes } from "../../api/axiosDefaults";

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
    setPost,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleLike = async () => {
    try {
      const { data } = await axiosRes.post("/likes/", { post: id });
      setPost((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async () => {
    try {
      const { data } = await axiosRes.delete(`/likes/${like_id}`);
      setPost((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? { ...post, likes_count: post.likes_count - 1, like_id: null }
            : post;
        }),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className="justify-content-center">
      <Col md={10} className={`bg-light ${styles.Upload}`}>
        <Container className="text-center">
          <Card className={styles.Post}>
            <Card.Body className="d-flex">
              <Figure className={styles.Figure}>
                <Link to={`/profiles/${profile_id}`}>
                  <Avatar src={profile_image} height={55} />
                  {owner}
                </Link>
                <span>{updated_at}</span>
                {is_owner && "..."}
              </Figure>
            </Card.Body>
            <Link to={`/posts/${id}`}>
              <Card.Img className={styles.Img} src={image} alt={title} />
            </Link>
            <Card.Body>
              {title && <Card.Title>{title}</Card.Title>}
              {tags && (
                <Card.Subtitle className="mb-2 small text-muted">
                  Sport: {tags}
                </Card.Subtitle>
              )}
              {content && <Card.Text>{content}</Card.Text>}
              {is_owner ? (
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip>
                      You <strong>can't</strong> like your own posts.
                    </Tooltip>
                  }
                >
                  <i className="far fa-heart" />
                </OverlayTrigger>
              ) : like_id ? (
                <span onClick={handleUnlike}>
                  <i className={`m-2 fas fa-heart ${styles.Heart}`} />
                </span>
              ) : currentUser ? (
                <span onClick={handleLike}>
                  <i className={`m-2 far fa-heart ${styles.HeartOutline}`} />
                </span>
              ) : (
                <OverlayTrigger
                  placement="bottom"
                  overlay={
                    <Tooltip>
                      You need to <strong>log in</strong> to like a post!
                    </Tooltip>
                  }
                >
                  <i className="m-2 far fa-heart" />
                </OverlayTrigger>
              )}
              {likes_count}
              <Link to={`/posts/${id}`}>
                <i className="m-2 far fa-comments" />
              </Link>
              {comments_count}
            </Card.Body>
          </Card>
        </Container>
      </Col>
    </Row>
  );
};

export default PostDetail;
