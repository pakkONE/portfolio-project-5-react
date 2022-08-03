import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom";
import PostDetail from "./PostDetail";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Spinner from "../../components/Spinner";
import { useCurrentUser } from "../../contexts/UserContext";
import CreateCommentForm from "../comments/CreateCommentForm";
import Comment from "../comments/Comment";

const ViewPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: post }, { data: comments }] = await Promise.all([
          axiosReq.get(`/posts/${id}`),
          axiosReq.get(`/comments/?post=${id}`),
        ]);
        setPost({ results: [post] });
        setComments(comments);
      } catch (error) {
        // console.log(error);
      }
    };
    handleMount();
  }, [id]);

  return (
    <div className="p-5">
      <Col className="p-5 my-0 bg-light rounded-4">
        <Container className="main text-center">
          <PostDetail {...post.results[0]} setPosts={setPost} ViewPostPage />
          <Container>
            {currentUser ? (
              <CreateCommentForm
                profile_id={currentUser.profile_id}
                profileImage={profile_image}
                post={id}
                setPost={setPost}
                setComments={setComments}
              />
            ) : comments.results.length ? (
              "Comments"
            ) : null}
            {comments.results.length ? (
              <InfiniteScroll
                children={comments.results.map((comment) => (
                  <Comment
                    key={comment.id}
                    {...comment}
                    setPost={setPost}
                    setComments={setComments}
                  />
                ))}
                dataLength={comments.results.length}
                loader={<Spinner />}
                hasMore={!!comments.next}
                next={() => fetchMoreData(comments, setComments)}
              />
            ) : currentUser ? (
              <span>No comments yet, be the first to comment!</span>
            ) : (
              <span>No comments... yet</span>
            )}
          </Container>
        </Container>
      </Col>
    </div>
  );
};

export default ViewPostPage;
