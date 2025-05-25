import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Paper,
    Typography,
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
} from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { getUserProfile } from '../services/userService';
import { logout } from '../services/authService';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const data = await getUserProfile();
            setUserData(data);
        } catch (err) {
            setError('Gagal memuat data: ' + (err.message || 'Terjadi kesalahan'));
            if (err.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Dashboard SIJI USU
                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleLogout}>
                                <ExitToApp sx={{ mr: 1 }} />
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                {error ? (
                    <Paper elevation={3} sx={{ p: 2, bgcolor: 'error.light' }}>
                        <Typography color="error">{error}</Typography>
                    </Paper>
                ) : userData ? (
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                                {userData.name?.charAt(0) || 'U'}
                            </Avatar>
                            <Box>
                                <Typography variant="h5">{userData.name}</Typography>
                                <Typography color="textSecondary">{userData.email}</Typography>
                                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                                    Role: {userData.role}
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <Typography>Loading...</Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Dashboard;