import {
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Select,
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
import { get_reports } from "../../api/endpoints";
import { Report } from "./Report";

export const UserReports = () => {
  const [allReports, setAllReports] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [reportedByUsers, setReportedByUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedReporter, setSelectedReporter] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    const fetchAllReports = async () => {
      const data = await get_reports();
      if (data.success) {
        let reported = new Set();
        let reportedBy = new Set();

        data.reports.forEach((r) => {
          reported.add(r.username);
          reportedBy.add(r.reporter);
        });

        setReportedUsers([...reported]);
        setReportedByUsers([...reportedBy]);
        setAllReports(data.reports);
        setReports(data.reports);
      } else {
        alert(data.error);
      }
    };

    try {
      fetchAllReports();
    } catch {
      alert("There was an error fetching user reports.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let filteredReports = allReports;

    if (selectedStatus == "resolved") {
      filteredReports = filteredReports.filter((r) => r.resolved);
    } else if (selectedStatus == "unresolved") {
      filteredReports = filteredReports.filter((r) => !r.resolved);
    }

    if (selectedUser) {
      filteredReports = filteredReports.filter(
        (r) => r.username === selectedUser,
      );
    }

    if (selectedReporter) {
      filteredReports = filteredReports.filter(
        (r) => r.reporter === selectedReporter,
      );
    }

    setReports(filteredReports);
  }, [selectedStatus, selectedUser, selectedReporter, allReports]);

  const handleClearFilters = () => {
    setSelectedStatus("");
    setSelectedUser("");
    setSelectedReporter("");
  };
  return (
    <Flex w="100%" justifyContent="center">
      <VStack w="100%" alignItems="start">
        <Heading fontWeight="350">User Reports</Heading>
        <HStack w="100%" gap="10px">
          <Select
            w="25%"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            placeholder="Select a status"
          >
            <option value="resolved">Resolved</option>
            <option value="unresolved">Unresolved</option>
          </Select>
          <Select
            w="25%"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            placeholder="Select a reported user"
          >
            {reportedUsers ? (
              reportedUsers.map((u) => (
                <option key={`option-${u}`} value={u}>
                  {u}
                </option>
              ))
            ) : (
              <></>
            )}
          </Select>
          <Select
            w="25%"
            placeholder="Select a reported by user"
            onChange={(e) => setSelectedReporter(e.target.value)}
            value={selectedReporter}
          >
            {reportedByUsers ? (
              reportedByUsers.map((u) => (
                <option key={`option-${u}`} value={u}>
                  {u}
                </option>
              ))
            ) : (
              <></>
            )}
          </Select>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </HStack>
        <TableContainer w="100%">
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
                  <Td colSpan="6">Loading...</Td>
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
                    setAllReports={setAllReports}
                  />
                ))
              ) : (
                <Tr>
                  <Td colSpan="6">No reports found.</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </VStack>
    </Flex>
  );
};
