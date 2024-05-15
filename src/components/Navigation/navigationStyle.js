import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    height: 60,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#007bff',
  },
  menuItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
 
});

export default styles;