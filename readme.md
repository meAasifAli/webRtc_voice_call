# getUserMedia
The getUserMedia() method of the MediaDevices interface prompts the user for permission to use a media input which produces a MediaStream with tracks containing the requested types of media

That stream can include, for example, a video track (produced by either a hardware or virtual video source such as a camera, video recording device, screen sharing service, and so forth), an audio track (similarly, produced by a physical or virtual audio source like a microphone, A/D converter, or the like), and possibly other track types.
It returns a Promise that resolves to a MediaStream object. If the user denies permission, or matching media is not available, then the promise is rejected with NotAllowedError or NotFoundError DOMException respectively.

### Syntax

       
       getUserMedia(constraints)

### constraints
An object specifying the types of media to request, along with any requirements for each type.

The constraints parameter is an object with two members: video and audio, describing the media types requested. Either or both must be specified. If the browser cannot find all media tracks with the specified types that meet the constraints given, then the returned promise is rejected with NotFoundError DOMException.

# RTCPeerConnection
The RTCPeerConnection interface represents a WebRTC connection between the local computer and a remote peer. It provides methods to connect to a remote peer, maintain and monitor the connection, and close the connection once it's no longer needed.

# RTCPeerConnection()

Returns a new RTCPeerConnection, representing a connection between the local device and a remote peer.

# handleICECandidateEvent()

            function handleICECandidateEvent(event) {
             if (event.candidate) {
                socket.emit('candidate', {       candidate: event.candidate, to: 'otherUser' });
             }
      }

The function listens for ICE candidate events and, when an ICE candidate is found, it sends this candidate to the other peer through the signaling server. This is a crucial step in the ICE negotiation process, allowing peers to establish a direct connection by sharing network connectivity information.

         socket.emit('candidate', { candidate: event.candidate, to: 'otherUser' })

- socket.emit() sends the ICE candidate to the signaling server via a WebSocket connection.

- socket is the WebSocket connection to the signaling server.

- The string 'candidate' specifies the type of message being sent.
- The object { candidate: event.candidate, to: 'otherUser' } is the message payload:

    - candidate: event.candidate includes the ICE candidate.
    - to: 'otherUser' specifies the recipient of the message, indicating that the candidate should be sent to the other user in the connection.

# handleTrackEvent()

The function listens for incoming media tracks, extracts the associated media stream, and creates an audio element to play the audio from the remote peer automatically.

# localstream.getTracks()

The function retrieves all the tracks from the local media stream, which is the stream of audio and video data sent to the remote peer.

# createOffer()

createOffer is a method of the RTCPeerConnection object. It creates an SDP (Session Description Protocol) offer. An SDP offer contains information about the media formats, network information, and other parameters that the peer initiating the connection supports

# peerConnection.createOffer()

When we call peerConnection.createOffer(), the browser gathers the necessary information (codecs, media capabilities, network information, etc.) and constructs an SDP offer.

The resulting RTCSessionDescription object (stored in the offer variable) contains the SDP offer, which can then be used in the signaling process.

# setLocalDescription()
The setLocalDescription method configures the RTCPeerConnection with the local description (in this case, an SDP offer). This description includes information about the media formats, network information, and other parameters that the local peer supports.
Setting the local description is a crucial step in the WebRTC signaling process, as it prepares the peer connection to communicate the local peer's capabilities and preferences to the remote peer.





