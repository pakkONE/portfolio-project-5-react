import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import PostDetail from "./PostDetail";
import Spinner from "../../components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

const PostList = ({ message }) => {
  const [posts, setPosts] = useState({ results: [] });
  const [isLoaded, setIsLoaded] = useState(false);

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get("/posts/");
        setPosts(data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSearch = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?search=${query}`);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
      fetchSearch();
    };
    setIsLoaded(false);
    fetchPosts();
  }, [query]);

  return (
    <div>
      <Row className="h-100">
        <Col className="p-2">
          {isLoaded ? (
            <>
              {posts.results.length ? (
                <InfiniteScroll
                  children={posts.results.map((post) => (
                    <PostDetail
                      key={post.id}
                      {...post}
                      setQuery={setQuery}
                      setPosts={setPosts}
                    />
                  ))}
                  dataLength={posts.results.length}
                  loader={<Spinner />}
                  hasMore={!!posts.next}
                  next={() => fetchMoreData(posts, setPosts)}
                />
              ) : (
                <Container className="text-center">{NoResults}</Container>
              )}
            </>
          ) : (
            <Container className="align-center">
              <Spinner />
            </Container>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PostList;
