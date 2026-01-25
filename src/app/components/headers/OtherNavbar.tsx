import { Box, Button, Container, ListItemIcon, Menu, MenuItem, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";
import { CartItem } from "../../../lib/types/search";
// import Basket from "./Basket";

interface OtherNavbarProps {
    cartItems: CartItem[];
    onAdd: (item: CartItem) => void;
    onDelete: (item: CartItem) => void;
    onDeleteAll: () => void;
    onRemove: (item: CartItem) => void;
    setLoginOpen: (isOpen: boolean) => void;
    setSignUpOpen: (isOpen: boolean) => void;
    handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
    anchorEl: HTMLElement | null;
    handleCloseLogout: () => void;
    handleLogoutRequest: () => void;

}

export function OtherNavbar(props: OtherNavbarProps) {
    const { cartItems, onAdd, onDelete,
        handleCloseLogout, handleLogoutClick, anchorEl, handleLogoutRequest,

        onDeleteAll, onRemove, setLoginOpen } = props;

    const { authMember } = useGlobals();
    return (
        <div className="other-navbar">
            <Container className="navbar-container">
                <Stack className="menu">
                    <Box>
                        <NavLink to="/">
                            <p className="brand-name">Auro</p>
                        </NavLink>
                    </Box>
                    <Stack
                        className="links"
                    >
                        <Box className={"hover-line"}>
                            <NavLink to="/" activeClassName={"underline"}>Home</NavLink>
                        </Box>
                        <Box className={"hover-line"}>
                            <NavLink to="/perfumes" activeClassName={"underline"}>Perfumes</NavLink>
                        </Box>
                        {authMember ? (
                            <Box className={"hover-line"}>
                                <NavLink to="/orders" activeClassName={"underline"}>Orders</NavLink>
                            </Box>
                        ) : null}
                        {authMember ? (
                            <Box className={"hover-line"}>
                                <NavLink to="/member-page" activeClassName={"underline"}>My Page</NavLink>
                            </Box>
                        ) : null}

                        <Box className={"hover-line"}>
                            <NavLink to="/reviews" activeClassName={"underline"}>Reviews</NavLink>
                        </Box>

                        <Basket cartItems={cartItems}
                            onAdd={onAdd}
                            onDelete={onDelete}
                            onDeleteAll={onDeleteAll}
                            onRemove={onRemove} />

                        {!authMember ? (<Box><Button variant="contained" 
                        onClick={() => setLoginOpen(true)}
                        className="login-button">Login</Button></Box>) : (
                            <img className="user-avatar"
                                src={authMember?.memberImage ? `${serverApi}/${authMember?.memberImage}` :
                                    "/img/black-chair.png"}
                                aria-haspopup={"true"}
                                onClick={handleLogoutClick}
                            />
                        )}

                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={Boolean(anchorEl)}
                            onClick={handleCloseLogout}
                            onClose={handleCloseLogout}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    '&:before': {
                                        content: '""',
                                        display: 'block',
                                        position: 'absolute',
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: 'background.paper',
                                        transform: 'translateY(-50%) rotate(45deg)',
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}                        >
                            <MenuItem
                                onClick={handleLogoutRequest}

                            >
                                <ListItemIcon>
                                    <Logout fontSize="small" style={{ color: 'blue' }} />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>

                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
