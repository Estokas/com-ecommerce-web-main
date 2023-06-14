import { Avatar, Card, CardContent, CardHeader, CardMedia, Chip, Grid, Rating, Stack, Typography } from "@mui/material";
import React from "react";
import ProductSwitch from "./ProductSwitch";
import { baseHost, baseURL } from "../../../api";

interface Props {
    product: any;
}

const ProductCard: React.FC<Props> = (props) => {
    const { product } = props;

    return (
        <Card variant="outlined">
            <CardHeader 
                sx={{ 
                    alignItems: 'center', 
                    display: 'flex',
                    flexDirection: 'row' 
                }}
                title={product.name} 
                action={
                    <ProductSwitch id={product._id} value={product.enable} />
                }
            />
            <CardMedia>
                <Avatar 
                    src={`${baseHost}/public/images/${product?.image?.filename}`}
                    sx={{ height: 170, width: '100%' }} 
                    variant="square"
                >
                    
                </Avatar>
            </CardMedia>
            <CardContent>
                <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
                    <div>
                        <Typography variant="body2" color="text.secondary">
                            {product.description}
                        </Typography>
                        <Rating size="small" value={2} readOnly />
                    </div>
                    <Chip label={`$${product.price}`} />
                </Stack>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
