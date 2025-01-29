import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  useToast,
  Card,
  CardBody,
  Heading,
  Text,
  Badge,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Alert,
  AlertIcon,
  Progress,
} from '@chakra-ui/react';

const MedicineDelivery = () => {
  const [delivery, setDelivery] = useState({
    medicine_name: '',
    quantity: 1,
    delivery_address: '',
    priority: 'normal',
    prescription: '',
  });
  const [orderStatus, setOrderStatus] = useState(null);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/medicine/delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(delivery),
      });

      const data = await response.json();
      setOrderStatus(data);

      toast({
        title: 'Order Placed',
        description: 'Your medicine delivery request has been submitted.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={4}>
      <VStack spacing={6} align="stretch">
        <Card>
          <CardBody>
            <Heading size="md" mb={4}>Medicine Delivery Request</Heading>
            <FormControl>
              <FormLabel>Medicine Name</FormLabel>
              <Input
                value={delivery.medicine_name}
                onChange={(e) => setDelivery({ ...delivery, medicine_name: e.target.value })}
                placeholder="Enter medicine name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Quantity</FormLabel>
              <NumberInput
                value={delivery.quantity}
                onChange={(value) => setDelivery({ ...delivery, quantity: parseInt(value) })}
                min={1}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Delivery Address</FormLabel>
              <Textarea
                value={delivery.delivery_address}
                onChange={(e) => setDelivery({ ...delivery, delivery_address: e.target.value })}
                placeholder="Enter your complete delivery address"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Priority</FormLabel>
              <Select
                value={delivery.priority}
                onChange={(e) => setDelivery({ ...delivery, priority: e.target.value })}
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="emergency">Emergency</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Prescription (if required)</FormLabel>
              <Input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  // Handle file upload in a production environment
                  setDelivery({ ...delivery, prescription: e.target.files[0]?.name || '' });
                }}
              />
              <Text fontSize="sm" color="gray.500" mt={1}>
                Upload prescription image or PDF
              </Text>
            </FormControl>

            <Button mt={4} colorScheme="blue" onClick={handleSubmit}>
              Place Order
            </Button>
          </CardBody>
        </Card>

        {orderStatus && (
          <Card>
            <CardBody>
              <Heading size="md" mb={4}>Order Status</Heading>
              <Box p={4} borderWidth={1} borderRadius="md">
                <Text>
                  Order ID: <Badge colorScheme="blue">{orderStatus.order_id}</Badge>
                </Text>
                <Text mt={2}>
                  Status: <Badge colorScheme="green">{orderStatus.status}</Badge>
                </Text>
                <Text mt={2}>Estimated Delivery: {orderStatus.estimated_delivery}</Text>
                
                <Box mt={4}>
                  <Text mb={2}>Delivery Progress:</Text>
                  <Progress value={20} colorScheme="blue" hasStripe />
                </Box>

                <Alert status="info" mt={4}>
                  <AlertIcon />
                  Track your order at: {orderStatus.tracking_url}
                </Alert>
              </Box>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Box>
  );
};

export default MedicineDelivery;
