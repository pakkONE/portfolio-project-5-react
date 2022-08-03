import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import { useCurrentUser } from "../../contexts/UserContext";
import Spinner from "../../components/Spinner";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useCurrentProfile,
  useSetCurrentProfile,
} from "../../contexts/ProfileContext";
import InfiniteScroll from "react-infinite-scroll-component";
import NoResults from "../../assets/no-results.png";
import { fetchMoreData } from "../../utils/utils";
import PostDetail from "../posts/PostDetail";
import { ProfileEditDropdown } from "../../components/EditDropdown";

function ProfilePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setCurrentProfile = useSetCurrentProfile();
  const { currentProfile } = useCurrentProfile();
  const [profile] = currentProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: currentProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setCurrentProfile((prevState) => ({
          ...prevState,
          currentProfile: { results: [currentProfile] },
        }));
        setProfilePosts(profilePosts);
        setIsLoaded(true);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchData();
  }, [id, setCurrentProfile]);

  const ProfileInfo = (
    <>
      <Row className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
        <Col lg={6}>
          <h2 className="m-4">{profile?.owner}</h2>
          <p>Member of SportsTalk</p>
          <br />
        </Col>
        <Col lg={3}>
          {profile?.content && (
            <>
              <h4 className="m-3">Display name:</h4>
              <h5> {profile?.name}</h5>
              <h5 className="mt-5">About me</h5>
              <p>{profile?.content}</p>
            </>
          )}
        </Col>
      </Row>
    </>
  );

  const MainProfilePosts = (
    <>
      <hr />
      <h4 className="text-center">Posts by {profile?.owner}:</h4>
      <hr />
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <PostDetail key={post.id} {...post} setPosts={setProfilePosts} />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <div className="m-4 text-center">
          <Image src={NoResults} />
          <p className="mt-3">The user has not made any posts yet.</p>
        </div>
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2">
        <Container className={appStyles.Content}>
          {isLoaded ? (
            <>
              {ProfileInfo}
              {MainProfilePosts}
            </>
          ) : (
            <Spinner />
          )}
        </Container>
      </Col>
    </Row>
  );
}

export default ProfilePage;
