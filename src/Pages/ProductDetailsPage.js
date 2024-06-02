import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import LoadingSpring from "../Components/LoadingSpring";
import ErrorMessage from "../Components/ErrorMessage";

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const toast = useToast();
    const [showAlert, setShowAlert] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const cancelRef = React.useRef();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://api.example.com/products/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        setIsDialogOpen(true);
    };
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleConfirm = () => {
        toast({
            title: "Product added to cart",
            status: "success",
            duration: 2000,
            isClosable: true,
        });
        setIsDialogOpen(false);
    };

    if (loading) {
        return <LoadingSpring />;
    }

    if (error) {
        return <ErrorMessage message={error.message} />;
    }

    return (
        <box p={4}>
            {product &&(<box borderWidth="1px" borderRadius="lg" overflow="hidden">
                <box>{product.category}</box>
                <box>{product.name}</box>
                <box>{product.price}</box>
                <Button onClick={handleAddToCart}>Add to cart</Button>
                <AlertDialog
                    isOpen={isDialogOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={handleCloseDialog}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Add to cart
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                Are you sure? You can't undo this action afterwards.
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={handleCloseDialog}>
                                    Cancel
                                </Button>
                                <Button colorScheme="red" onClick={handleConfirm} ml={3}>
                                    Add
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </box>)}
       

        </box>  
    );
};
export default ProductDetailsPage;