from gcm import GCM

gcm = GCM("AIzaSyD8LEN7eQm-58honJdPTULBrJikf8heL3s", debug=True)
token = "eiVqeL4U-8k:APA91bHIlswYTZHNVKrmP5rOKtriR9opC9WBUZVceGLPXAdLtRV6is7zsglJqllm3Jbz-1yykZqnxmMclAm33w895QvxD_CxBz264C9UW8peb1rIM_9uv7-Ywd-RDhGsK1aMX1eHrlbL"
data = {'name': 'Big daddy Amr'}
response = gcm.plaintext_request(registration_id=token, data=data)
