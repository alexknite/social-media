import { Checkbox, Flex, Spacer, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { get_users_posts } from "../../api/endpoints";
import { Post } from "../../components/Post";

export const UserPosts = ({ username, isOurProfile, isAdmin }) => {
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
        <Spacer />
      ) : isAdmin || isOurProfile ? (
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
