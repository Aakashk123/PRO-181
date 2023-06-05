import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Camera } from 'expo-camera';

import * as Permissions from "expo-permissions";

import * as FaceDetector from 'expo-face-detector';



export default class App extends Component {
    constructor() {
        super()
        this.state = {
            hasCameraPermission: null,
            faces: []
        }
    }

    componentDidMount() {
        Permissions.askAsync(Permissions.CAMERA)
            .then(this.onCameraPermission)
    }

    onCameraPermission = () => {
        this.setState({
            hasCameraPermission: status.status === 'granted'
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} ></SafeAreaView>

                <View style={styles.headingContainer}>
                    <Text titleText>LOOK ME APP</Text>
                </View>

                <View style={styles.cameraStyle}>
                <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.FaceDetectorMode["1"],
                            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                            runClassifications: FaceDetector.FaceDetectorClassifications.all
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },
    filterContainer: {},
    actionContainer: {}
});