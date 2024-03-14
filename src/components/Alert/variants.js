import { Ionicons } from '@expo/vector-icons'; 

export const variants = [
  //red
  {
    mainColor: "#FDEDED",
    secondaryColor: "#F16360",
    symbol: <Ionicons name="alert" size={24} color="black" />,
    title: "Error",
    text: "Ett fel uppstod, försök igen",
  },
  //blue
  {
    mainColor: "#E5F6FD",
    secondaryColor: "#1AB1F5",
    symbol: "info",
    title: "Information",
    text: "Our newest module can be bought, or you can always just use our 30 day trial.",
  },
  //green
  {
    mainColor: "#EDFEEE",
    secondaryColor: "#5CB660",
    symbol: "check_circle",
    title: "Success",
    text: "Operationen var lyckad!",
  },
  //yellow
  {
    mainColor: "#FFF4E5",
    secondaryColor: "#FFA117",
    symbol: "warning",
    title: "Warning",
    text: "Your trial is ending soon, please click here to renew it.",
  },
  //pink
  {
    mainColor: "#FFC0CB",
    secondaryColor: "#FF69B4",
    symbol: "pets",
    title: "Check it out",
    text: "Fun and cute pictures of dogs are to be released daily from now on!",
  },
];