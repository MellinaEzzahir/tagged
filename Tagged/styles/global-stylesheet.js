import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const createStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        margin: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.background,
    },

    tabBarStyle: {
        //needs update : colors are hard coded
        backgroundColor: theme.colors.background,
        height: 60,
        borderTopWidth: 2,
        borderTopColor: 'lightgray',

    },

    customHeader: {
        height: 70,
        paddingTop: 25,
        paddingHorizontal: 15,
        backgroundColor: theme.colors.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 26,
    },

    customHeaderTitle: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },

    loginTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 24,
        color: theme.colors.secondary,
        textAlign: 'center',
    },

    loginUsername: {
        width: '100%',
        padding: 14,
        marginBottom: 16,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: theme.colors.primary,
        backgroundColor: '#fff',
        fontSize: 16,
        color: theme.colors.text,
        boxShadow: ' 0px 1px 2px rgba(0, 0, 0, 0.05)',
        elevation: 1,
    },

    loginPassword: {
        width: '100%',
        padding: 14,
        margin: 24,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: theme.colors.primary,
        backgroundColor: '#fff',
        fontSize: 16,
        color: theme.colors.text,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        elevation: 1,
    },

    loginSubmit: {
        backgroundColor: theme.colors.secondary,
        paddiingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 16,
        boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.05)',
        elevation:  4,
        marginBottom: 16,
    },
    
    loginSubmitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    footerText: {
        marginTop: 12,
        fontSize: 14,
        color: theme.colors.secondary,
        textAlign: 'center',
    },

    backText: {
        marginTop: 12,
        fontSize: 14,
        color: theme.colors.secondary,
        textAlign: 'center',
    },

    backTextPress: {
        position: 'absolute',
        top: 10,
        left: 10,
    },

    wrongSignUpInfo: {
        color: theme.colors.error,
        marginBottom: 12,
        marginLeft: 4,
        fontSize: 14,
    }
})