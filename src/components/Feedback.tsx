import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CheckIcon from '@mui/icons-material/Check';
import { submitFeedback } from '../redux/slices/feedbackSlice';
import { AppDispatch, RootState } from '../redux/store';
import Feedback from '../models/IFeedback';
import classes from '../styles/Feedback.module.css'; // Adjust the import path to match your folder structure

const FeedbackForm: React.FC = () => {
  const [feedback, setFeedback] = useState<Feedback>({
    name: "",
    id: "",
    email: "",
    phone: "",
    comment: ""
  });
  const [submitMessage, setSubmitMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const feedbackStatus = useSelector((state: RootState) => state.feedback.status);
  const feedbackError = useSelector((state: RootState) => state.feedback.error);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFeedback({ ...feedback, id: uuid() });
    dispatch(submitFeedback(feedback));
    setFeedback({
      name: "",
      id: "",
      email: "",
      phone: "",
      comment: ""
    });
    setSubmitMessage("Thanks for contacting us. We'll get back to you as soon as possible.");
  };

  return (
    <form className={`${classes['feedback-form']} w-75`} onSubmit={handleSubmit}>
      <h2>Kindly Complete This Form <span><FavoriteBorderOutlinedIcon /></span></h2>
      {submitMessage && <p className={classes['success-message']}><CheckIcon color="success" />{submitMessage}</p>}
      <div className={classes['form-group']}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={feedback.name}
          onChange={handleChange}
          className='w-50 me-2 p-3'
        />
        <input
          type="email"
          name="email"
          placeholder="Email *"
          value={feedback.email}
          onChange={handleChange}
          required
          className='w-50 ms-2 p-3'
        />
      </div>
      <div className={classes['form-group']}>
        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={feedback.phone}
          onChange={handleChange}
          className='w-100 p-3'
        />
      </div>
      <div className={classes['form-group']}>
        <textarea
          name="comment"
          placeholder="Comment"
          value={feedback.comment}
          onChange={handleChange}
          className='p-3'
        ></textarea>
      </div>
      <button type="submit" className='p-3 mt-4'>Send</button>
      {feedbackStatus === 'loading' && <p>Submitting...</p>}
      {feedbackStatus === 'failed' && <p>Error: {feedbackError}</p>}
    </form>
  );
};

export default FeedbackForm;
