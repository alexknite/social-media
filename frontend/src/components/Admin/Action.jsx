import { Td, Tr } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Action = ({
  id,
  timestamp,
  admin,
  action,
  user,
  post,
  details,
  onOpen,
  setDetails,
  setId,
}) => {
  const nav = useNavigate();
  const handleNav = (route) => {
    nav(`/${route}`);
  };

  const handleOpenModal = () => {
    setDetails(details);
    setId(id);
    onOpen();
  };

  return (
    <Tr>
      <Td>{timestamp}</Td>
      <Td onClick={() => handleNav(admin)} cursor="pointer">
        {admin}
      </Td>
      <Td>{action}</Td>
      <Td onClick={() => handleNav(user)} cursor="pointer">
        {user}
      </Td>
      <Td>{post}</Td>
      <Td
        sx={{ whiteSpace: "normal", wordWrap: "break-word" }}
        onClick={handleOpenModal}
        cursor="pointer"
      >
        {details}
      </Td>
    </Tr>
  );
};

export default Action;
