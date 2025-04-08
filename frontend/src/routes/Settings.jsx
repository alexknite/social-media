import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { delete_user, update_user } from "../api/endpoints";
import { useAuth } from "../contexts/useAuth";

export const Settings = () => {
  const storage = JSON.parse(localStorage.getItem("userData"));
  const { auth_logout } = useAuth();

  const [username, setUsername] = useState(storage ? storage.username : "");
  const [email, setEmail] = useState(storage ? storage.email : "");
  const [profileImage, setProfileImage] = useState(
    storage ? storage.profile_image : "",
  );
  const [firstName, setFirstName] = useState(storage ? storage.first_name : "");
  const [lastName, setLastName] = useState(storage ? storage.last_name : "");
  const [bio, setBio] = useState(storage ? storage.bio : "");
  const [confirmDelete, setConfirmDelete] = useState("");

  const missingEmail = email === "";
  const missingConfirmDelete = confirmDelete !== username;

  const handleDelete = async () => {
    if (!missingConfirmDelete) {
      auth_logout();
      await delete_user(username);
    }
  };

  const handleUpdate = async () => {
    if (missingEmail) {
      alert("Please complete all required fields.");
    } else {
      const data = await update_user({
        username: username,
        email: email,
        profile_image: profileImage,
        first_name: firstName,
        last_name: lastName,
        bio: bio,
      });
      if (data.success) {
        localStorage.setItem(
          "userData",
          JSON.stringify({
            username: username,
            email: email,
            first_name: firstName,
            last_name: lastName,
            bio: bio,
          }),
        );
        alert(data.message);
      } else {
        const error = data.errors.email
          ? data.errors.email[0]
          : "There wasn an error updating user details.";
        alert(error);
      }
    }
  };

  return (
    <Flex w="100%" justifyContent="center" pt="50px">
      <VStack w="95%" maxW="500px" alignItems="start" gap="20px">
        <Heading>Settings</Heading>
        <VStack w="100%" alignItems="start" gap="10px">
          <FormControl>
            <FormLabel>Profile Picture</FormLabel>
            <input
              onChange={(e) => setProfileImage(e.target.files[0])}
              bg="white"
              type="file"
            />
          </FormControl>
          <FormControl>
            <VStack w="100%" gap="5px" alignItems="start">
              <FormLabel>Username</FormLabel>
              <Input
                isDisabled
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                bg="white"
                type="text"
              />
            </VStack>
          </FormControl>
          <FormControl isInvalid={missingEmail}>
            <VStack w="100%" gap="5px" alignItems="start">
              {missingEmail ? (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              ) : (
                <FormLabel>Email</FormLabel>
              )}
              <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                bg="white"
                type="text"
              />
            </VStack>
          </FormControl>
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              bg="white"
              type="text"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              bg="white"
              type="text"
            />
          </FormControl>
          <FormControl>
            <VStack w="100%" gap="5px" alignItems="start">
              <FormLabel>Bio</FormLabel>
              <Textarea
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                bg="white"
                type="text"
              />
            </VStack>
          </FormControl>
          <Button onClick={handleUpdate} w="100%" colorScheme="blue" mt="10px">
            Save Changes
          </Button>
        </VStack>
        <VStack w="100%" alignItems="start" gap="15px">
          <FormControl isInvalid={missingConfirmDelete}>
            <VStack alignItems="start">
              <FormHelperText>
                Confirm your account username, {username}, to delete your
                account
              </FormHelperText>
              <Input
                onChange={(e) => setConfirmDelete(e.target.value)}
                value={confirmDelete}
                bg="white"
                type="text"
              />
            </VStack>
          </FormControl>
          <Button onClick={handleDelete} colorScheme="red">
            Delete Account
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
};
