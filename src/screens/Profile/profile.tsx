import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './profileStyle';
import { useAuthentication } from '../../hooks/useAuth';

const Profile = () => {
  const { user } = useAuthentication();

  const formattedRegistrationDate = user?.metadata.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Unknown';

    const formattedLastSignInTime = user?.metadata.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      })
    : 'Unknown';

  const fullNamePlaceholder = 'Name Not Set';
  console.log(user)
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Profile</Text>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.profileDetailText}>{user?.displayName || fullNamePlaceholder}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.profileDetailText}>{user?.email}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Registration Date:</Text>
          <Text style={styles.profileDetailText}>{formattedRegistrationDate}</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Last Sign-in Time:</Text>
          <Text style={styles.profileDetailText}>{formattedLastSignInTime}</Text>
        </View>
        <Image
          source={require('../../../assets/images/cat.png')}
          style={styles.profileImage}
        />
      </View>
    </View>
  );
};

export default Profile;
