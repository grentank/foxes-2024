import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

import React, { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import Loader from './hoc/Loader';
import Navbar from './ui/Navbar';

export default function Layout() {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <Row>
        <Loader isLoading={user === undefined}>
          <Row>
            <Col xs={12}>
              <Navbar />
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <main>
                <Outlet />
              </main>
            </Col>
          </Row>
        </Loader>
      </Row>
    </Container>
  );
}
