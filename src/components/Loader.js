import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Loader = ({ isLoading }) => {
  return (
    isLoading && (
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Image
            source={require('../assets/car.gif')}
            style={{ height: 150, width: 150 }}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
