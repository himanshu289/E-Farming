import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import SearchBox from '../UI/SearchBox';
import { logout } from '../../features/user/userSlice';
import classes from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className={classes.navbar}>
      <Navbar
        className={classes.navbar}
        variant='dark'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>E-Farming</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          {(userInfo?.role === 'customer' || !userInfo) && (
            <Navbar.Collapse id='basic-navbar-nav'>
              <SearchBox />
              <Nav className='mr-auto'>
                <LinkContainer to='/products'>
                  <Nav.Link className='mr-3'>
                    <i className='fas fa-store'></i> Products
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/farmers'>
                  <Nav.Link className='mr-3'>
                    <i class='fa-solid fa-wheat-awn'></i> Farmers
                  </Nav.Link>
                </LinkContainer>
                {userInfo && (
                  <LinkContainer to='/myorders'>
                    <Nav.Link>My Orders</Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          )}

          {userInfo && userInfo?.role === 'farmer' && (
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
                <LinkContainer to='/farmer/productlist'>
                  <Nav.Link className='mr-3'>
                    <i className='fas fa-store'></i> My Products
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/farmer/orderlist'>
                  <Nav.Link className='mr-3'>Orders</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          )}

          {userInfo && userInfo?.role === 'admin' && (
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto'>
                <LinkContainer to='/admin/productlist'>
                  <Nav.Link className='mr-3'>
                    <i className='fas fa-store'></i> Products
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          )}

          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {(userInfo?.role === 'customer' || !userInfo) && (
                <LinkContainer to='/cart'>
                  <Nav.Link>
                    <i className='fas fa-shopping-cart'></i> Cart
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
