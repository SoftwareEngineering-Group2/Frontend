import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    position: 'relative',
    width: '100%', // or use flexGrow: 1
    backgroundColor: 'transparent',
    backgroundImage: 'radial-gradient(#FCFCFC 50%, #CCE4FF 80%, #007bff)'
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '60%'
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1, // Added border
    borderColor: '#007bff', // Border color changed to blue
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  controlUnitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  controlUnitText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
    zIndex: 1,
    position: 'absolute',
    top: 65,
    left: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  searchBar: {
    width: '40%',
    height: 40,
    borderColor: '#007bff', // Border color changed to blue
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontStyle: 'italic', // Make the placeholder text italic
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  welcomeText:{
    fontWeight: 'bold',
    fontSize: 24,
    color: '#007bff',
    textTransform: 'capitalize',
  }
});

export default styles;