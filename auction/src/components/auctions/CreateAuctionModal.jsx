import React, { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useContract } from '../../hooks/useContract';
import { useWallet } from '../../context/WalletContext';
import { isValidEthAmount } from '../../utils/format';

export const CreateAuctionModal = ({ isOpen, onClose, onSuccess }) => {
  const { connected } = useWallet();
  const { createAuction, loading, error } = useContract();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    startingBid: '',
    duration: 86400, // 24 hours default
  });
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!formData.imageUrl.trim()) {
      errors.imageUrl = 'Image URL is required';
    } else {
      try {
        new URL(formData.imageUrl);
      } catch {
        errors.imageUrl = 'Please enter a valid URL';
      }
    }

    if (!formData.startingBid || !isValidEthAmount(formData.startingBid)) {
      errors.startingBid = 'Please enter a valid ETH amount';
    }

    if (formData.duration < 3600) {
      errors.duration = 'Auction must be at least 1 hour';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!connected) {
      alert('Please connect your wallet first');
      return;
    }

    if (!validateForm()) return;

    try {
      await createAuction(formData);
      onSuccess();
      onClose();
      // Reset form
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        startingBid: '',
        duration: 86400,
      });
      setValidationErrors({});
    } catch (err) {
      console.error('Failed to create auction:', err);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const durationOptions = [
    { value: 3600, label: '1 hour' },
    { value: 21600, label: '6 hours' },
    { value: 43200, label: '12 hours' },
    { value: 86400, label: '24 hours' },
    { value: 259200, label: '3 days' },
    { value: 604800, label: '7 days' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Auction" maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.title ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Enter auction title"
          />
          {validationErrors.title && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {validationErrors.title}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.description ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Describe your item"
          />
          {validationErrors.description && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {validationErrors.description}
            </p>
          )}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
          <div className="relative">
            <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
              className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                validationErrors.imageUrl ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {validationErrors.imageUrl && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {validationErrors.imageUrl}
            </p>
          )}
        </div>

        {/* Starting Bid */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Starting Bid (ETH) *</label>
          <input
            type="number"
            step="0.0001"
            min="0"
            value={formData.startingBid}
            onChange={(e) => handleInputChange('startingBid', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              validationErrors.startingBid ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="0.1"
          />
          {validationErrors.startingBid && (
            <p className="text-red-500 text-xs mt-1 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              {validationErrors.startingBid}
            </p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
          <select
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-800 text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              {error}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1" disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" loading={loading} className="flex-1" disabled={!connected}>
            Create Auction
          </Button>
        </div>
      </form>
    </Modal>
  );
};
