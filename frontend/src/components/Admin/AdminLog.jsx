import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { get_admin_logs, update_log_details } from "../../api/endpoints";
import Action from "./Action";

const AdminLog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [details, setDetails] = useState("");
  const [id, setId] = useState(0);

  const fetchData = async () => {
    const data = await get_admin_logs(nextPage);
    setActions([...actions, ...data.results]);
    setNextPage(data.next ? nextPage + 1 : null);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch {
      alert("There was an error fetching admin logs.");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMoreActions = () => {
    if (nextPage) {
      fetchData();
    }
  };

  const handleSave = async () => {
    const data = await update_log_details(id, details);

    if (data.success) {
      setActions((prevActions) => {
        const action = prevActions.find((a) => a.id === id);
        action.details = details;
        return [...prevActions];
      });
      onClose();
    } else {
      alert(data.error);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              onChange={(e) => setDetails(e.target.value)}
              value={details}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr="3" onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex w="100%" justifyContent="center">
        <VStack w="100%" alignItems="start">
          <Heading fontWeight="350">Admin Action Log</Heading>
          <TableContainer w='100%'>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Timestamp</Th>
                  <Th>Admin</Th>
                  <Th>Action</Th>
                  <Th>User</Th>
                  <Th>Post ID</Th>
                  <Th>Details</Th>
                </Tr>
              </Thead>
              <Tbody>
                {loading ? (
                  <Tr>
                    <Td colSpan="6">Loading...</Td>
                  </Tr>
                ) : actions.length > 0 ? (
                  actions.map((a) => (
                    <Action
                      key={`action-${a.id}`}
                      id={a.id}
                      timestamp={a.formatted_date}
                      admin={a.admin_username}
                      action={a.action}
                      user={a.target_username}
                      post={a.target_post}
                      details={a.details}
                      onOpen={onOpen}
                      setDetails={setDetails}
                      setId={setId}
                    />
                  ))
                ) : (
                  <Tr>
                    <Td colSpan="6">No actions found.</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
          {nextPage && !loading && (
            <Button w="100%" onClick={loadMoreActions}>
              Load More
            </Button>
          )}
        </VStack>
      </Flex>
    </>
  );
};

export default AdminLog;
