import React from 'react';
import Header from './header';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
}

/* More info: https://bit.ly/2PsCnzk */
/* * + * {
  margin-top: 1rem;
} */

html,
body {
  margin: 0;
  color: #555;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Helvetica, Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 18px;
  line-height: 1.4;

  /* remove margin for the main div that Gatsby mounts into */
  > div {
    margin-top: 0;
  }
}


h1,
h2,
h3,
h4,
h5,
h6 {
  color: #222;
  line-height: 1.1;

  + * {
    margin-top: 0.5rem;
  }
}

strong {
  color: #222;
}

li {
  margin-top: 0.25rem;
}
`;

const Layout = ({ children }) => {
  // const [shouldShowHeader, setShowHeader] = useState(true)


  return (
    <>
      <GlobalStyle />


      <Header />
      <div
        css={`
          margin: 0 auto;
          padding: 40px 0;
          width: 68vw;

          @media (max-width: 50rem) {
            width: 100%;
            padding: 20px;
          }
        `}
      >

        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
