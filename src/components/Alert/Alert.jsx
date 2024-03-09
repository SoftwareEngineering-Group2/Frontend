import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./AlertStyle";

export const Alert = ({ variant }) => {
  const [open, setOpen] = useState(false);

  console.log(open);

  useEffect(() => {
    setOpen(true);

    if (variant.title === "Success") {
      const timeoutId = setTimeout(() => {
        setOpen(false);
      }, 2000);

      // Clean up the timeout if the component unmounts before 3000 milliseconds
      return () => clearTimeout(timeoutId);
    }
  }, [variant.title]);

  return (
    open && (
      <View
        style={[
          styles.alertContainer,
          { backgroundColor: variant.mainColor, borderColor: variant.secondaryColor },
        ]}
      >
        <View style={[styles.symbolContainer, { backgroundColor: variant.secondaryColor }]}>
          <Text style={styles.materialSymbolsOutlined}>{variant.symbol}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>{variant.title}:</Text>
          <Text style={styles.descriptionText}>{variant.text}</Text>
        </View>
        <TouchableOpacity onPress={() => setOpen(false)} style={styles.symbolCloseLink}>
          <Text style={styles.materialSymbolsOutlined}>close</Text>
        </TouchableOpacity>
      </View>
    )
  );
};



