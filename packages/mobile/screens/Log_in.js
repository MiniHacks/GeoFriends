import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Svg, Path} from 'react-native-svg';

export function LoginEntry() {
  return (
    <View style={styles.root}>
      <Svg width="95" height="152">
        <Path d="M 36 0 L 95 69.5 L 46.5 135 L 5.5 152 L 0 0 L 36 0 Z" fill="#00364a"/>
      </Svg>
      <Svg width="288.59796142578125" height="285">
        <Path d="M 219.85594177246094 0 C 219.85594177246094 0 231.85594177246094 24.5 235.35595703125 32 C 238.85597229003906 39.5 272.35595703125 72 279.35595703125 96.5 C 286.35595703125 121 291.85595703125 132.5 286.35595703125 172 C 280.85595703125 211.5 257.35595703125 218.5 235.35595703125 234.5 C 213.35595703125 250.5 189.95790004730225 257.9370837211609 174.85595703125 264 C 159.75401401519775 270.0629162788391 148.1122817993164 271.6391763687134 129.85595703125 277 C 111.5996322631836 282.3608236312866 85.35595703125 285 61.3559455871582 285 C 37.355934143066406 285 24.85594367980957 285 24.85594367980957 285 L 14.355944633483887 285 C 3.522611618041992 234.83333206176758 -11.644055366516113 131.80000019073486 14.355944633483887 121 C 40.35594463348389 110.19999980926514 61.355945587158146 114 61.3559455871582 100.5 C 61.35594558715826 87 40.85595703125 59 30.85595703125 40.5 C 20.85595703125 22 30.85595703125 0 30.85595703125 0 L 219.85594177246094 0 Z" fill="#70c5cc"/>
      </Svg>
      <Text style={styles.password}>
        {`Password`}
      </Text>
      <Text style={styles.username}>
        {`Username
`}
      </Text>
      <Text style={styles.signIn}>
        {`Sign In`}
      </Text>
      <Text style={styles.forgotPassword}>
        {`Forgot password?`}
      </Text>
      <Text style={styles.signIn}>
        {`Sign In`}
      </Text>
      <Text style={styles.signIn}>
        {`Sign In`}
      </Text>
      <Text style={styles.dontHaveAnAccountSignUp}>
        {`Don’t have an account? Sign Up`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 360,
    height: 800,
    backgroundColor: '#b9e1ea',
  },
  password: {
    width: 91,
    height: 23,
    fontSize: 20,
    fontWeight: 500,
    textAlign: 'left',
    textAlignVertical: 'top',
    color: '#00090c',
  },
  username: {
    width: 97,
    height: 46,
    fontSize: 20,
    fontWeight: 500,
    textAlign: 'left',
    textAlignVertical: 'top',
    color: '#00090c',
  },
  signIn: {
    width: 65,
    height: 23,
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'left',
    textAlignVertical: 'top',
    color: '#ffffff',
  },
  forgotPassword: {
    width: 142,
    height: 5,
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'left',
    textAlignVertical: 'top',
    color: '#00090c',
  },
  dontHaveAnAccountSignUp: {
    width: 268,
    height: 26,
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'left',
    textAlignVertical: 'top',
    color: '#00090c',
  },
});
