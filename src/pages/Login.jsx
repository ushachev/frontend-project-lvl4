import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import {
  Container, Row, Col, Card, Form, FloatingLabel, Button,
} from 'react-bootstrap';
import * as yup from 'yup';

const Login = () => {
  const validationSchema = yup.object().shape({
    username: yup.string().trim().required('Обязательное поле'),
    password: yup.string().trim().required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      console.dir({ username, password });
    },
    validationSchema,
  });

  const usernameRef = useRef();
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
                  <h2 className="mb-4 fw-light text-center">Вход</h2>
                  <FloatingLabel controlId="username" label="Ваш ник" className="mb-3">
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
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel controlId="password" label="Пароль" className="mb-4">
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
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Button type="submit" variant="outline-info" size="lg" className="w-100">
                    Войти
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span className="pe-2">Нет аккаунта?</span>
                  <Link to="/signup">Регистрация</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Login;
