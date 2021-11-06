import React, { useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { IoIosAdd } from 'react-icons/io';
import { BsWifiOff } from 'react-icons/bs';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const MessageInput = ({
  connected, sendMessage, username, currentChannelId,
}) => {
  const messageRef = useRef();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: { body: '' },
    initialErrors: { body: null },
    onSubmit: async ({ body }, { resetForm, setSubmitting }) => {
      try {
        await sendMessage({ channelId: currentChannelId, username, body });
        resetForm();
        messageRef.current.focus();
      } catch (err) {
        console.log(err);
        messageRef.current.select();
      }
      setSubmitting(false);
    },
    validationSchema: yup.object().shape({
      body: yup.string().trim().required(),
    }),
  });

  useEffect(() => {
    messageRef.current.focus();
  }, []);

  return (
    <Form onSubmit={formik.handleSubmit} className="ps-3">
      <div className="position-relative">
        <Form.Control
          type="text"
          placeholder={t('placeholders.enterMessage')}
          name="body"
          autoComplete="off"
          readOnly={formik.isSubmitting}
          onChange={formik.handleChange}
          value={formik.values.body}
          ref={messageRef}
          aria-describedby="messageHelpBlock"
          className="ps-5 py-2 border-0 rounded-pill fs-6 text-reset bg-secondary bg-opacity-50"
        />
        <Button
          type="submit"
          variant="contained"
          size="sm"
          className="position-absolute top-50 p-2 border border-3 border-dark rounded-circle text-reset bg-secondary translate-middle"
          disabled={!connected || !formik.isValid || formik.isSubmitting}
        >
          <IoIosAdd size="2em" />
        </Button>
      </div>
      <Form.Text id="messageHelpBlock" muted className="ps-4">
        {!connected && (
          <>
            <BsWifiOff size="1.4em" className="me-2" />
            {t('elements.chatConnects')}
          </>
        )}
      </Form.Text>
    </Form>
  );
};

export default MessageInput;
