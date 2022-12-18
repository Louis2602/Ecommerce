import React from 'react';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Close, Add, Remove } from '@mui/icons-material';
import { shades } from '../../theme';
import styled from '@emotion/styled';
import {
	decreaseCount,
	increaseCount,
	removeFromCart,
	setIsCartOpen,
} from '../../store';
import { useNavigate } from 'react-router-dom';

const FlexBox = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const MenuOverlay = styled(Box)`
	background-color: rgba(0, 0, 0, 0.4);
	position: fixed;
	z-index: 10;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	overflow: auto;
`;
const MenuModal = styled(Box)`
	position: fixed;
	right: 0;
	bottom: 0;
	width: max(400px, 30%);
	height: 100%;
	background-color: white;
`;
const CheckoutButton = styled(Button)`
	color: white;
	border-radius: 0;
	min-width: 100%;
	padding: 20px 40px;
	margin: 20px 0;
`;
const CartMenu = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart.cart);
	const isCartOpen = useSelector((state) => state.cart.isCartOpen);

	const totalPrice = cart.reduce((total, item) => {
		return total + item.count * item.attributes.price;
	}, 0);

	return (
		<MenuOverlay display={isCartOpen ? 'block' : 'none'}>
			<MenuModal>
				<Box padding='30px' overflow='auto' height='100%'>
					{/* Header */}
					<FlexBox mb='15px'>
						<Typography variant='h3'>
							SHOPPING BAG ({cart.length})
						</Typography>
						<IconButton onClick={() => dispatch(setIsCartOpen({}))}>
							<Close />
						</IconButton>
					</FlexBox>
					{/* Cart list */}
					<Box>
						{cart.map((item) => (
							<Box key={`${item.attributes.name}-${item.id}`}>
								<FlexBox p='15px 0'>
									<Box flex='1 1 40%'>
										<img
											alt={item?.name}
											width='123px'
											height='164px'
											src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
										/>
									</Box>
									<Box flex='1 1 60%'>
										<FlexBox mb='5px'>
											<Typography fontWeight='bold'>
												{item.attributes.name}
											</Typography>
											<IconButton
												onClick={() =>
													dispatch(
														removeFromCart({
															id: item.id,
														})
													)
												}
											>
												<Close />
											</IconButton>
										</FlexBox>
										<Typography>
											{item.attributes.shortDescription}
										</Typography>
										{/* Add / Remove item */}
										<FlexBox m='15px 0'>
											<Box
												display='flex'
												alignItems='center'
												border={`1.5px solid ${shades.neutral[500]}`}
											>
												<IconButton
													onClick={() =>
														dispatch(
															decreaseCount({
																id: item.id,
															})
														)
													}
												>
													<Remove />
												</IconButton>
												<Typography>
													{item.count}
												</Typography>
												<IconButton
													onClick={() =>
														dispatch(
															increaseCount({
																id: item.id,
															})
														)
													}
												>
													<Add />
												</IconButton>
											</Box>
											{/* Price */}
											<Typography fontWeight='bold'>
												${item.attributes.price}
											</Typography>
										</FlexBox>
									</Box>
								</FlexBox>
								<Divider />
							</Box>
						))}
					</Box>
					{/* Actions */}
					<Box m='20px 0'>
						<FlexBox m='20px 0'>
							<Typography fontWeight='bold'>SUBTOTAL</Typography>
							<Typography fontWeight='bold'>
								${totalPrice}
							</Typography>
						</FlexBox>
						<CheckoutButton
							sx={{
								backgroundColor: shades.primary[400],
							}}
							onClick={() => {
								navigate('/checkout');
								dispatch(setIsCartOpen({}));
							}}
						>
							CHECKOUT
						</CheckoutButton>
					</Box>
				</Box>
			</MenuModal>
		</MenuOverlay>
	);
};

export default CartMenu;
