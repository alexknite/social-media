import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { get_user_profile_data, toggle_follow } from "../../api/endpoints";
import { SERVER_URL } from "../../constants/constants";
import { TbMessageReport } from "react-icons/tb";
import { AdminPanel } from "../../components/Admin/AdminPanel";
export const UserDetails = ({
  username,
  isOurProfile,
  setIsOurProfile,
  handleNav,
  isAdmin,
}) => {
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [following, setIsFollowing] = useState(false);
  const [muted, setMuted] = useState(false);
  const [banned, setBanned] = useState(false);
  const [role, setRole] = useState("");

  const userIsAdmin = role === "ADMIN";

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

  const handleReport = () => {
    localStorage.setItem(
      "reportUser",
      JSON.stringify({
        username: username,
      }),
    );
    handleNav("report");
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
        setMuted(data.muted);
        setBanned(data.banned);
        setRole(data.role);
      } catch {
        console.error("There was an error fetching user profile data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  });

  return (
    <VStack w="100%" alignItems="start" gap="40px">
      {loading ? (
        <Spacer />
      ) : !isOurProfile && isAdmin && !userIsAdmin ? (
        <AdminPanel
          username={username}
          muted={muted}
          banned={banned}
          setMuted={setMuted}
          setBanned={setBanned}
          handleNav={handleNav}
        />
      ) : (
        <></>
      )}
      <HStack w="100%" justifyContent="space-between" alignItems="center">
        <Heading>@{username}</Heading>
        {loading ? (
          <Spacer />
        ) : isOurProfile ? (
          <></>
        ) : (
          <Button
            variant="ghost"
            colorScheme="red"
            size="sm"
            rightIcon={<TbMessageReport />}
            onClick={handleReport}
          >
            Report
          </Button>
        )}
      </HStack>
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
