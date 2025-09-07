import { StyleSheet } from "react-native";
import { theme } from "./theme";

export default StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.secondary,
    },

    tabBarStyle: {
        backgroundColor: theme.colors.background,
        height: 60,
        borderTopWidth: 2,
        borderTopColor: theme.colors.accent,

    },

    customHeader: {
        height: 70,
        paddingTop: 25,
        paddingHorizontal: 15,
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 26,
    },

    customHeaderTitle: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    },

    loginTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#fff',
        textAlign: 'center',
    },

    loginUsername: {
        width: 500,
        padding: 16,
        marginBottom: 16,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: theme.colors.accent,
        backgroundColor: '#fff',
        fontSize: 16,
        color: theme.colors.text,
        elevation: 2,
    },

    loginPassword: {
        width: 500,
        padding: 16,
        marginBottom: 24,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: theme.colors.primary,
        backgroundColor: '#fff',
        fontSize: 16,
        color: theme.colors.text,
        elevation: 2,
    },

    loginSubmit: {
        backgroundColor: theme.colors.secondary,
        paddiingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 16,
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
        color: '#fff',
        textAlign: 'center',
    },

    backText: {
        marginTop: 12,
        fontSize: 14,
        color: '#fff',
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