import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Block, Text } from "galio-framework";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button as ButtonSubmit, Icon, Input } from "../individual_components";
import { nowTheme } from "../constants/index";
import DateTimePicker from "@react-native-community/datetimepicker";
import { View } from "react-native";
import GooglePlacesInput from "../search/Search";
const { width, height } = Dimensions.get("screen");
import Map from "../map/Map";
import fetchCall from "../../Fetch";
let fetchReq = new fetchCall();
const URL_POST_REQ_TRIP = "http://localhost:3000/api/v1/trips";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default function Form({ navigation }) {
  const handleSubmit = e => {
    fetchReq
      .generalFetch(
        URL_POST_REQ_TRIP,
        fetchReq.makeOptions("POST", { trip: e })
      )
      .then(data => {
        console.log(data);
        navigation.push("Home");
      });
  };

  const initialState = {
    title: "",
    start: null,
    end: null,
    destination_name: "",
    latitude: 0,
    longitude: 0,
    user_id: 1,
    public: true,
  };

  const [form, setForm] = useState(initialState);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDestination = (e, name) => {
    setForm({
      ...form,
      latitude: e.lat,
      longitude: e.lng,
      destination_name: name,
    });
  };

  const setStart = (_event, date) => {
    setForm({
      ...form,
      start: date.toISOString(),
    });
    setStartDate(date);
  };
  const setEnd = (_event, date) => {
    setForm({
      ...form,
      end: date.toISOString(),
    });
    setEndDate(date);
  };
  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps={"handled"}>
      <DismissKeyboard keyboardShouldPersistTaps={"handled"}>
        <Block flex middle keyboardShouldPersistTaps={"handled"}>
          <Block flex middle keyboardShouldPersistTaps={"handled"}>
            <Block
              flex={0.4}
              middle
              style={styles.socialConnect}
              keyboardShouldPersistTaps={"handled"}
            >
              <Block flex={0.5} middle keyboardShouldPersistTaps={"handled"}>
                {/* ADD TEXT TO HEADER FORM HERE */}
              </Block>
              <Block
                flex={0.5}
                row
                middle
                space='between'
                style={{ marginBottom: 18 }}
                keyboardShouldPersistTaps={"handled"}
              ></Block>
            </Block>
            <Block flex={0.1} middle></Block>
            <Block flex={1} middle space='between'>
              <Block center flex={0.9}>
                <Block flex space='between'>
                  <Block>
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Input
                        placeholder='Title'
                        style={styles.inputs}
                        onChangeText={text => setForm({ ...form, title: text })}
                        iconContent={
                          <Icon
                            size={16}
                            color='#ADB5BD'
                            name='profile-circle'
                            family='NowExtra'
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Input
                        placeholder='Note'
                        style={styles.inputs}
                        onChangeText={text => setForm({ ...form, note: text })}
                        iconContent={
                          <Icon
                            size={16}
                            color='#ADB5BD'
                            name='caps-small2x'
                            family='NowExtra'
                            style={styles.inputIcons}
                          />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <GooglePlacesInput
                        handleDestination={handleDestination}
                      />
                    </Block>
                    <View
                      width={width * 0.8}
                      style={{ marginBottom: 5 }}
                    ></View>
                    <Block width={width * 0.8}>
                      <Text>Start date</Text>
                      <DateTimePicker
                        testID='dateTimePicker'
                        value={startDate}
                        mode='date'
                        is24Hour={true}
                        display='default'
                        style={styles.dateButton}
                        onChange={
                          setStart
                          // (_event, date) =>
                          // setForm({ ...form, start: date.toISOString() })
                        }
                      />
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                      <Text>End date</Text>
                      <DateTimePicker
                        onChange={setEnd}
                        testID='dateTimePicker'
                        value={endDate}
                        mode='date'
                        display='default'
                        style={styles.dateButton}
                      />
                    </Block>
                  </Block>
                  <Block center>
                    <ButtonSubmit
                      color='INFO'
                      round
                      style={styles.createButton}
                      onPress={() => handleSubmit(form)}
                    >
                      <Text size={14} color={nowTheme.COLORS.WHITE}>
                        Create a new Itin
                      </Text>
                    </ButtonSubmit>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </Block>
      </DismissKeyboard>
      <Map
        coordinates={{ longitude: form.longitude, latitude: form.latitude }}
      />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    // marginTop: -70,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: "#E3E3E3",
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40,
  },
  dateButton: {
    width: width * 0.5,
    marginTop: 10,
    marginBottom: 0,
  },
  social: {
    width: nowTheme.SIZES.BASE * 3.5,
    height: nowTheme.SIZES.BASE * 3.5,
    borderRadius: nowTheme.SIZES.BASE * 1.75,
    justifyContent: "center",
    marginHorizontal: 10,
  },
});