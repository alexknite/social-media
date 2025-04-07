import { Button, ButtonGroup, Flex, Heading, VStack } from "@chakra-ui/react";
import { delete_user, toggle_banned, toggle_muted } from "../../api/endpoints";
export const AdminPanel = ({
  username,
  muted,
  banned,
  setMuted,
  setBanned,
  handleNav,
}) => {
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

  const handleToggleBan = async () => {
    const data = await toggle_banned(username);
    if (data.success) {
      setBanned(!banned);
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
        <ButtonGroup spacing="20px" mt="10px">
          <Button colorScheme="green" onClick={handleToggleMute}>
            {muted ? "Unmute" : "Mute"} User
          </Button>
          <Button colorScheme="orange" onClick={handleToggleBan}>
            {banned ? "Unban" : "Ban"} User
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete User
          </Button>
        </ButtonGroup>
      </VStack>
    </Flex>
  );
};
