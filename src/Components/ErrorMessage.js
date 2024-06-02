import React from 'react'
import { Box, Text } from '@chakra-ui/react';

const ErrorMessage = ({message}) => (
    <Box textAlign="center" py={10} px={6}>
        <Text display="inline" color="red.500" fontSize="sm" as="samp">
            {message}
        </Text>
    </Box>
);

export default ErrorMessage;