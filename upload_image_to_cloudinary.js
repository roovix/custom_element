// Function to upload and get image url
async function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'image_preset');
    formData.append('folder', 'profile');
    formData.append('api_key', '391989329564552');

    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dtmbjcbvi/image/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Upload error:', error);
        throw error;
    }
}
