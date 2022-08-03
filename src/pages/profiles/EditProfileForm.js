import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser, useSetCurrentUser } from "../../contexts/UserContext";
import { axiosReq } from "../../api/axiosDefaults";

const EditProfileForm = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const imageFile = useRef();

  const [profileData, setProfileData] = useState({
    name: "",
    content: "",
    image: "",
  });
  const { name, content, image } = profileData;

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleMount = async () => {
      if (currentUser?.profile_id?.toString() === id) {
        try {
          const { data } = await axiosReq.get(`/profiles/${id}/`);
          const { name, content, image } = data;
          setProfileData({ name, content, image });
        } catch (error) {
        //   console.log(error);
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    handleMount();
  }, [currentUser, navigate, id]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);

    if (imageFile?.current?.files[0]) {
      formData.append("image", imageFile?.current?.files[0]);
    }

    try {
      const { data } = await axiosReq.put(
        `/profiles/${currentUser.profile_id}/`,
        formData
      );
      setCurrentUser((currentUser) => ({
        ...currentUser,
        profile_image: data.image,
      }));
      navigate(`/profiles/${id}/`);
    } catch (error) {
    //   console.log(error);
      setErrors(error.response?.data);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Container className={`text-center p-5 ${appStyles.Content}`}>
          <Form.Group>
            {image && (
              <figure>
                <Image src={image} fluid />
              </figure>
            )}
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Label
              className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
              htmlFor="image-upload"
            >
              Change the image
            </Form.Label>
            <Form.Control
              id="image-upload"
              type="file"
              className="mt-5"
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files.length) {
                  setProfileData({
                    ...profileData,
                    image: URL.createObjectURL(e.target.files[0]),
                  });
                }
              }}
              ref={imageFile}
            />
          </Form.Group>
          {errors.image?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
        </Container>
        <Container className={`text-center p-5 ${appStyles.Content}`}>
        <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Share your display name"
              value={name}
              onChange={handleChange}
              name="name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Bio</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Tell us something about yourself..."
              value={content}
              onChange={handleChange}
              name="content"
              rows={7}
            />
          </Form.Group>

          {errors?.content?.map((message, idx) => (
            <Alert variant="warning" key={idx}>
              {message}
            </Alert>
          ))}
          <Button variant="outline-primary" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="outline-primary" type="submit">
            Save
          </Button>
        </Container>
      </Row>
    </Form>
  );
};

export default EditProfileForm;
