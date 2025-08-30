import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { handleError } from "../../utils/errorHandlerToast";

interface PropertyFormProps {
  show: boolean;
  handleClose: () => void;
  refreshProperties: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  show,
  handleClose,
  refreshProperties,
}) => {
  // State for form data
  const [formData, setFormData] = useState({
    host_id: "1", // Default for testing, replace with actual admin ID
    title: "",
    description: "",
    location: "",
    price: "",
    max_guests: "",
    bedrooms: "",
    bathrooms: "",
    property_type: "apartment",
    status: "available",
  });

  const [images, setImages] = useState<File[]>([]);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value.toString());
    });

    images.forEach((file) => formDataToSend.append("images", file));

    try {
      await axios.post(
        `${apiBaseUrl}/api/properties`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      refreshProperties(); // Refresh Dashboard
      handleClose();
    } catch (error) {
      handleError(error)
    }
  };

  // Handle form submission

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          {/* Host ID (Hidden for now) */}
          <Form.Control type="hidden" name="host_id" value={formData.host_id} />

          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Location */}
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Price */}
          <Form.Group className="mb-3">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Max Guests */}
          <Form.Group className="mb-3">
            <Form.Label>Max Guests</Form.Label>
            <Form.Control
              type="number"
              name="max_guests"
              value={formData.max_guests}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Bedrooms */}
          <Form.Group className="mb-3">
            <Form.Label>Bedrooms</Form.Label>
            <Form.Control
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Bathrooms */}
          <Form.Group className="mb-3">
            <Form.Label>Bathrooms</Form.Label>
            <Form.Control
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Property Type */}
          <Form.Group className="mb-3">
            <Form.Label>Property Type</Form.Label>
            <Form.Select
              name="property_type"
              value={formData.property_type}
              onChange={handleChange}
            >
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="hotel">Hotel</option>
              <option value="villa">Villa</option>
            </Form.Select>
          </Form.Group>

          {/* Status */}
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="unavailable">Unavailable</option>
            </Form.Select>
          </Form.Group>

          {/* Upload Images */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Images</Form.Label>
            <Form.Control type="file" multiple onChange={handleFileChange} />
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PropertyForm;
