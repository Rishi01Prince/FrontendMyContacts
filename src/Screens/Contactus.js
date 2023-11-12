import React from 'react';
import { useForm } from 'react-hook-form';
import "./Contactus.css";

const Contactus = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle form submission
  };

  return (
    <section className="contact">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register('name')} placeholder="Name" />
        <input type="email" {...register('email')} placeholder="Email" />
        <textarea {...register('message')} placeholder="Message"></textarea>
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
};

export default Contactus;