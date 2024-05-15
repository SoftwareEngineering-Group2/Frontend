import { StyleSheet, Platform } from "react-native";

const commonStyles = {
  toast: {
    position: 'absolute',
    borderRadius: 5,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
  },
  text: {
    textAlign: 'center',    
    color: 'black',
    fontWeight: 'bold',
  },
};

const webStyles = {
  toast: {
    ...commonStyles.toast,
    top: '12%',
    left: '44.4%',
    width: 200,
    height: 70,
    padding: 10,
  },
  text: {
    ...commonStyles.text,
  },
};

const mobileStyles = {
  toast: {
    ...commonStyles.toast,
    padding: 5,
    top: '20%',
    left: '30%',
    width: 150, 
    height: 70,
  },
  text: {
    ...commonStyles.text,
    fontSize: 14,
  },
};

const styles = StyleSheet.create(Platform.OS === 'web' ? webStyles : mobileStyles);

export default styles;
