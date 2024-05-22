// public/script.js
const socket = io();

const servers = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302',
        },
    ],
};

let localStream;
let peerConnection;

const callButton = document.getElementById('startCall');
const endCallButton = document.getElementById('endCall');

callButton.addEventListener('click', startCall);
endCallButton.addEventListener('click', endCall);

async function startCall() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        peerConnection = new RTCPeerConnection(servers);

        peerConnection.onicecandidate = handleICECandidateEvent;
        peerConnection.ontrack = handleTrackEvent;

        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        socket.emit('call', { offer, to: 'otherUser' });

        const audioElement = document.createElement('audio');
        audioElement.srcObject = localStream;
        audioElement.autoplay = true;
        document.body.appendChild(audioElement);

    } catch (error) {
        console.error('Error accessing media devices.', error);
    }
}

socket.on('call', async (data) => {
    if (!peerConnection) {
        startCall();
    }

    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    socket.emit('answer', { answer, to: data.from });
});

socket.on('answer', async (data) => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
});

socket.on('candidate', async (data) => {
    try {
        const candidate = new RTCIceCandidate(data.candidate);
        await peerConnection.addIceCandidate(candidate);
    } catch (error) {
        console.error('Error adding received ICE candidate', error);
    }
});

function handleICECandidateEvent(event) {
    if (event.candidate) {
        socket.emit('candidate', { candidate: event.candidate, to: 'otherUser' });
    }
}

function handleTrackEvent(event) {
    const [remoteStream] = event.streams;
    const audioElement = document.createElement('audio');
    audioElement.srcObject = remoteStream;
    audioElement.autoplay = true;
    document.body.appendChild(audioElement);

}

function endCall() {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }

    if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
    }

    socket.disconnect();
}
