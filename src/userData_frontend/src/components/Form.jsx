import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  Heading,
  Image,
  Textarea
} from "@chakra-ui/react";

function Form() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = () => {
    // Make a call to your backend to add a new user.
    const newUser = {
      name,
      age: parseInt(age),
      address,
      image
    };
    // Send this newUser object to your backend
  };

  return (
    <Box p={5} borderWidth={1} borderRadius="lg" shadow="md" width="400px">
      <Heading as="h2" size="lg" mb={5}>
        Add New User
      </Heading>

      <VStack spacing={5} align="stretch">

        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Age</FormLabel>
          <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Address</FormLabel>
          <Textarea value={address} onChange={(e) => setAddress(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Image URL</FormLabel>
          <Input value={image} onChange={(e) => setImage(e.target.value)} />
          <FormHelperText>Enter a direct link to an image.</FormHelperText>
        </FormControl>

        <Box>
          {image && (
            <Image src={image} alt="Preview" boxSize="150px" objectFit="cover" mt={4} borderRadius="md" />
          )}
        </Box>

        <Button colorScheme="teal" onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Box>
  );
}
export default Form