import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { get_posts } from "../api/endpoints";
import { Post } from "../components/Post";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(1);

  const fetchData = async () => {
    const data = await get_posts(nextPage);
    setPosts([...posts, ...data.results]);
    setNextPage(data.next ? nextPage + 1 : null);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch {
      alert("Error fetching posts!");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMorePosts = () => {
    if (nextPage) {
      fetchData();
    }
  };

  return (
    <Flex w="100%" justifyContent="center" pt="50px">
      <VStack alignItems="start" gap="20px" pb="60px">
        <Heading>Posts</Heading>
        {loading ? (
          <Text>Loading...</Text>
        ) : posts ? (
          posts.map((p) => (
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
        ) : (
          <></>
        )}
        {nextPage && !loading && (
          <Button onClick={loadMorePosts} w="100%">
            Load More
          </Button>
        )}
      </VStack>
    </Flex>
  );
};
