
"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ImagePlus, X } from "lucide-react";

export default function ProductForm({
  mode = "create",
  initialData = {},
  categories = [],
  conditions = [],
  fields = {},
  formContent = {},
}) {
  const isEdit = mode === "edit";

  const [values, setValues] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    price: initialData.price ?? "",
    originalPrice: initialData.originalPrice ?? "",
    category: initialData.category || "",
    condition: initialData.condition || "",
    city: initialData.city || "",
    locality: initialData.locality || "",
  });

  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (event) => {
    setValues((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));

    setError("");
    setSuccess("");
  };

  const handleImages = (event) => {
    const selected = Array.from(event.target.files || []);
    const remaining = Math.max(0, 5 - images.length);

    const allowed = selected.slice(0, remaining);

    if (selected.length > remaining) {
      setError("You can select up to 5 images.");
    } else {
      setError("");
    }

    const validImages = allowed.filter(
      (file) =>
        file.type.startsWith("image/") &&
        file.size <= 5 * 1024 * 1024
    );

    if (validImages.length !== allowed.length) {
      setError("Each image must be an image file up to 5 MB.");
    }

    setImages((previous) => [...previous, ...validImages]);

    event.target.value = "";
  };

  const removeImage = (index) => {
    setImages((previous) =>
      previous.filter((_, current) => current !== index)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (values.title.trim().length < 3) {
      setError("Product name must contain at least 3 characters.");
      return;
    }

    if (values.description.trim().length < 10) {
      setError("Please provide a description of at least 10 characters.");
      return;
    }

    if (!values.category || !values.condition) {
      setError("Please select a category and product condition.");
      return;
    }

    if (!Number.isFinite(Number(values.price)) || Number(values.price) <= 0) {
      setError("Enter a valid selling price.");
      return;
    }

    if (
      values.originalPrice !== "" &&
      Number(values.originalPrice) < Number(values.price)
    ) {
      setError("Original price should not be less than selling price.");
      return;
    }

    if (!values.city.trim() || !values.locality.trim()) {
      setError("Please enter your city and locality.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setError("The product API has not been configured.");
      return;
    }

    setLoading(true);

    try {
      const body = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        body.append(
          key,
          typeof value === "string" ? value.trim() : String(value)
        );
      });

      images.forEach((image) => {
        body.append("images", image);
      });

      const endpoint = isEdit
        ? `${apiUrl}/products/${initialData.id}`
        : `${apiUrl}/products`;

      const response = await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        credentials: "include",
        body,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to save the product listing."
        );
      }

      setSuccess(
        result.message ||
          (isEdit
            ? "Listing updated successfully."
            : "Listing created successfully.")
      );

      window.location.assign("/sell");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const field = (key) => ({
    label: fields[key]?.label || key,
    placeholder: fields[key]?.placeholder || "",
  });

  return (
    <form className="sell-product-form" onSubmit={handleSubmit}>
      <div className="sell-form-heading">
        <Link href="/sell" className="sell-back-link">
          <ArrowLeft size={17} />
          Back to my listings
        </Link>

        <span className="sell-eyebrow">
          {isEdit ? "MANAGE YOUR LISTING" : "START SELLING"}
        </span>

        <h1>
          {isEdit
            ? formContent.editTitle || "Edit your listing"
            : formContent.createTitle || "Create your listing"}
        </h1>

        <p>
          {isEdit
            ? formContent.editDescription
            : formContent.createDescription}
        </p>
      </div>

      <section className="sell-form-section">
        <div className="sell-form-section-heading">
          <span className="sell-form-step">01</span>
          <div>
            <h2>Product information</h2>
            <p>Tell buyers about the item you are selling.</p>
          </div>
        </div>

        <div className="sell-form-grid">
          <div className="sell-form-field sell-form-full">
            <label htmlFor="sell-title">
              {field("title").label} <span>*</span>
            </label>
            <input
              id="sell-title"
              name="title"
              value={values.title}
              onChange={updateField}
              placeholder={field("title").placeholder}
              maxLength={150}
              required
            />
          </div>

          <div className="sell-form-field sell-form-full">
            <label htmlFor="sell-description">
              {field("description").label} <span>*</span>
            </label>
            <textarea
              id="sell-description"
              name="description"
              value={values.description}
              onChange={updateField}
              placeholder={field("description").placeholder}
              rows={5}
              maxLength={5000}
              required
            />
            <span className="sell-field-hint">
              {values.description.length}/5000 characters
            </span>
          </div>

          <div className="sell-form-field">
            <label htmlFor="sell-category">
              {field("category").label} <span>*</span>
            </label>
            <select
              id="sell-category"
              name="category"
              value={values.category}
              onChange={updateField}
              required
            >
              <option value="">
                {field("category").placeholder}
              </option>
              {categories.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sell-form-field">
            <label htmlFor="sell-condition">
              {field("condition").label} <span>*</span>
            </label>
            <select
              id="sell-condition"
              name="condition"
              value={values.condition}
              onChange={updateField}
              required
            >
              <option value="">
                {field("condition").placeholder}
              </option>
              {conditions.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="sell-form-section">
        <div className="sell-form-section-heading">
          <span className="sell-form-step">02</span>
          <div>
            <h2>Pricing</h2>
            <p>Set a fair price for your product.</p>
          </div>
        </div>

        <div className="sell-form-grid">
          <div className="sell-form-field">
            <label htmlFor="sell-price">
              {field("price").label} <span>*</span>
            </label>
            <div className="sell-price-input">
              <span>₹</span>
              <input
                id="sell-price"
                name="price"
                type="number"
                min="1"
                step="1"
                value={values.price}
                onChange={updateField}
                placeholder={field("price").placeholder}
                required
              />
            </div>
          </div>

          <div className="sell-form-field">
            <label htmlFor="sell-original-price">
              {field("originalPrice").label}
            </label>
            <div className="sell-price-input">
              <span>₹</span>
              <input
                id="sell-original-price"
                name="originalPrice"
                type="number"
                min="1"
                step="1"
                value={values.originalPrice}
                onChange={updateField}
                placeholder={field("originalPrice").placeholder}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sell-form-section">
        <div className="sell-form-section-heading">
          <span className="sell-form-step">03</span>
          <div>
            <h2>Product photos</h2>
            <p>
              Upload up to five clear photos. Maximum 5 MB per image.
            </p>
          </div>
        </div>

        <label className="sell-upload-area">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImages}
            disabled={images.length >= 5}
          />
          <ImagePlus size={30} />
          <strong>Add product photos</strong>
          <span>Click to select images from your device</span>
        </label>

        {images.length > 0 && (
          <div className="sell-image-preview-grid">
            {images.map((image, index) => (
              <div className="sell-image-preview" key={`${image.name}-${index}`}>
                <img src={URL.createObjectURL(image)} alt={image.name} />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  aria-label={`Remove ${image.name}`}
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        )}

        {isEdit && (
          <p className="sell-field-hint">
            Select any new images to upload. Existing photos remain
            managed by your backend.
          </p>
        )}
      </section>

      <section className="sell-form-section">
        <div className="sell-form-section-heading">
          <span className="sell-form-step">04</span>
          <div>
            <h2>Pickup location</h2>
            <p>Help nearby buyers discover your listing.</p>
          </div>
        </div>

        <div className="sell-form-grid">
          <div className="sell-form-field">
            <label htmlFor="sell-city">
              {field("city").label} <span>*</span>
            </label>
            <input
              id="sell-city"
              name="city"
              value={values.city}
              onChange={updateField}
              placeholder={field("city").placeholder}
              maxLength={100}
              required
            />
          </div>

          <div className="sell-form-field">
            <label htmlFor="sell-locality">
              {field("locality").label} <span>*</span>
            </label>
            <input
              id="sell-locality"
              name="locality"
              value={values.locality}
              onChange={updateField}
              placeholder={field("locality").placeholder}
              maxLength={150}
              required
            />
          </div>
        </div>
      </section>

      {error && (
        <div className="sell-form-alert sell-form-alert-error" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="sell-form-alert sell-form-alert-success" role="status">
          {success}
        </div>
      )}

      <div className="sell-form-footer">
        <Link href="/sell" className="sell-cancel-button">
          {formContent.cancelLabel || "Cancel"}
        </Link>

        <button
          type="submit"
          className="sell-primary-button"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : isEdit
              ? formContent.submitEdit || "Save changes"
              : formContent.submitCreate || "Publish listing"}
        </button>
      </div>
    </form>
  );
}
