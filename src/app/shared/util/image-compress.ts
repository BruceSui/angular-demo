export function imageCompress(file, callback) {
    let reader = new FileReader();
    let img = new Image();
    let formatdata = '';
    let fileToUpload: File;
    reader.onload = e1 => {
        img.src = e1.target['result'];
    };
    img.onload = e => {
        console.log('压缩前大小' + dataURLtoBlob(e.target['src']).size / 1024); //压缩前大小
        if (/^image\/([a-zA-Z]|\*)+$/.test(file.type)) {
            formatdata = scaleimg(e);
            fileToUpload = dataURLtoBlob1(formatdata, file.name, file.type);
            callback(fileToUpload);
        }
    };
    reader.readAsDataURL(file);
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}
function dataURLtoBlob1(dataurl, fileName, fileType) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: fileType });
}
function scaleimg(img) {
    let height = img.currentTarget.height;
    let width = img.currentTarget.width;
    let base64data = '';
    let can = document.createElement('canvas');
    can.height = height;
    can.width = width;
    let casimg = can.getContext('2d');
    casimg.clearRect(0, 0, width, height);
    casimg.drawImage(img.currentTarget, 0, 0, width, height);
    base64data = can.toDataURL('image/jpeg'); //获取在canvas元素中的图片截图base64编码
    let size = Math.round(dataURLtoBlob(base64data).size / 1024); //获取压缩前的图片大小
    let maxsize = 800; //设置压缩后的最大值
    if (size > maxsize) {
        if (size < 1300) {
            img.currentTarget.height = Math.round(height * (3 / 4));
            img.currentTarget.width = Math.round(width * (3 / 4));
            return scaleimg(img);
        } else if (size < 1800) {
            img.currentTarget.height = Math.round(height * (2 / 3));
            img.currentTarget.width = Math.round(width * (2 / 3));
            return scaleimg(img);
        } else {
            img.currentTarget.height = Math.round(height / 2);
            img.currentTarget.width = Math.round(width / 2);
            return scaleimg(img);
        }
    } else {
        console.log('压缩后大小' + size);
        return base64data;
    }
}
