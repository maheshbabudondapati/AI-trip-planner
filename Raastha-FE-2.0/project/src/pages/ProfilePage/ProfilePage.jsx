import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useProfileStore } from '../../store/profileStore';
import { 
  Mail, 
  MapPin, 
  Calendar, 
  Globe,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Loader2,
  AlertCircle
} from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { profile, loading, error, fetchProfile } = useProfileStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Fetch profile data when component mounts
    if (user?.id) {
      fetchProfile(user.id).catch(error => {
        console.error('Failed to fetch profile:', error);
      });
    }
  }, [isAuthenticated, user?.id, fetchProfile, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium mb-1">Failed to load profile</h3>
              <p className="text-sm">{error}</p>
              <button 
                onClick={() => fetchProfile(user.id)}
                className="mt-3 text-sm font-medium hover:text-red-700"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No profile data available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Profile Header */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden">
                <img
                  src={profile.avatarImgUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{profile.name}</h1>
              <p className="text-gray-600 mb-4">{profile.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {profile.email}
                </div>
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {profile.location}
                  </div>
                )}
                {profile.website && (
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    {profile.website}
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {profile.phone}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(profile.joinDate).toLocaleDateString()}
                </div>
              </div>

              {/* Social Media Links */}
              {Object.values(profile.socialMedia).some(link => link) && (
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                  {profile.socialMedia.instagram && (
                    <a
                      href={profile.socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#E4405F] transition-colors"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {profile.socialMedia.facebook && (
                    <a
                      href={profile.socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#1877F2] transition-colors"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {profile.socialMedia.twitter && (
                    <a
                      href={profile.socialMedia.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {profile.socialMedia.linkedin && (
                    <a
                      href={profile.socialMedia.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#0A66C2] transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {profile.socialMedia.youtube && (
                    <a
                      href={profile.socialMedia.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#FF0000] transition-colors"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Profile Sections */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Languages */}
        {profile.languages?.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((language, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}