import React, { useState, useEffect } from 'react';
import { View, Text, Image} from 'react-native';
import styles from './profileStyle';
import { useAuthentication } from '../../hooks/useAuth';
import { useToken } from '../../api/getToken';
import httpClient from "../../api/httpClient";
import { getUsername } from '@/src/api/deviceService';
import { FIREBASE_AUTH } from '../../../FirebaseConfig';



const Profile = () => {
  const { user } = useAuthentication();
  const token = useToken();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (token) {
      httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]); 

  useEffect(() => {
    async function fetchData() {
      try {
        const user = FIREBASE_AUTH.currentUser;
        if (user) {
          const uid = user.uid;
          const response = await getUsername(uid);
          setFirstName(response.firstName);
          setLastName(response.lastName);
        } else {
          console.error('User is not authenticated.');
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []); 




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


  console.log(user)
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Profile</Text>
        <View style={styles.profileInfo}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.profileDetailText}>{firstName} {lastName}</Text>
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
