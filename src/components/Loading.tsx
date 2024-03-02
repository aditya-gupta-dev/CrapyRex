import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

function Loading() {
    return (
        <View>
            <ActivityIndicator 
                animating
                size="large"
                style={{
                    margin: 24
                }}
            />
        </View>
    );
};

export default Loading; 