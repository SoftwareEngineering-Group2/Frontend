import { View, Text } from 'react-native';
import styles from './profileStyle'

const Profile = () => {
  // Dummy profile information
  const profileInfo = {
    name: 'John Doe',
    age: 30,
    occupation: 'Software Engineer',
    location: 'New York, USA',
    interests: ['Reading', 'Traveling', 'Photography'],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text>{profileInfo.name}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Age:</Text>
        <Text>{profileInfo.age}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Occupation:</Text>
        <Text>{profileInfo.occupation}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Location:</Text>
        <Text>{profileInfo.location}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Interests:</Text>
        {profileInfo.interests.map((interest, index) => (
          <Text key={index}>{interest}</Text>
        ))}
      </View>
    </View>
  );
};



export default Profile;
