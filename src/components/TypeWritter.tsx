import React, { useState, useEffect } from 'react';
import { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTSIZE } from '../theme/theme';
interface TypewriterProps {
    text: string,
    speed?: number
}
const Typewriter: FC<TypewriterProps> = ({ text, speed = 100 }) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let index = 0;

        const typeWriter = () => {
            if (index < text.length) {
                setDisplayText((prevText: string) => prevText + text.charAt(index));
                index++;
                setTimeout(typeWriter, speed);
            }
        };

        typeWriter();
    }, [text, speed]);

    return (
        <View>
            <Text style={styles.text}>{displayText}</Text>
        </View>
    );
};
export default Typewriter
const styles = StyleSheet.create({
    text: {
        color: COLORS.primaryWhiteHex,
        textAlign: "center",
        fontSize: FONTSIZE.size_16
    }
})