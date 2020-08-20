import React from "react";
import { StatusBar } from 'expo-status-bar';
import { AsyncStorage } from 'react-native';
import { useState, useEffect} from 'react';
import { RefreshControl, TextInput, Image, TouchableOpacity, ImageBackground, Text, View, Dimensions, ScrollView, Alert  } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {styles} from "./style";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

function about ({ navigation })
{ 
  let wIcons={"01d":require('./assets/sun.png'),
  "01n":require('./assets/sun.png'),
  "02d":require('./assets/pcloud.png'),
  "02n":require('./assets/pcloud.png'),
 "03d":require('./assets/cloud.png'),
 "03n":require('./assets/cloud.png'),
 "04d":require('./assets/cloud.png'),
 "04n":require('./assets/cloud.png'),
 "09d":require('./assets/rain.png'),
 "09n":require('./assets/rain.png'),
 "10d":require('./assets/sunrain.png'),
 "10n":require('./assets/sunrain.png'),
 "11d":require('./assets/thunder.png'),
 "11n":require('./assets/thunder.png'),
 "13d":require('./assets/snow.png'),
 "13n":require('./assets/snow.png'),
 "50d":require('./assets/mist.png'),
 "50n":require('./assets/mist.png')
  };
  const [latitude, setlatitude]=React.useState();
  const [longitude, setlongitude]=React.useState();

  const [dimensions, setDimensions] = useState({ window, screen });
  const onChange = ({ window, screen }) => {setDimensions({ window, screen });};
  useEffect(() => {Dimensions.addEventListener("change", onChange);return () => {Dimensions.removeEventListener("change", onChange);};});
 
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {return new Promise(resolve => {setTimeout(resolve, timeout);});};
  const onRefresh = React.useCallback(() => {setRefreshing(true);wait(1).then(() => setRefreshing(false));}, []);

  const [loadedCityes, setCityes] = useState([]);
  const [city, setCity] = useState("?");
  const [degrees, setDegrees] = useState(0);
  const [CityValue, ChangeCity] = useState('Type city');
  const [sunup, setSunUp] = useState();
  const [sundown, setSunDown] = useState();
  
  const [weather, setWeather] = useState([]);
  const [forcast, setForcast] = useState(["01d","03d","09d","03d","03d","03d"]);

  const [todayicon, setTodayIcon] = useState(wIcons["01d"]);

  useEffect(() => {getLocation();console.log("Get Current location");},[]);
  useEffect(() => {loadCityes();console.log("User City loaded");},[]);
  
  function formatDate(unixTime)
  {
    let dato=new Date();
    dato.setTime(unixTime*1000);
    return `${("0"+dato.getHours()).slice(-2)}:${("0"+dato.getMinutes()).slice(-2)}`
  }

  function getLocation(lat="",lon="")
  { 
      if (lat=="")
      {
        navigator.geolocation.getCurrentPosition(
        position=>
        {
          lat=position.coords.latitude;
          lon=position.coords.longitude;   
        });       
      }
      if (lat==""||lon=="") {lat=56.4657553;lon=9.4121147;}
      setlatitude(lat); 
      setlongitude(lon);
      fetchWeather("",lat,lon);
  }

  function fetchWeather(cityName="",lat = latitude, lon = longitude) {
    let apiArray={};
    let link="";

    if (cityName=="")
    {
      console.log("Getting weather by "+lat+" x "+lon);
      link='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude={part}&units=metric&appid=5a9b05d90d9eecbaa85ab2bd525727c6';
    }
    else
    {
      console.log("Getting weather by City:"+cityName);
      link='http://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=5a9b05d90d9eecbaa85ab2bd525727c6';
    }
    
    fetch(
      link
    )
      .then(res => res.json())
      .then(json => {
        apiArray=JSON.parse(JSON.stringify(json));
       
        if (cityName!="" || apiArray.lat) 
        {  
                
          if (cityName!="")
            fetchWeather("",apiArray.coord.lat , apiArray.coord.lon);
          else
          {
            setlatitude(apiArray.lat); 
            setlongitude(apiArray.lon);
            setCity(apiArray.timezone);
            setWeather(apiArray);
            setDegrees(apiArray.current.temp);
            setTodayIcon(wIcons[apiArray.current.weather[0].icon]);
            setForcast([apiArray.daily[0].weather[0].icon,apiArray.daily[1].weather[0].icon,apiArray.daily[2].weather[0].icon,apiArray.daily[3].weather[0].icon,apiArray.daily[4].weather[0].icon,apiArray.daily[5].weather[0].icon]);
            setSunUp(formatDate(apiArray.current.sunrise));
            setSunDown(formatDate(apiArray.current.sunset));
          }
          
        }
        else
        console.log("Error: "+apiArray.message);
      });
  }

  function textChangeHandler(evt)
  {
    ChangeCity(evt.nativeEvent.text);
    console.log(evt.nativeEvent.text);
  }

  function lookupCityes(selectedCity)
  {
    if (typeof selectedCity === "object") 
    {
      setCity(CityValue);
      fetchWeather(CityValue);
    } else 
    {
      setCity(selectedCity);
      fetchWeather(selectedCity);
    }

    console.log("editing:"+CityValue+" - "+selectedCity);
  }

  async function loadCityes()
  {
      try {
        const value = await AsyncStorage.getItem('Cityes');
        if (value !== null) 
        { 
          setCityes(value.split("\n"));
        }
      } catch (error) {Alert.alert("Error loading City");}
  }

  async function saveCityes()
  { 
    try {
        await AsyncStorage.setItem('Cityes',loadedCityes.toString().replace(/,/g,"\n"));console.log("Saving");
      } catch (error) {console.log("Error Saving"); };
      setCityes(loadedCityes);
      onRefresh();
  }

  function removeCity(key)
  {
    loadedCityes.splice(key, 1);
    console.log("Removes City");
    saveCityes();
  }

    return (
      <View style={styles.container}>
        <ImageBackground source={ require('./assets/background.jpg')} style={styles.image}>
          <Image source={ require('./assets/background.jpg')} style={{width:dimensions.screen.width,height:0}} />
          
          <View style={styles.sectionA}>
          <LinearGradient colors={['rgba(255,255,255,0.8)', 'transparent']} style={{position: 'absolute',left: 0,right: 0,top: 0,height: 100,}}/>
            <Text style={styles.title}>Weather App</Text>
          </View>

          <View style={styles.sectionA} >
            {<Image source={todayicon} style={{width:110,height:110}} />
            }
            <Text style={styles.titleA}>{' '+degrees+'°'}</Text>
          </View>

          <View style={styles.sectionA}><Text style={styles.titleB}>{city}</Text></View>

          <View style={styles.sectionD}>
            <Text style={styles.titleC}>Forcast</Text>
            <View style={styles.sectionH}>
              <Text style={styles.titleC}>lat:{latitude}</Text>
              <Text style={styles.titleC}> - </Text>
              <Text style={styles.titleC}>lon:{longitude}</Text>
            </View>
          </View>
          
          <View style={styles.sectionB}>
            <LinearGradient colors={['rgba(255,255,255,0.8)', 'transparent']} style={{position: 'absolute',left: 0,right: 0,top: 0,height: 50,}}/>
            <View style={styles.sunsetView}>
             <Image source={require('./assets/sunup.png')} style={styles.sunsetIcon} />
             <Image source={require('./assets/sundown.png')} style={styles.sunsetIcon} />
            </View>
            <View style={styles.sunsetView}>
              <Text style={styles.titleC}>{sunup}</Text>
              <Text style={styles.titleC}>{sundown}</Text>
            </View>
            {
              forcast.map((item, key) => (<Image key={"img_"+key} source={wIcons[item]} style={styles.weekicon} />))
            }
          </View>

          <ScrollView style={styles.scrollView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            {
              <View style={styles.sectionC}>
                   <Text style={styles.addCityButton}></Text>
                   <Text style={styles.addCityButton}>Made</Text>
                   <Text style={styles.addCityButton}>By</Text>
                   <Text style={styles.addCityButton}>Ian Fanefjord</Text>
            </View>
            }
          </ScrollView>

          <View style={styles.sectionF}>
            <LinearGradient colors={['transparent','rgba(255,255,255,0.8)']} style={{position: 'absolute',left: 0,right: 0,top: 0,height: 50,}}/>
            <TouchableOpacity style={styles.addCityButton} onPress={() => navigation.navigate('FrontPage')}>
                  <Text style={styles.addCityButton}>Choose City</Text>
            </TouchableOpacity>
          </View>
          <StatusBar style="auto" />
        </ImageBackground>
      </View>
    );
  }

export default about;
