import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(#FCFCFC 30%, #CCE4FF 60%, #007bff)'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  menuContainer: {
    marginTop: 60,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  settingsContainer: {
    marginTop: 20,
    alignSelf: 'stretch',
  },
  settingItem: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default styles;