import { Button, ButtonGroup, Td, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { delete_report, toggle_resolved } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";

export const Report = ({
  id,
  username,
  reporter,
  reason,
  description,
  formattedDate,
  resolved,
  setAllReports,
}) => {
  const [clientResolved, setClientResolved] = useState(resolved);

  const nav = useNavigate();
  const handleNav = (route) => {
    nav(`/${route}`);
  };

  const handleResolve = async () => {
    const data = await toggle_resolved(id);
    if (data.success) {
      setClientResolved(data.resolved);
      setAllReports((prevReports) => {
        const report = prevReports.find((r) => r.id === id);
        report.resolved = data.resolved;

        return [...prevReports];
      });
    } else {
      alert(data.error);
    }
  };

  const handleDelete = async () => {
    const data = await delete_report(id);
    if (data.success) {
      setAllReports((prevReports) => [
        ...prevReports.filter((r) => r.id !== id),
      ]);
    } else {
      alert(data.error);
    }
  };

  return (
    <Tr
      opacity={clientResolved ? 0.6 : 1}
      bg={clientResolved ? "gray.200" : "transparent"}
      textDecoration={clientResolved ? "line-through" : "none"}
    >
      <Td>
        <ButtonGroup colorScheme="green" size="xs">
          <Button onClick={handleResolve}>
            {clientResolved ? "Unresolve" : "Resolve"}
          </Button>
          <Button colorScheme="red" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
      </Td>
      <Td>{formattedDate}</Td>
      <Td onClick={() => handleNav(username)} cursor="pointer">
        {username}
      </Td>
      <Td onClick={() => handleNav(reporter)} cursor="pointer">
        {reporter}
      </Td>
      <Td>{reason}</Td>
      <Td sx={{ whiteSpace: "normal", wordWrap: "break-word" }}>
        {description}
      </Td>
    </Tr>
  );
};
