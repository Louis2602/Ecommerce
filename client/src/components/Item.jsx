import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	IconButton,
	Box,
	Typography,
	useTheme,
	Button,
	styled,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { shades } from '../theme';
import { addToCart } from '../store';
import { useNavigate } from 'react-router-dom';

const ItemContainer = styled(Box)({
	position: 'absolute',
	bottom: '10%',
	left: '0',
	width: '100%',
	padding: '0 5%',
});
const ItemBox = styled(Box)({
	display: 'flex',
	alignItems: 'center',
	borderRadius: '3px',
});
const Item = ({ item, width }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [count, setCount] = useState(1);
	const [isHovered, setIsHovered] = useState(false);
	const {
		palette: { neutral },
	} = useTheme();

	const { category, price, name, image } = item.attributes;
	const {
		data: {
			attributes: {
				formats: {
					medium: { url },
				},
			},
		},
	} = image;
	return (
		<Box width={width}>
			<Box
				position='relative'
				onMouseOver={() => setIsHovered(true)}
				onMouseOut={() => setIsHovered(false)}
			>
				<img
					alt={item.name}
					width='300px'
					height='400px'
					src={`http://localhost:1337${url}`}
					onClick={() => navigate(`item/${item.id}`)}
					style={{ cursor: 'pointer' }}
				/>
				<ItemContainer display={isHovered ? 'block' : 'none'}>
					<Box display='flex' justifyContent='space-between'>
						<ItemBox backgroundColor={shades.neutral[100]}>
							<IconButton
								onClick={() => setCount(Math.max(count - 1, 1))}
							>
								<Remove />
							</IconButton>
							<Typography color={shades.primary[300]}>
								{count}
							</Typography>
							<IconButton onClick={() => setCount(count + 1)}>
								<Add />
							</IconButton>
						</ItemBox>
						<Button
							onClick={() => {
								dispatch(
									addToCart({ item: { ...item, count } })
								);
							}}
							sx={{
								backgroundColor: shades.primary[300],
								color: 'white',
							}}
						>
							Add To Cart
						</Button>
					</Box>
				</ItemContainer>
			</Box>
			<Box mt='3px'>
				<Typography variant='subtitle2' color={neutral.dark}>
					{(category.replace(/([A-Z])/g), ' $1').replace(
						/^./,
						(str) => str.toUpperCase()
					)}
				</Typography>
				<Typography>{name}</Typography>
				<Typography fontWeight='bold'>${price}</Typography>
			</Box>
		</Box>
	);
};

export default Item;
