
import React from 'react';
import { View, Text, Button, Platform} from 'react-native';
import {NavBar} from '../Component/Navbar.component'
import Icon from 'react-native-vector-icons/Ionicons';
import * as SQLite from "expo-sqlite";

let db: any = null;
try {
  if(SQLite){
    db = SQLite.openDatabase('cancer-data.sqlite');
    db.exec([{ sql: 'CREATE TABLE IF NOT EXISTS Test(id int,test text)', args: [] }], true, () => {});  
  }
} catch{}

const insertSql = async () => {
  if(db){
    db.exec([{ sql: 'INSERT 1,"Hello" INTO Test', args: [] }], false, () => {});
    console.log("Yea ...");
  } else {
    console.error("SQLite not available on your system");
  }
};

interface DatabaseScreenProps extends React.Props<any> {
    navigation: any
}

export class DatabaseScreen extends React.Component<DatabaseScreenProps, any> {
    static navigationOptions = {  
      title: 'Database Screen',
      tabBarLabel:'Database',  
      tabBarIcon: ({ tintColor }) => (  
          <View>  
              <Icon style={[{color: tintColor}]} size={25} name={'ios-beer'}/>  
          </View>),
      barStyle: { backgroundColor: '#7933FF' }, 
    };

    render() {
      const navigation = this.props.navigation;
      return (
        <View style={{ flex: 1}}>
          <View style={{flex: 0.1}}>
            <NavBar  navigation={navigation}/>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>This is the {navigation.state.routeName} screen</Text> 
            <View>
            {
              ['ios', 'android'].includes(Platform.OS) ? 
              <Button title="INSERT" onPress={insertSql} />: 
              <Text>SQLite not supported on your system</Text>
            }
            <Text>{Platform.OS} - [{Platform.Version}]</Text>
            </View>
          </View>
        </View>
      );
    }
  }