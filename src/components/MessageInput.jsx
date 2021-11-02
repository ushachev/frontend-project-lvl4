import React, { useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { IoIosAdd } from 'react-icons/io';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const MessageInput = () => {
  const messageRef = useRef();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { message: '' },
    initialErrors: { message: null },
    onSubmit: async ({ message }, { resetForm, setSubmitting }) => {
      console.log('message:', message);
      resetForm();
      messageRef.current.focus();
      setSubmitting(false);
    },
    validationSchema: yup.object().shape({
      message: yup.string().trim().required(),
    }),
  });

  useEffect(() => {
    messageRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit} className="position-relative ps-3">
      <Form.Control
        type="text"
        placeholder={t('placeholders.enterMessage')}
        name="message"
        onChange={formik.handleChange}
        value={formik.values.message}
        ref={messageRef}
        className="ps-5 py-2 border-0 rounded-pill fs-6 text-reset bg-secondary bg-opacity-50"
      />
      <Button
        type="submit"
        variant="contained"
        size="sm"
        className="position-absolute top-50 p-2 border border-3 border-dark rounded-circle text-reset bg-secondary translate-middle"
        disabled={!formik.isValid || formik.isSubmitting}
      >
        <IoIosAdd size="2em" />
      </Button>
    </Form>
  );
};

export default MessageInput;
