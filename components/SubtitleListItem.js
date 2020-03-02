import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  rowStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 5,
  },
  columnStyle: {
    flex: 1,
    flexDirection: 'column',
  },
  itemText: {
    flex: 1,
    marginLeft: 32,
    alignSelf: 'flex-start',
  },
  subScriptText: {
    alignSelf: 'flex-start',
    paddingTop: 10,
    marginLeft: 32,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
  },
  icon: {
    marginRight: 40,
  },
});

const SubtitleListItem = ({title, subtitle, onPress, image}) => (
  <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
    <View style={styles.rowStyle}>
      <View style={styles.columnStyle}>
        <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemText}>
          {title}
        </Text>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.subScriptText}>
          {subtitle}
        </Text>
      </View>
      <View style={styles.iconContainer}>{image}</View>
    </View>
  </TouchableOpacity>
);

SubtitleListItem.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onPress: PropTypes.func,
  image: PropTypes.object,
};

SubtitleListItem.defaultProps = {
  title: 'Your title here',
  subtitle: 'Your subtitle here',
  onPress: () => {},
  image: (
    <Icon
      name="clear"
      style={styles.icon}
      size={24}
    />
  ),
};

export default SubtitleListItem;
