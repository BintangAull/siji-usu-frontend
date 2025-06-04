import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
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
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from '@mui/material';
import { AccountCircle, ExitToApp } from '@mui/icons-material';
import { getUserProfile } from '../services/userService';
import { logout } from '../services/authService';

const Dashboard = () => {
    const navigate = useNavigate();
    const [usersData, setUsersData] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setLoading(true);
            const data = await getUserProfile();

            // Jika data adalah array (list semua users)
            if (Array.isArray(data)) {
                setUsersData(data);
                // Asumsi user pertama adalah current user, atau bisa disesuaikan logic
                // Misalnya ambil dari localStorage atau token
                const currentUserEmail = localStorage.getItem('userEmail'); // Sesuaikan
                const current = data.find(user => user.email === currentUserEmail) || data[0];
                setCurrentUser(current);
            } else {
                // Jika data adalah single user object
                setCurrentUser(data);
                setUsersData([data]);
            }
        } catch (err) {
            setError('Gagal memuat data: ' + (err.message || 'Terjadi kesalahan'));
            if (err.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
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

    const getRoleColor = (role) => {
        switch (role) {
            case 'Admin':
                return 'error';
            case 'Lecturer':
                return 'primary';
            case 'Student':
                return 'success';
            default:
                return 'default';
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

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
                ) : (
                    <>
                        {/* Current User Profile */}
                        {currentUser && (
                            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                                <Typography variant="h5" sx={{ mb: 2 }}>
                                    Welcome Back!
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                                        {currentUser.name?.charAt(0) || 'U'}
                                    </Avatar>
                                    <Box>
                                        <Typography variant="h6">{currentUser.name}</Typography>
                                        <Typography color="textSecondary">{currentUser.email}</Typography>
                                        <Chip
                                            label={currentUser.role}
                                            color={getRoleColor(currentUser.role)}
                                            size="small"
                                            sx={{ mt: 1 }}
                                        />
                                    </Box>
                                </Box>
                            </Paper>
                        )}

                        {/* All Users Table */}
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h5" sx={{ mb: 3 }}>
                                All Users ({usersData.length})
                            </Typography>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Role</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {usersData.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell>{user.id}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Avatar sx={{ width: 32, height: 32, mr: 2 }}>
                                                            {user.name?.charAt(0) || 'U'}
                                                        </Avatar>
                                                        {user.name}
                                                    </Box>
                                                </TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={user.role}
                                                        color={getRoleColor(user.role)}
                                                        size="small"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Dashboard;