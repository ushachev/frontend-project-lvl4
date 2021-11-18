import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import {
  Container, Row, Col, Card, Form, FloatingLabel, Button, ToastContainer, Toast,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import * as yup from 'yup';
import axios from 'axios';

import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const Login = function Login() {
  const [authFailed, setAuthFailed] = useState(false);
  const usernameRef = useRef();
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();
  const auth = useAuth();
  const rollbar = useRollbar();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    initialErrors: { username: null },
    onSubmit: async ({ username, password }) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(routes.loginPath(), { username, password });
        const { from } = location.state || { from: { pathname: '/' } };

        auth.logIn(data);
        history.replace(from);
      } catch (err) {
        if (!err.isAxiosError || err.response.status !== 401) {
          rollbar.error('Login error', err, { username });
          throw err;
        }

        setAuthFailed(true);
        usernameRef.current.select();
      }
    },
    validationSchema: yup.object().shape({
      username: yup.string().trim().required(),
      password: yup.string().trim().required(),
    }),
  });

  const closeToast = () => setAuthFailed(false);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <Container fluid className="h-100">
      <div className="d-flex flex-column justify-content-center h-100">
        <Row className="mb-5">
          <Col>
            <h1 className="text-center">Hexlet Chat</h1>
          </Col>
        </Row>
        <Row className="justify-content-center mb-5">
          <Col sm={10} md={8} lg={6} xl={5} xxl={4}>
            <Card border="secondary">
              <Card.Body>
                <Form onSubmit={formik.handleSubmit} className="px-5 py-3">
                  <h2 className="mb-4 fw-light text-center">{t('elements.loginTitle')}</h2>
                  <FloatingLabel
                    controlId="username"
                    label={t('placeholders.nickname')}
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="username"
                      name="username"
                      autoComplete="username"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      isInvalid={formik.touched.username && !!formik.errors.username}
                      ref={usernameRef}
                    />
                    <Form.Control.Feedback type="invalid" tooltip className="end-0">
                      {t(formik.errors.username?.key)}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="password"
                    label={t('placeholders.password')}
                    className="mb-4"
                  >
                    <Form.Control
                      type="password"
                      placeholder="password"
                      name="password"
                      autoComplete="current-password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid" tooltip className="end-0">
                      {t(formik.errors.password?.key)}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Button
                    type="submit"
                    variant="outline-info"
                    size="lg"
                    className="w-100"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    {t('elements.login')}
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span className="pe-2">{t('elements.haveNoAccount')}</span>
                  <Link to="/signup">{t('elements.registration')}</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <ToastContainer className="mt-5 p-3" position="top-center">
          <Toast show={authFailed} bg="danger" onClose={closeToast}>
            <Toast.Header>
              <strong className="me-auto">Hexlet Chat</strong>
            </Toast.Header>
            <Toast.Body>{t('elements.authFailed')}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </Container>
  );
};

export default Login;
