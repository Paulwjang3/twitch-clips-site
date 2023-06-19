import './App.css';
import { 
  ApolloClient, 
  ApolloProvider, 
  InMemoryCache,
  createHttpLink, 
} from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from "react";
import { setContext } from '@apollo/client/link/context';

import Search from './components/Search';
import HomepageClips from './components/HomepageClips';
import Clips from './components/Clips';
import Navbar from './Components/Navbar';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  // callback functions that allow us to pass data from the Search component to the Clips component
  const [clipsData, setClipsData] = useState([]);
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container mx-auto">
          <Navbar />
          <Search setClipsData={setClipsData} />
          <Routes>
            <Route path="/" element={<HomepageClips />} />
            <Route path="/clips" element={<Clips clipsData={clipsData} />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;