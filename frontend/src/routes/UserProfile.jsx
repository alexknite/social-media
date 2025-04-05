import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  delete_user,
  get_user_profile_data,
  get_users_posts,
  toggle_follow,
  toggle_muted,
} from "../api/endpoints";
import { SERVER_URL } from "../constants/constants";
import { Post } from "../components/Post";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const get_username_from_url = () => {
    const url_split = window.location.pathname.split("/");
    return url_split[url_split.length - 1];
  };

  const [username, setUsername] = useState(get_username_from_url());
  const [isOurProfile, setIsOurProfile] = useState(false);
  const nav = useNavigate();

  const handleNav = (route) => {
    nav(`/${route}`);
  };

  useEffect(() => {
    setUsername(get_username_from_url());
  }, []);

  return (
    <Flex w="100%" justifyContent="center">
      <VStack w="75%">
        <Box w="100%" mt="40px">
          <UserDetails
            username={username}
            isOurProfile={isOurProfile}
            setIsOurProfile={setIsOurProfile}
            handleNav={handleNav}
          />
        </Box>
        <Box w="100%" mt="30px">
          <UserPosts username={username} isOurProfile={isOurProfile} />
        </Box>
      </VStack>
    </Flex>
  );
};

const UserDetails = ({
  username,
  isOurProfile,
  setIsOurProfile,
  handleNav,
}) => {
  const storage = JSON.parse(localStorage.getItem("userData"));
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [following, setIsFollowing] = useState(false);
  const [role, setRole] = useState(false);
  const [muted, setMuted] = useState(false);

  const handleToggleFollow = async () => {
    const data = await toggle_follow(username);
    if (data.now_following) {
      setFollowerCount(followerCount + 1);
      setIsFollowing(true);
    } else {
      setFollowerCount(followerCount - 1);
      setIsFollowing(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await get_user_profile_data(username);
        setBio(data.bio);
        setProfileImage(data.profile_image);
        setFollowerCount(data.follower_count);
        setFollowingCount(data.following_count);
        setIsOurProfile(data.is_our_profile);
        setIsFollowing(data.following);
        setRole(storage.role);
        setMuted(data.muted);
      } catch {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  });

  return (
    <VStack w="100%" alignItems="start" gap="40px">
      {!isOurProfile && role === "ADMIN" ? (
        <AdminPanel
          username={username}
          muted={muted}
          setMuted={setMuted}
          handleNav={handleNav}
        />
      ) : (
        <></>
      )}
      <Heading>@{username}</Heading>
      <HStack gap="20px">
        <Box
          boxSize="150px"
          border="2px solid"
          borderColor="gray.700"
          borderRadius="full"
          bg="white"
          overflow="hidden"
        >
          {profileImage ? (
            <Image
              src={loading ? null : `${SERVER_URL}${profileImage}/`}
              boxSize="100%"
              objectFit="cover"
            />
          ) : (
            <></>
          )}
        </Box>
        <VStack gap="20px">
          <HStack gap="20px" fontSize="18px">
            <VStack>
              <Text>Followers</Text>
              <Text>{loading ? "-" : followerCount}</Text>
            </VStack>
            <VStack>
              <Text>Following</Text>
              <Text>{loading ? "-" : followingCount}</Text>
            </VStack>
          </HStack>
          {loading ? (
            <Spacer />
          ) : isOurProfile ? (
            <Button onClick={() => handleNav("settings")} w="100%">
              Edit Profile
            </Button>
          ) : (
            <Button onClick={handleToggleFollow} colorScheme="blue" w="100%">
              {following ? "Unfollow" : "Follow"}
            </Button>
          )}
        </VStack>
      </HStack>
      <Text fontSize="18px">{loading ? "-" : bio}</Text>
    </VStack>
  );
};

const UserPosts = ({ username, isOurProfile }) => {
  const [posts, setPosts] = useState([
    {
      all: [],
      // archived: [],
      unarchived: [],
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const all = await get_users_posts(username, "all");
        // const archived = await get_users_posts(username, "archived");
        const unarchived = await get_users_posts(username, "unarchived");

        setPosts({
          all: all,
          // archived: archived,
          unarchived: unarchived,
        });
      } catch {
        alert("Error fetching users posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [username]);

  const handleToggleShowArchived = (e) => {
    const archived = e.target.checked;
    // console.log(posts);
    setShowArchived(archived);
  };

  return (
    <Flex w="100%" wrap="wrap" gap="30px" pb="50px">
      {loading ? (
        <Text>Loading...</Text>
      ) : isOurProfile ? (
        <VStack w="100%" alignItems="start" gap="30px">
          <Checkbox
            isChecked={showArchived}
            onChange={handleToggleShowArchived}
          >
            Show Archived
          </Checkbox>
          {showArchived
            ? posts.all.map((p) => (
                <Post
                  key={`post-${p.id}`}
                  id={p.id}
                  username={p.username}
                  description={p.description}
                  formatted_date={p.formatted_date}
                  liked={p.liked}
                  like_count={p.like_count}
                  archived={p.archived}
                  setPosts={setPosts}
                />
              ))
            : posts.unarchived.map((p) => (
                <Post
                  key={`post-${p.id}`}
                  id={p.id}
                  username={p.username}
                  description={p.description}
                  formatted_date={p.formatted_date}
                  liked={p.liked}
                  like_count={p.like_count}
                  archived={p.archived}
                  setPosts={setPosts}
                />
              ))}
        </VStack>
      ) : (
        posts.unarchived.map((p) => (
          <Post
            key={`post-${p.id}`}
            id={p.id}
            username={p.username}
            description={p.description}
            formatted_date={p.formatted_date}
            liked={p.liked}
            like_count={p.like_count}
            setPosts={setPosts}
          />
        ))
      )}
    </Flex>
  );
};

const AdminPanel = ({ username, muted, setMuted, handleNav }) => {
  const handleDelete = async () => {
    const data = await delete_user(username);

    if (data.success) {
      handleNav("");
    } else {
      alert(data.error);
    }
  };

  const handleToggleMute = async () => {
    const data = await toggle_muted(username);
    if (data.success) {
      setMuted(!muted);
    } else {
      alert(data.error);
    }
  };
  return (
    <Flex
      bg="gray.100"
      borderRadius="10px"
      w="100%"
      h="130px"
      justifyContent="center"
      alignItems="center"
    >
      <VStack w="100%" alignItems="start" p="20px">
        <Heading fontWeight="200" fontSize="20px">
          Admin Panel
        </Heading>
        <ButtonGroup colorScheme="green" spacing="20px" mt="10px">
          <Button onClick={handleToggleMute}>
            {muted ? "Unmute" : "Mute"} User
          </Button>
          <Button onClick={handleDelete} colorScheme="red">
            Delete User
          </Button>
        </ButtonGroup>
      </VStack>
    </Flex>
  );
};
