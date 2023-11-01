import React,{ useState } from 'react';
import {
  Box,
  Button,
  Image,
  Text,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  AlertDialog,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  FormControl,
  FormLabel
} from "@chakra-ui/react";


export default function Card({ user, onDelete, onUpdate }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleUpdate = () => {
    onUpdate(updatedUser);
    setEditModalOpen(false);
  };
console.log(user)

  return (
    <Box p={5} borderWidth={1} borderRadius="lg" shadow="lg" maxWidth="400px">
      <VStack spacing={3} align="stretch">
        <Image src={user.image} alt="User Image" boxSize="200px" objectFit="cover" borderRadius="md" />
        <Text fontSize="xl" fontWeight="bold">{user.name}</Text>
        <Text>Age: {user.age.toString()}</Text>
        <Text>Address: {user.address}</Text>
        <HStack mt={4} spacing={4}>
          <Button colorScheme="teal" onClick={() => setEditModalOpen(true)}>Edit</Button>
          <Button colorScheme="red" onClick={() => setDeleteAlertOpen(true)}>Delete</Button>
        </HStack>
      </VStack>

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mt={2}>
              <FormLabel>Name</FormLabel>
              <Input value={updatedUser.name} onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })} />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Age</FormLabel>
              <Input type="number" value={updatedUser.age.toString()} onChange={(e) => setUpdatedUser({ ...updatedUser, age: BigInt(e.target.value) })} />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Address</FormLabel>
              <Textarea value={updatedUser.address} onChange={(e) => setUpdatedUser({ ...updatedUser, address: e.target.value })} />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Image URL</FormLabel>
              <Input value={updatedUser.image} onChange={(e) => setUpdatedUser({ ...updatedUser, image: e.target.value })} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>Update</Button>
            <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation */}
      <AlertDialog isOpen={isDeleteAlertOpen} onClose={() => setDeleteAlertOpen(false)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">Delete User</AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this user? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="red" onClick={() => { onDelete(user.id); setDeleteAlertOpen(false) }}>Delete</Button>
              <Button onClick={() => setDeleteAlertOpen(false)} ml={3}>Cancel</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
