import { StatusBar } from "expo-status-bar";
import {Audio} from "expo-av"
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import Header from "./src/components/Header";
import Timer from "./src/components/Timer";


const colors = ["#F7DC6F", "#A2D9CE", "#D7BDE2"];

export default function App() {
  const [isWorking, setIsWorking] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [currentTime, setCurrentTime] = useState("POMO" | "SHORT" | "BREAK");
  const [isActive,setIsActive]=useState(false)

  console.log(currentTime);

useEffect(()=>{
  let interval=null
if (isActive) {
  //run timer
  interval=setInterval(()=>{
    setTime(time-1)
  },1000)
} else{
  //clear interval
  clearInterval(interval)
}

if (time===0) {
  setIsActive(false)
  setIsWorking((prev)=>!prev)
  setTime(isWorking?300:1500)
}

return ()=>clearInterval(interval)

},[isActive,time])

  function handlStartStop() {
    playSound()
    setIsActive(!isActive)
  }
  async function playSound() {
    const {sound}=await Audio.Sound.createAsync(
      require("./src/assets/sound.mp3")
    )
    await sound.playAsync()
  }



  return (
    <SafeAreaView style={[styles.container,{backgroundColor:colors[currentTime]}]}>
      <View style={{flex:1,paddingHorizontal:15 ,paddingTop: Platform.OS === "android" && 30, }}>
        <Text style={styles.text}>Pomodoro</Text>

        <Header
          setTime={setTime}
          setCurrentTime={setCurrentTime}
          currentTime={currentTime}
        />
        <Timer time={time}/>
        <TouchableOpacity style={styles.button} onPress={()=>{handlStartStop()}}>
          <Text style={{color:"white",fontWeight:"bold",}}>{isActive?"STOP":"START"} </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: { fontSize: 32, fontWeight: "bold" },
  button:{
    backgroundColor:"#333333",
    marginTop:15,
    padding:15,
    borderRadius:15,
    alignItems:"center",
  
  },
});
