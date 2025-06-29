import { Div, Text, Image, Button } from 'atomize';

const NotFound = () => {
  // List of possible URLs/routes
  const urls = [
    { path: '/', label: 'Home' },
    { path: '/collections', label: 'Collections' },
    { path: '/favourites', label: 'Favourites' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/video-cards', label: 'Video Cards' },
    // Add more as your app grows
  ];

  return (
    <Div d="flex" flexDir="column" align="center" justify="center" h="100vh" bg="info200">
      <Image src="/images/mf-logo.jpg" alt="Logo" w="200px" />
      <Text tag="h1" textSize="display1" m={{ t: "1rem" }} textColor="info800">
        404 - Page Not Found
      </Text>
      <Text tag="p" textSize="subheader" m={{ t: "0.5rem" }} textColor="info700" textAlign="center">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Text>
      <Div d="flex" flexDir="column" align="center" m={{ t: '1.5rem' }}>
        {urls.map((url, idx) => (
          <Button
            key={idx}
            m={{ b: '0.5rem' }}
            bg="info700"
            hoverBg="info800"
            textColor="white"
            w="200px"
            onClick={() => window.location.href = url.path}
          >
            {url.label}
          </Button>
        ))}
      </Div>
    </Div>
  );
};

export default NotFound;
