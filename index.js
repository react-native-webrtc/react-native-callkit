'use strict';

import {
    NativeModules,
    NativeEventEmitter,
    Platform,
} from 'react-native';

const _RNCallKit = NativeModules.RNCallKit;
const _RNCallKitEmitter = new NativeEventEmitter(_RNCallKit);

const _callkitEventHandlers = new Map();

const RNCallKitDidReceiveStartCallAction = 'RNCallKitDidReceiveStartCallAction';
const RNCallKitPerformAnswerCallAction = 'RNCallKitPerformAnswerCallAction';
const RNCallKitPerformEndCallAction = 'RNCallKitPerformEndCallAction';
const RNCallKitDidActivateAudioSession = 'RNCallKitDidActivateAudioSession';
const RNCallKitDidDisplayIncomingCall = 'RNCallKitDidDisplayIncomingCall';
const RNCallKitDidPerformSetMutedCallAction = 'RNCallKitDidPerformSetMutedCallAction';

export default class RNCallKit {
    static addEventListener(type, handler) {
        if (Platform.OS !== 'ios') return;
        var listener;
        if (type === 'didReceiveStartCallAction') {
            listener = _RNCallKitEmitter.addListener(
                RNCallKitDidReceiveStartCallAction,
                (data) => { handler(data);}
            );
            _RNCallKit._startCallActionEventListenerAdded();
        } else if (type === 'answerCall') {
            listener = _RNCallKitEmitter.addListener(
                RNCallKitPerformAnswerCallAction,
                (data) => { handler(data);}
            );
        } else if (type === 'endCall') {
            listener = _RNCallKitEmitter.addListener(
                RNCallKitPerformEndCallAction,
                (data) => { handler(data); }
            );
        } else if (type === 'didActivateAudioSession') {
            listener = _RNCallKitEmitter.addListener(
                RNCallKitDidActivateAudioSession,
                () => { handler(); }
            );
        } else if (type === 'didDisplayIncomingCall') {
            listener = _RNCallKitEmitter.addListener(
                RNCallKitDidDisplayIncomingCall,
                (data) => { handler(data.error); }
            );
        } else if (type === 'didPerformSetMutedCallAction') {
          listener = _RNCallKitEmitter.addListener(
            RNCallKitDidPerformSetMutedCallAction,
            (data) => { handler(data.muted); }
          );
        }

        _callkitEventHandlers.set(handler, listener);
    }

    static removeEventListener(type, handler) {
        if (Platform.OS !== 'ios') return;
        var listener = _callkitEventHandlers.get(handler);
        if (!listener) {
            return;
        }
        listener.remove();
        _callkitEventHandlers.delete(handler);
    }

    static setup(options) {
        if (Platform.OS !== 'ios') return;
        if (!options.appName) {
            throw new Error('RNCallKit.setup: option "appName" is required');
        }
        if (typeof options.appName !== 'string') {
            throw new Error('RNCallKit.setup: option "appName" should be of type "string"');
        }
        _RNCallKit.setup(options);
    }

    static displayIncomingCall(uuid, handle, handleType = 'number', hasVideo = false, localizedCallerName?: String) {
        if (Platform.OS !== 'ios') return;
        _RNCallKit.displayIncomingCall(uuid, handle, handleType, hasVideo, localizedCallerName);
    }

    static startCall(uuid, handle, handleType = 'number', hasVideo = false, contactIdentifier?: String) {
        if (Platform.OS !== 'ios') return;
        _RNCallKit.startCall(uuid, handle, handleType, hasVideo, contactIdentifier);
    }

    static reportConnectedOutgoingCallWithUUID(uuid) {
        if (Platform.OS !== 'ios') return;
        _RNCallKit.reportConnectedOutgoingCallWithUUID(uuid);
    }

    static endCall(uuid) {
        if (Platform.OS !== 'ios') return;
        _RNCallKit.endCall(uuid);
    }

    static endAllCalls() {
        if (Platform.OS !== 'ios') return;
        _RNCallKit.endAllCalls();
    }

    static checkIfInCall(uuid) {
        return Platform.OS === 'ios' ?
        _RNCallKit.checkIfInCall(uuid) :
        Promise.reject('RNCallKit.checkIfInCall was called from unsupported OS');

    }

    static setMutedCAll(uuid, muted) {
        if (Platform.OS !== 'ios') return;
        _RNCallKit.setMutedCall(uuid, muted);
    }

    static checkIfBusy() {
      return Platform.OS === 'ios'
        ? _RNCallKit.checkIfBusy()
        : Promise.reject('RNCallKit.checkIfBusy was called from unsupported OS');
    };

    static checkSpeaker() {
      return Platform.OS === 'ios'
        ? _RNCallKit.checkSpeaker()
        : Promise.reject('RNCallKit.checkSpeaker was called from unsupported OS');
    }

    /*
    static setHeldCall(uuid, onHold) {
        if (Platform.OS !== 'ios') return;
        _RNCallKit.setHeldCall(uuid, onHold);
    }
    */
}
