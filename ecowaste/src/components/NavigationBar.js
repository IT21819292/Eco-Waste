import React,{useState, useEffect} from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import backgroundImage from '../images/truck.png'; // Adjust the path as needed
import logo from '../images/logo.jpg'; // Adjust the path as needed
import UserApi from '../Api/UserApi';

function NavigationBar() {
    const isLoggedIn = window.localStorage.getItem("loggedIn");
    const token = window.localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const [fullName, setFullName] = useState('');
    const [image, setImage] = useState('');
    const [admin, setAdmin] = useState(false);
  //   useEffect(() => {
  //       fetchProfile();
  //       fetchUser(token);
  //     }, [userId,token]);
    
    
  //     const fetchProfile = async () => {
  //       try {
  //           const response = await UserApi.fetchUserID(userId);
  //           console.log(response);
  //           let data = response.data;
  //           console.log(data);
  //           setFullName(data.fullName);
  //           setImage(data.image);
  //       } catch (error) {
  //           console.error('Error fetching user data:', error);
  //       }
  //       };

  // const fetchUser = async (token) => {
  //   if (token) {
  //     try{
  //       const res = await UserApi.fetchUserData(token);
  //       let data = res.data;
  //       if (data.isAdmin === true) { // Assuming isAdmin is a boolean
  //         setAdmin(true);
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch user data:', error);
  //     }
  //   }
  // };
  return (
    <div className='head' style={{ 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '10vw' // This sets the height of the navbar
    }}>
        <div className='navBar' style={{position:'sticky'}}>
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <Container>
                <Navbar.Brand href="/">EcoWaste</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/services">Services</Nav.Link>
                    <Nav.Link href="/products">Products</Nav.Link>
                    <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                    {isLoggedIn === "true" ?
                    <Nav>
                        <Nav.Link href="/profile" style={{fontSize:'1.3rem',color:'white'}}>
                            <img src={image} alt="Profile" style={{ width: '3rem', height: '3rem',borderRadius:'1.5rem', border:'2px solid white', marginRight:'0.6rem' }} />
                            {'     '}
                            {fullName}
                        </Nav.Link>
                    </Nav>
                    :
                    <Nav>
                    <Nav.Link href="/signin">Signin</Nav.Link>
                    <Button variant="success" href="/signup">Signup</Button>
                    </Nav>
                    }
                </Navbar.Collapse>
                </Container>
            </Navbar> 
        </div>
      {isLoggedIn === "true" ?
      <div>
        {admin ?
        <div className='Btn'>
            <Button variant="danger" href="/checkoutdashboard">Product Checkouts</Button>{' '}
            <Button variant="danger" href="/requestdashboard">Location Request </Button>
        </div>
        :
        <div className='Btn'>
            <Button variant="success" href="/productview">Research and products</Button>{' '}
            <Button variant="success" href="/requestview">Request pickup</Button>
        </div>
            }
            </div>
            :
            null}
        <div className='textheader'>
            <h1>WE COLLECT ALL</h1>
            <h1>YOUR DIRTY STUFF</h1>
        </div>
    </div>
  );
}

export default NavigationBar;

