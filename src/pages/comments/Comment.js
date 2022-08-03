import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { EditDropdown } from "../../components/EditDropdown";
import { useCurrentUser } from "../../contexts/UserContext";
import styles from "../../styles/Comment.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import { axiosRes } from "../../api/axiosDefaults";
import EditCommentForm from "./EditCommentForm";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (error) {
    //   console.log(error);
    }
  };

  return (
    <div>
      <ListGroup as="div">
        <ListGroup.Item className="d-flex justify-content-between align-items-start">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
          </Link>
          <div className="ms-2 me-auto">
            <div className="fw-bold">
              {owner} <span className={styles.Date}>- {updated_at}</span>
            </div>
            {showEditForm ? (
              <EditCommentForm
                id={id}
                profile_id={profile_id}
                content={content}
                profileImage={profile_image}
                setComments={setComments}
                setShowEditForm={setShowEditForm}
              />
            ) : (
              <p>{content}</p>
            )}
          </div>
          {is_owner && !showEditForm && (
            <EditDropdown
              handleEdit={() => setShowEditForm(true)}
              handleDelete={handleDelete}
            />
          )}
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default Comment;
