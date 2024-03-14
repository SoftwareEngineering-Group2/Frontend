import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  alertContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  symbolContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  descriptionContainer: {
    flex: 1,
    flexDirection: "column",
  },
  materialSymbolsOutlined: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    alignItems: "center",
  },
  descriptionText: {
    fontSize: 16,
  },
  symbolCloseLink: {
    marginLeft: 10,
  },
});
