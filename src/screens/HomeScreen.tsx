import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import NotesTab from "../tabs/NotesTab";
import ProfileTab from "../tabs/ProfileTab";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FilesTab from "../tabs/FilesTab";
import CreateTab from "../tabs/CreateTab";

const HomeTab = createBottomTabNavigator();

function HomeScreen() {
    
    return (
        <HomeTab.Navigator
            screenOptions={{ 
                headerShown: false,
                tabBarStyle: { 
                    borderTopStartRadius: 36,
                    borderTopEndRadius: 36,
                }
            }}
        >
            <HomeTab.Screen 
                name="Notes"
                component={ NotesTab }
                options={{ 
                    tabBarIcon: ({ size, color }) => <Icon name="notebook-multiple" size={size} color={color}/>,
                    tabBarLabel: "Notes",
                    tabBarLabelPosition: "below-icon"
                }}
                />


            <HomeTab.Screen 
                name="Files"
                component={ FilesTab }
                options={{ 
                    tabBarIcon: ({ size, color }) => <Icon name="file-document" size={size} color={color}/>,
                    tabBarLabel: "Files",
                    tabBarLabelPosition: "below-icon"
                }}
                />

            <HomeTab.Screen 
                name="Create"
                component={ CreateTab }
                options={{ 
                    tabBarIcon: ({ size, color }) => <Icon name="pencil" size={size} color={color}/>,
                    tabBarLabel: "Create",
                    tabBarLabelPosition: "below-icon"
                }}
                />

            <HomeTab.Screen 
                name="Profile"
                component={ ProfileTab }
                options={{ 
                    tabBarIcon: ({ size, color }) => <Icon name="account" size={size} color={color}/>,
                    tabBarLabel: "Profile",
                    tabBarLabelPosition: "below-icon"
                }}
            />
        </HomeTab.Navigator>
    );
}

export default HomeScreen;
