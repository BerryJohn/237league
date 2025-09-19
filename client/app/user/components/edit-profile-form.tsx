'use client';

import { useState } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/card';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { User } from '@heroui/user';
import { UserProfile, EditableUserData } from '@/types';

interface EditProfileFormProps {
  profile: UserProfile;
  onSave: (data: EditableUserData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function EditProfileForm({
  profile,
  onSave,
  onCancel,
  isLoading = false,
}: EditProfileFormProps) {
  const [formData, setFormData] = useState<EditableUserData>({
    displayName: profile.displayName,
    bio: profile.bio || '',
    email: profile.email || '',
    country: profile.country || '',
  });

  const [errors, setErrors] = useState<Partial<EditableUserData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<EditableUserData> = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Display name is required';
    } else if (formData.displayName.length < 2) {
      newErrors.displayName = 'Display name must be at least 2 characters';
    } else if (formData.displayName.length > 30) {
      newErrors.displayName = 'Display name must be less than 30 characters';
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Bio must be less than 500 characters';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSave(formData);
    } catch (error) {
      console.error('Failed to save profile:', error);
      // Handle error display here if needed
    }
  };

  const handleInputChange = (field: keyof EditableUserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex gap-3 items-center">
          <User
            name={profile.displayName}
            description={`@${profile.username}`}
            avatarProps={{
              src: profile.avatar,
              size: 'lg',
              isBordered: true,
            }}
          />
          <div>
            <h3 className="text-xl font-semibold">Edit Profile</h3>
            <p className="text-sm text-default-500">
              Update your profile information
            </p>
          </div>
        </div>
      </CardHeader>

      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Steam-linked fields (read-only) */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-default-700 border-b border-default-200 pb-2">
              Steam Account (Read-only)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Username"
                value={profile.username}
                isReadOnly
                variant="flat"
                description="Linked to your Steam account"
                classNames={{
                  input: 'text-default-500',
                }}
              />
              <Input
                label="Steam ID"
                value={profile.steamId}
                isReadOnly
                variant="flat"
                description="Cannot be changed"
                classNames={{
                  input: 'text-default-500 font-mono text-xs',
                }}
              />
            </div>
          </div>

          {/* Editable fields */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-default-700 border-b border-default-200 pb-2">
              Profile Information
            </h4>

            <Input
              label="Display Name"
              value={formData.displayName}
              onValueChange={(value) => handleInputChange('displayName', value)}
              isRequired
              errorMessage={errors.displayName}
              isInvalid={!!errors.displayName}
              description="This is how other users will see your name"
              maxLength={30}
            />

            <Input
              label="Email"
              type="email"
              value={formData.email}
              onValueChange={(value) => handleInputChange('email', value)}
              errorMessage={errors.email}
              isInvalid={!!errors.email}
              description="Optional - for notifications and account recovery"
              placeholder="your.email@example.com"
            />

            <Input
              label="Country"
              value={formData.country}
              onValueChange={(value) => handleInputChange('country', value)}
              description="Optional - shown on your profile"
              placeholder="e.g., United States, Germany, Japan"
            />

            <div className="space-y-2">
              <Input
                label="Bio"
                value={formData.bio}
                onValueChange={(value) => handleInputChange('bio', value)}
                errorMessage={errors.bio}
                isInvalid={!!errors.bio}
                description={`Optional - tell others about yourself (${formData.bio.length}/500)`}
                placeholder="Tell others about yourself, your typing journey, or anything interesting!"
                maxLength={500}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 justify-end pt-6 border-t border-default-200">
            <Button variant="flat" onPress={onCancel} isDisabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" color="primary" isLoading={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
