import { 
    NativeModules,
    NativeEventEmitter,
} from 'react-native';

const _RNCallKit = NativeModules.RNCallKit;
const _RNCallKitEmitter = new NativeEventEmitter(_RNCallKit);

export const listeners = {};

didReceiveStartCallAction = handler => {
    _RNCallKit._startCallActionEventListenerAdded();
    return _RNCallKitEmitter.addListener(
        RNCallKitDidReceiveStartCallAction,
        (data) => { handler(data);}
    );
}

answerCall = handler => {
    return _RNCallKitEmitter.addListener(
        RNCallKitPerformAnswerCallAction,
        (data) => { handler(data);}
    );
}

endCall = handler => {
    return _RNCallKitEmitter.addListener(
        RNCallKitPerformEndCallAction,
        (data) => { handler(data); }
    );
}

didActivateAudioSession = handler => {
    return _RNCallKitEmitter.addListener(
        RNCallKitDidActivateAudioSession,
        () => { handler(); }
    );
}

didDisplayIncomingCall = handler => {
    return _RNCallKitEmitter.addListener(
        RNCallKitDidDisplayIncomingCall,
        (data) => { handler(data.error); }
    );
}

didPerformSetMutedCallAction = handler => {
    return _RNCallKitEmitter.addListener(
        RNCallKitDidPerformSetMutedCallAction,
        (data) => { handler(data.muted); }
      );
}

listeners.didReceiveStartCallAction = didReceiveStartCallAction
listeners.answerCall = answerCall
listeners.endCall = endCall
listeners.didActivateAudioSession = didActivateAudioSession
listeners.didDisplayIncomingCall = didDisplayIncomingCall
listeners.didPerformSetMutedCallAction = didPerformSetMutedCallAction
