import React from 'react';
import {View, TextInput, StyleSheet, Animated} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

class SearchBox extends React.Component {
    state = {
        fadeAnim: new Animated.Value(1),
        text: '',
    };

    _fadeOutPlaceholder = () => {
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 200,
        }).start();
    };
    _fadeInPlaceholder = () => {
        if (this.state.text === '') {
            Animated.timing(this.state.fadeAnim, {
                toValue: 1,
                duration: 200,
            }).start();
        }
    };

    render() {
        let {fadeAnim} = this.state;

        return (
            <View style={styles.background}>
                <View style={styles.searchbox}>
                    <Animated.Text style={[styles.placeholder, {opacity: fadeAnim}]}>
                        Search
                    </Animated.Text>
                    <TextInput
                        onFocus={this._fadeOutPlaceholder}
                        onBlur={this._fadeInPlaceholder}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}
                        style={styles.textInput}
                        clearButtonMode="while-editing"
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'rgb(246,246,246)',
    },
    searchbox: {
        backgroundColor: Colors.light,
        height: 28,
        borderRadius: 4,
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholder: {
        position: 'absolute',
        color: '#8E8E93',
        fontSize: 14,
    },
    textInput: {
        paddingLeft: 5,
        paddingRight: 5,
        width: 100 + '%',
    },
});

export default SearchBox;
