import { Text } from "react-native-web";
import { Image, View } from "react-native";

export default function Banner(props){
    return (
        <View>
          <Image source={require(`../assets/svg/calculator.svg`)}  style={{width:'200px', height:'200px'}}></Image>
        </View>
    
    );

   
}

