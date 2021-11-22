import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useChat from '../hooks/useChat.js';

import { selectChannelList } from '../store/reducers/channelsSlice.js';

import { setModal } from '../store/reducers/modalSlice.js';
import { setCurrentChannelId } from '../store/reducers/activeChannelSlice.js';

const modalInfoMapping = {
  adding: {
    title: 'elements.addChannel',
    autoFocusMethod: 'focus',
  },
  removing: {
    title: 'elements.removeChannel',
    autoFocusMethod: 'focus',
  },
  renaming: {
    title: 'elements.renameChannel',
    autoFocusMethod: 'select',
  },
};

const ChatModal = function ChatModal({ modal }) {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const channels = useSelector(selectChannelList);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const buttonRef = useRef();
  const { sendChannel, sendChangedChannel, sendRemovedChannel } = useChat();
  const { t } = useTranslation();

  const modalInfo = modalInfoMapping[modal.type];
  const autoFocusRef = modal.type === 'removing' ? buttonRef : inputRef;

  useEffect(() => {
    autoFocusRef.current[modalInfo.autoFocusMethod]();
  }, []);

  const handleClose = () => {
    dispatch(setModal({ type: null }));
  };

  const handleRemoving = (channel) => async () => {
    setButtonDisabled(true);
    try {
      await sendRemovedChannel(channel);
      handleClose();
    } catch (err) {
      console.log(err);
      autoFocusRef.current.focus();
      setButtonDisabled(false);
    }
  };

  const submitActionMapping = {
    adding: (name) => sendChannel({ name }).then(({ data }) => {
      handleClose();
      dispatch(setCurrentChannelId(data.id));
    }),
    renaming: (name) => sendChangedChannel({ id: modal.item.id, name })
      .then(() => handleClose()),
  };

  const testIdMapping = {
    adding: 'add-channel',
    renaming: 'rename-channel',
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
    <Modal show onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t(modalInfo.title)}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {modal.type === 'removing' ? (
          <p className="lead">{t('elements.areYouSure')}</p>
        ) : (
          <Form id="channelForm" onSubmit={formik.handleSubmit}>
            <Form.Group className="position-relative">
              <Form.Control
                data-testid={testIdMapping[modal.type]}
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
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-light" ref={buttonRef} onClick={handleClose}>
          {t('elements.cancel')}
        </Button>
        {modal.type === 'removing' ? (
          <Button
            variant="outline-danger"
            onClick={handleRemoving(modal.item)}
            disabled={buttonDisabled}
          >
            {t('elements.remove')}
          </Button>
        ) : (
          <Button
            type="submit"
            form="channelForm"
            variant="outline-info"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {t('elements.send')}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ChatModal;
