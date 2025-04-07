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
  const adminUsername = admin ? admin : "Deleted Admin";
  const targetUsername = user ? user : "Deleted User";

  const nav = useNavigate();
  const handleNav = (route) => {
    if (route) {
      nav(`/${route}`);
    }
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
        {adminUsername}
      </Td>
      <Td>{action}</Td>
      <Td onClick={() => handleNav(user)} cursor="pointer">
        {targetUsername}
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
