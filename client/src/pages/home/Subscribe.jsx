import React, { useState } from 'react';
import {
	Box,
	InputBase,
	Divider,
	Typography,
	IconButton,
	styled,
} from '@mui/material';
import { MarkEmailReadOutlined } from '@mui/icons-material';

const InputContainer = styled(Box)({
	padding: '2px 4px',
	margin: '15px auto',
	display: 'flex',
	alignItems: 'center',
	width: '75%',
	backgroundColor: '#f5f2f2',
});
const SubscribeButton = styled(Typography)({
	padding: '10px',
	'&:hover': {
		cursor: 'pointer',
	},
});
const Subscribe = () => {
	const [email, setEmail] = useState('');
	return (
		<Box width='80%' margin='80px auto' textAlign='center'>
			<IconButton>
				<MarkEmailReadOutlined fontSize='large' />
			</IconButton>
			<Typography variant='h3'>Subscribe to Our Newsletter</Typography>
			<Typography>
				and receive $20 coupon for your first order when you checkout
			</Typography>
			<InputContainer>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder='Enter email'
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
				<SubscribeButton>Subscribe</SubscribeButton>
			</InputContainer>
		</Box>
	);
};

export default Subscribe;
