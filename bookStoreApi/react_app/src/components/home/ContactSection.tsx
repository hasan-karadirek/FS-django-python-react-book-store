import React, { useState, ChangeEvent, useEffect } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import useFetch from "../../hooks/useFetch";
import { ContactFormData } from "../../types/forms";
import { Circles } from "react-loader-spinner";
import Cookies from "js-cookie";

const ContactSection: React.FC = () => {
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/blog/create-form/",
    (res) => {
      return res;
    },
  );
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    images: null,
  });

  const { width } = useWindowSize();

  const submitForm = () => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);
    if (formData.images) {
      Array.from(formData.images).forEach((file, index) =>
        form.append(`uploaded_images[${index}]`, file, file.name),
      );
    }
    const csrfToken = Cookies.get("csrftoken")
    performFetch({
      method: "POST",
      body: form,
      headers:{
        "X-CSRFToken":csrfToken
      }
    });
    return () => {
      if (!isLoading) {
        cancelFetch();
      }
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
    setFormData({
      name: "",
      email: "",
      message: "",
      images: null,
    });
  };

  useEffect(() => {
    return () => {
      cancelFetch();
    };
  }, []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target;
    const value =
      target.type === "file"
        ? (target as HTMLInputElement).files
        : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return error ? (
    <p>{error.message}</p>
  ) : (
    <>
      <div className="mt-4 d-flex flex-column flex-lg-row" id="contact-section">
        <div className="flex-grow-1" style={{ flexBasis: "45%" }}>
          <div className={`container my-5 ${width > 720 ? "me-5" : ""}`}>
            <h2 style={{ paddingLeft: "1rem" }}>Get in Touch</h2>
            <br />
            <p style={{ padding: "1rem" }}>
              Do not hesitate to donate, trade, or sell your books. If you
              choose us, please send an e-mail to
              leflaneuramsterdam@hotmail.com, or fill the contact form,
              including photos of legible spines or faces (of books) together.
              Let us know of any major issues like water damage, loose or
              missing pages, broken spines, and depending on the amount, give us
              2 to 5 days to run a series of highly complicated evaluation
              processes.
            </p>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.9421950390515!2d4.879917176778338!3d52.37146814721569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c60972688bb851%3A0x32c0a3e2045a9a1e!2sLE%20FLANEUR%20AMSTERDAM!5e0!3m2!1str!2snl!4v1713944968223!5m2!1str!2snl"
                width="100%"
                height="450"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
        <div className="flex-grow-1" style={{ flexBasis: "55%" }}>
          <div className={`container my-5 ${width > 720 ? "me-5" : ""}`}>
            <h2>Contact Form</h2>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nameInput"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bookImagesInput" className="form-label">
                  Book Images (optional)
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="bookImagesInput"
                  name="images"
                  onChange={handleChange}
                  multiple
                />
              </div>
              <div className="mb-3">
                <label htmlFor="messageTextarea" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="messageTextarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  required
                ></textarea>
              </div>
              {isLoading ? (
                <Circles
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="circles-loading"
                  wrapperStyle={{ padding: "2rem", justifyContent: "center" }}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactSection;
