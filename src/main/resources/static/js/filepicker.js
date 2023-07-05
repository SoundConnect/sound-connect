console.log("inside filepicker.js");


window.addEventListener('DOMContentLoaded', function(){
    console.log("dom content loaded");
    const client = filestack.init(`${FILESTACK_KEY}`);
    const picker = client.picker(options);

    const openButton = document.getElementById('open');
    openButton.addEventListener('click', (e) => {
        console.log("add picture clicked");
        e.preventDefault();
        picker.open();
    });

})
const options = {
    accept: ['image/*'],
    onFileUploadFinished: (file) => {
        console.log('file upload complete')
        console.log(file);
        const imageURL = document.getElementById("image-url");
        imageURL.value = file.url;
    },
};
