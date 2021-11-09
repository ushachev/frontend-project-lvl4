import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { selectChannelList } from '../store/reducers/channelsSlice.js';

import { setModal } from '../store/reducers/modalSlice.js';
import { setCurrentChannelId } from '../store/reducers/currentChannelSlice.js';

const modalInfoMapping = {
  adding: {
    title: 'elements.addChannel',
    body: {
      type: 'input',
    },
    autoFocus: {
      element: 'input',
      method: 'focus',
    },
    submit: {
      variant: 'outline-info',
      text: 'elements.sendButton',
    },
  },
  removing: {},
  renaming: {},
};

const ChatModal = ({
  modal, sendChannel,
}) => {
  const channels = useSelector(selectChannelList);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const buttonRef = useRef();
  const { t } = useTranslation();

  const modalInfo = modalInfoMapping[modal.type];
  const autoFocusRef = modalInfo.autoFocus.element === 'input' ? inputRef : buttonRef;

  useEffect(() => {
    autoFocusRef.current[modalInfo.autoFocus.method]();
  }, []);

  const handleClose = () => {
    dispatch(setModal({ type: null }));
  };

  const submitActionMapping = {
    adding: (name) => sendChannel({ name }).then(({ data }) => {
      handleClose();
      dispatch(setCurrentChannelId(data.id));
    }),
  };

  const channelNames = channels.map(({ name }) => name);
  const formik = useFormik({
    initialValues: { name: modal.item?.name || '' },
    initialErrors: { name: null },
    onSubmit: async ({ name }, { setSubmitting }) => {
      try {
        await submitActionMapping[modal.type](name);
      } catch (err) {
        console.log(err);
        autoFocusRef.current.select();
        setSubmitting(false);
      }
    },
    validationSchema: yup.object().shape({
      name: yup.string().trim().required()
        .min(3)
        .max(20)
        .notOneOf(channelNames),
    }),
  });

  return (
    <Modal size="sm" show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t(modalInfo.title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modalInfo.body.type === 'input' ? (
          <Form id="channelForm" onSubmit={formik.handleSubmit}>
            <Form.Group className="position-relative">
              <Form.Control
                name="name"
                autoComplete="off"
                readOnly={formik.isSubmitting}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                isInvalid={formik.touched.name && !!formik.errors.name}
                ref={inputRef}
              />
              <Form.Control.Feedback type="invalid" tooltip className="end-0">
                {t(formik.errors.name?.key, formik.errors.name?.values)}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        ) : (
          <p>{modalInfo.body.text}</p>
        )}
      </Modal.Body>
      <Modal.Footer className="justify-content-around">
        <Button variant="outline-light" ref={buttonRef} onClick={handleClose}>
          {t('elements.cancelButton')}
        </Button>
        <Button
          type="submit"
          form="channelForm"
          variant={modalInfo.submit.variant}
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {t(modalInfo.submit.text)}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChatModal;
