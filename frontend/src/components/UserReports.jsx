import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { get_reports, toggle_resolved } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

export const UserReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(1);

  const fetchData = async () => {
    const data = await get_reports(nextPage);
    setReports([...reports, ...data.results]);
    setNextPage(data.next ? nextPage + 1 : null);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch {
      alert("There was an error fetching user reports.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreReports = () => {
    if (nextPage) {
      fetchData();
    }
  };

  return (
    <Flex w="100%" justifyContent="center">
      <VStack w="100%" alignItems="start">
        <Heading fontWeight="350">User Reports</Heading>
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Action</Th>
                <Th>Date & Time</Th>
                <Th>Reported User</Th>
                <Th>Reported By</Th>
                <Th>Reason</Th>
                <Th>Description</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <Tr>
                  <Td colSpan="5">Loading...</Td>
                </Tr>
              ) : reports.length > 0 ? (
                reports.map((r) => (
                  <Report
                    key={`report-${r.id}`}
                    id={r.id}
                    username={r.username}
                    reporter={r.reporter}
                    reason={r.reason}
                    description={r.description}
                    formattedDate={r.formatted_date}
                    resolved={r.resolved}
                  />
                ))
              ) : (
                <Tr>
                  <Td colSpan="5">No reports found.</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
        {nextPage && !loading && (
          <Button onClick={loadMoreReports} w="100%">
            Load More
          </Button>
        )}
      </VStack>
    </Flex>
  );
};

const Report = ({
  id,
  username,
  reporter,
  reason,
  description,
  formattedDate,
  resolved,
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
          <Button colorScheme="red" onClick={handleResolve}>
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
      <Td>{description}</Td>
    </Tr>
  );
};
