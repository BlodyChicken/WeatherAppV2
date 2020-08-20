// *********************************************** App Style ***********************************************************
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      paddingTop:20
    },
    sectionA: {
      flex: 0.3,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderColor:'#00FFFF'
    },
    sectionB: {
      flex: 0.2,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderColor:'#00FFFF',
      borderWidth:1,
      borderBottomWidth:0,
      borderTopWidth:0,
    },
    sectionC: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      borderColor:'#00FFFF',
    },
    sectionD: {
      flex: 0.1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      borderColor:'#00FFFF',
      borderWidth:1,
      borderBottomWidth:0,
      paddingLeft:5,
    },
    sectionE: {
      flex: 0.1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      borderColor:'#00FFFF',
      borderWidth:1,
      borderBottomWidth:0,
      borderTopWidth:0,
      paddingLeft:5,
      paddingBottom:5
    },
    sectionF: {
      flex: 0.13,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderColor:'#00FFFF',
      borderWidth:1,
    },
    sectionG: {
      flex: 0.13,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    sectionH: {
      flex: 0.97,
      alignItems: 'center',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      paddingLeft:5,
    },
    scrollView: {
      flex: 1,
      flexDirection: 'column',
      borderColor:'#00FFFF',
      borderWidth:1,
    },
    sunsetView: {
      flex: 0.4,
      flexDirection: 'column',
    },
    sunsetIcon: {
      width:30,
      height:20
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center",
    },
    title: {
        color:"#FFFFFF",
        fontWeight: "bold",
        fontSize:40,
    },
    titleA: {
      color:"#FFFFFF",
      fontWeight: "bold",
      fontSize:60,
      marginVertical: 4
    },
    titleB: {
      color:"#FFFFFF",
      fontWeight: "bold",
      fontSize:30,
      marginVertical: 4
    },
    titleC: {
      color:"#FFFFFF",
      fontWeight: "bold",
      fontSize:10,
    },
    cityButton: {
      color:"#FFFFFF",
      fontWeight: "normal",
      fontSize:30,
      marginVertical: 4,
    },
    addCityButton: {
      color:"#FFFFFF",
      fontWeight: "bold",
      fontSize:20,
      marginVertical: 4
    },
    useCityButton: {
      color:"#FFFFFF",
      fontWeight: "bold",
      fontSize:13,
      paddingLeft:10,
      paddingRight:10,
    },
    textInput: {
      width: 260,
      height: 22, 
      color:"#333333",
      borderColor: 'gray',
      borderWidth: 1, 
      paddingLeft:5,
  },
    weekicon:{
      width:40,
      height:40
    },
    deleteCityIcon:{
      width:20,
      height:30,
      marginLeft:15
    }
  });