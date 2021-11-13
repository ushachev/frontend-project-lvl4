import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Container, Row, Col, Card, Form, FloatingLabel, Button, ToastContainer, Toast,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import useAuth from '../hooks/useAuth.js';
import routes from '../routes.js';

const SignUp = () => {
  const [signupFailed, setSignupFailed] = useState(false);
  const usernameRef = useRef();
  const history = useHistory();
  const { t } = useTranslation();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    initialErrors: { username: null },
    onSubmit: async ({ username, password }) => {
      setSignupFailed(false);
      try {
        const { data } = await axios.post(routes.signupPath(), { username, password });

        auth.logIn(data);
        history.push('/');
      } catch (err) {
        if (!err.isAxiosError || err.response.status !== 409) throw err;

        setSignupFailed(true);
        usernameRef.current.select();
      }
    },
    validationSchema: yup.object().shape({
      username: yup.string().trim().required().min(3)
        .max(20),
      password: yup.string().trim().required().min(6),
      confirmPassword: yup.string().trim().test({
        name: 'passwords-match',
        test(value) {
          // eslint-disable-next-line
          return value === this.parent.password;
        },
        message: t('errors.validation.passwordConfirmation'),
      }),
    }),
  });

  const closeToast = () => setSignupFailed(false);

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
                  <h2 className="mb-4 fw-light text-center">{t('elements.registration')}</h2>
                  <FloatingLabel
                    controlId="username"
                    label={t('placeholders.username')}
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
                      {t(formik.errors.username?.key, formik.errors.username?.values)}
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
                      autoComplete="new-password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid" tooltip className="end-0">
                      {t(formik.errors.password?.key, formik.errors.password?.values)}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="confirmPassword"
                    label={t('placeholders.confirmPassword')}
                    className="mb-4"
                  >
                    <Form.Control
                      type="password"
                      placeholder="confirmPassword"
                      name="confirmPassword"
                      autoComplete="new-password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirmPassword}
                      isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid" tooltip className="end-0">
                      {formik.errors.confirmPassword}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Button
                    type="submit"
                    variant="outline-info"
                    size="lg"
                    className="w-100"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    {t('elements.signup')}
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span className="pe-2">{t('elements.haveAccount')}</span>
                  <Link to="/login">{t('elements.login')}</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <ToastContainer className="mt-5 p-3" position="top-center">
          <Toast show={signupFailed} bg="danger" onClose={closeToast}>
            <Toast.Header>
              <strong className="me-auto">Hexlet Chat</strong>
            </Toast.Header>
            <Toast.Body>{t('elements.signupFailed')}</Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    </Container>
  );
};

export default SignUp;
