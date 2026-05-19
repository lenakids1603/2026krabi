/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './screens/Home';
import Itinerary from './screens/Itinerary';
import Attractions from './screens/Attractions';
import Dining from './screens/Dining';
import TravelInfo from './screens/TravelInfo';
import Weather from './screens/Weather';
import Directory from './screens/Directory';
import Gallery from './screens/Gallery';
import Notes from './screens/Notes';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/travel-info" element={<TravelInfo />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/more" element={<Notes />} />
        </Routes>
      </Layout>
    </Router>
  );
}

