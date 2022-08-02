import React, { useRef, useState } from "react";
import styles from "../../styles/CreatePostPage.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Alert } from "react-bootstrap";

const CreatePostPage = () => {
  const [errors, setErrors] = useState({});

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    tags: "",
  });
  const { title, content, image, tags } = postData;

  const imageInput = useRef(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleTags = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
      console.log(image);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", imageInput.current.files[0]);
    formData.append("tags", tags);

    try {
      const { data } = await axiosReq.post("/posts/", formData);
      navigate(`/posts/${data.id}`);
    } catch (error) {
      console.log(error);
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
      }
    }
    console.log(imageInput.current.files[0]);
  };

  return (
    <div>
      <Form className="pb-2" onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col
            md={10}
            className={`p-3 my-3 bg-light rounded-4 ${styles.Upload}`}
          >
            <Container className="m-1 py-2 px-5 text-center">
              <Form.Group className="my-3">
                {image ? (
                  <>
                    <div>
                      <Image
                        className={styles.UploadedImage}
                        src={image}
                        rounded
                      />
                    </div>
                    <div>
                      <Form.Label
                        htmlFor="image-upload"
                        className={`${styles.Btn28} mt-3`}
                      >
                        Change image
                      </Form.Label>
                    </div>
                  </>
                ) : (
                  <>
                    <h3>Click on the icon below to upload an image</h3>
                    <Form.Label className="my-3" htmlFor="image-upload">
                      <i
                        className={`${styles.Icon} fa-solid fa-cloud-arrow-up`}
                      ></i>
                    </Form.Label>
                  </>
                )}

                <Form.Control
                  id="image-upload"
                  type="file"
                  name="image"
                  hidden
                  accept="image/*"
                  onChange={handleChangeImage}
                  ref={imageInput}
                />
              </Form.Group>
              {errors.image?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                  {message}
                </Alert>
              ))}

              <div className="my-2 p-3">
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="my-2">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={6}
                    name="content"
                    value={content}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.content?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Form.Group className="my-2">
                  <Form.Label>Tags</Form.Label>
                  <Form.Select onChange={handleTags} name="tags">
                    <option>Select a tag</option>
                    <option value="FO">Football</option>
                    <option value="IH">Ice Hockey</option>
                    <option value="GO">Golf</option>
                    <option value="TE">Tennis</option>
                    <option value="PA">Padel</option>
                    <option value="OT">Other</option>
                  </Form.Select>
                </Form.Group>
                {errors.tags?.map((message, idx) => (
                  <Alert variant="warning" key={idx}>
                    {message}
                  </Alert>
                ))}

                <Button
                  className={`${styles.Btn28} mt-3`}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                <Button className={`${styles.Btn28} mt-3`} type="submit">
                  Create
                </Button>
              </div>
            </Container>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreatePostPage;
