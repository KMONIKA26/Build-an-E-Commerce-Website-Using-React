import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {Box, Grid, Select, useToast} from "@chakra-ui/react";
import LodaingSpinner from "../Components/LodaingSpinner";
import ErrorMessage from "../Components/ErrorMessage";
import axios from "axios";


const HomePage = () => {const {authstate} = useContext(AuthContext);
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [sortOder, setSortOrder] = useState("asc");
const [filtercategory, setfilterCategory] = useState("");
const toast = useToast();
const navigate = useNavigate();


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "https://api.example.com/products"
                );
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };
    const handleFilterCategoryChange = (event) => {
        setfilterCategory(event.target.value);
    };
    const sortOderAndFilteredProducts = products.filter(product => filterCategory ? product.category === filtercategory : true).sort((a, b) => {
        if (sortOder === "asc") {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
    if (loading) {
        return <LodaingSpinner />;}
        if (error) {
            return <ErrorMessage message={error} />;}

            
        return (
            <Box p={4}>
                <Box mb= {4}>
                    <Select placeholder="Sort Order" value={sortOder} onChange={handleSortOrderChange}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </Select>
                </Box>
                <select value={filtercategory} onChange={handleFilterCategoryChange}>
                    <option value="">All</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                    <option value="Home Decore">Home Decore</option>
                </select>
                <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                    {sortOderAndFilteredProducts.map((product) => (
                        <Box
                            key={product.id}
                            p={4}
                            bg="white"
                            borderRadius="md"
                            boxShadow="md"
                            textAlign="center"
                        >
                            <img src={product.image} alt={product.name} />
                            <Box mt={2}>
                                <Link to={`/product/${product.id}`}>
                                    <Text fontWeight="bold">{product.name}</Text>
                                </Link>
                                <Text>${product.price}</Text>
                            </Box>
                        </Box>
                    ))}
                </Grid>
            </Box>
        );
    };

    export default HomePage;
