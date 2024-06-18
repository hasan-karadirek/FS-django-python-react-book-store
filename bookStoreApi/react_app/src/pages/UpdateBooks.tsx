import Cookies from "js-cookie";
import React, { ChangeEvent, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
interface UpdateBooksFormData {
  file: File | null;
}
const UpdateBooks: React.FC = () => {
  const [formData, setFormData] = useState<UpdateBooksFormData>({ file: null });
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/book/update-books/",
    (res) => {
      return res;
    },
  );
  const verifyAdminFetch = useFetch("/customer/verify-admin/", (res) => {
    return res;
  });
  useEffect(() => {
    verifyAdminFetch.performFetch();
  }, []);
  const submitForm = () => {
    const form = new FormData();
    form.append("file", formData.file, formData.file.name);

    const csrfToken = Cookies.get("csrftoken");
    performFetch({
      method: "POST",
      body: form,
      headers: {
        "X-CSRFToken": csrfToken,
      },
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
      file: null,
    });
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = (target as HTMLInputElement).files;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return verifyAdminFetch.error ? (
    <div className="error"> {verifyAdminFetch.error.message}</div>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="fileInput" className="form-label">
          Book Images (optional)
        </label>
        <input
          type="file"
          className="form-control"
          id="fileInput"
          name="file"
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
      {error ? <div className="error">{error.message}</div> : ""}
    </form>
  );
};

export default UpdateBooks;
