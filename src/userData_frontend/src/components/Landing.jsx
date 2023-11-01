import React,{ useEffect, useState } from 'react';
import Card from './Card.jsx';
import { userData_backend } from '../../../declarations/userData_backend';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Heading,
  VStack,
  Spacer,
  Image,
  FormControl,
  FormLabel,
  Container,
  Text,
  Grid
} from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';


export default function LandingPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    image: ''
  });

  useEffect(()=>{
    async function fetchData(){
        let response = await userData_backend.getUser();
        setUsers(response);
    }
    fetchData()
  },[])



  const handleAddUser =  async() => {
    await userData_backend.addUser(formData);
    let response = await userData_backend.getUser();
    setUsers(response);
    // setUsers([...users, { ...formData, id: users.length }]);
    setFormData({ name: '', age: '', address: '', image: '' });
  };

  const handleDeleteUser = async(id) => {
   await userData_backend.deleteUser(id);
    let response = await userData_backend.getUser();
    setUsers(response);
  };


  const handleUpdateUser = async (updatedUser) => {
    await userData_backend.updateUserById(updatedUser.id,updatedUser);
    let response = await userData_backend.getUser()
    setUsers(response);
    // setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
  };
//   const handleDeleteUser = (id) => {
//     setUsers(users.filter(u => u.id !== id));
//   };

  return (
    <Container maxW="container.xl">
      <VStack spacing={5} align="stretch">
        <Flex mt={10} mb={5}>
          <Heading flex={1} size="xl">User Management</Heading>
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search by name"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </InputGroup>
        </Flex>

        <Box borderWidth={1} borderRadius="lg" p={5} shadow="lg">
          <Text fontSize="2xl" mb={3}>Add New User</Text>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </FormControl>
            <FormControl>

              <FormLabel>Age</FormLabel>

              <Input type="Number" value={formData.age} onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })} />
            </FormControl>


            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
            </FormControl>
            <FormControl>
              <FormLabel>Image URL</FormLabel>
              <Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} />
            </FormControl>
            <Button colorScheme="teal" onClick={handleAddUser}>Add User</Button>
          </VStack>
        </Box>

        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {users.filter(u => u.name.toLowerCase().includes(search.toLowerCase())).map(user => (
            <Card key={user.id} user={user} onUpdate={handleUpdateUser} onDelete={handleDeleteUser} />
          ))}
        </Grid>
      </VStack>
    </Container>
  );
}
