import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'planner',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for authentication
  const mockCredentials = {
    planner: { username: 'planner@sail.com', password: 'planner123' },
    operator: { username: 'operator@sail.com', password: 'operator123' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({ ...prev, role }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.username?.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData?.password?.trim()) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const expectedCredentials = mockCredentials?.[formData?.role];
      
      if (formData?.username === expectedCredentials?.username && 
          formData?.password === expectedCredentials?.password) {
        // Store user session data
        localStorage.setItem('userRole', formData?.role);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', formData?.username);
        
        // Navigate to main dashboard
        navigate('/main-dashboard');
      } else {
        setErrors({
          general: `Invalid credentials for ${formData?.role}. Please check your username and password.`
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert('Please contact your system administrator for password reset assistance.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-red-600" />
              <p className="text-sm text-red-700">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Username Field */}
        <Input
          label="Username"
          type="email"
          name="username"
          placeholder="Enter your username"
          value={formData?.username}
          onChange={handleInputChange}
          error={errors?.username}
          required
          className="w-full"
        />

        {/* Password Field */}
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          className="w-full"
        />

        {/* Role Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Select Role
          </label>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="planner"
                checked={formData?.role === 'planner'}
                onChange={(e) => handleRoleChange(e?.target?.value)}
                className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-foreground">Planner</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="role"
                value="operator"
                checked={formData?.role === 'operator'}
                onChange={(e) => handleRoleChange(e?.target?.value)}
                className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-foreground">Operator</span>
            </label>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            size="sm"
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 transition-hover"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          fullWidth
          iconName="LogIn"
          iconPosition="left"
          iconSize={18}
          className="mt-6"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;